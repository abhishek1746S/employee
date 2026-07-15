# app/routers/assessments.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List
import json

from app.database import get_db
from app.models.application import Application, StatusEnum
from app.models.assessment import Assessment
from app.models.result import Result
from app.models.referral_post import ReferralPost
from app.core.dependencies import require_role
from app.models.user import User, RoleEnum

router = APIRouter(prefix="/assessments", tags=["Assessments"])


class QuestionCreate(BaseModel):
    question: str
    options: List[str]
    correct_answer: str


class AnswerSubmit(BaseModel):
    question_id: int
    answer: str


class AssessmentSubmission(BaseModel):
    answers: List[AnswerSubmit]


# Employee creates questions for a post
@router.post("/post/{post_id}/create-questions")
def create_questions(
    post_id: int,
    questions: List[QuestionCreate],
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(RoleEnum.employee))
):
    post = db.query(ReferralPost).filter(
        ReferralPost.id == post_id,
        ReferralPost.employee_id == current_user.id
    ).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    # clear existing questions for this post
    db.query(Assessment).filter(
        Assessment.post_id == post_id,
        Assessment.application_id == None
    ).delete()

    # save new questions
    for q in questions:
        assessment = Assessment(
            post_id=post_id,
            application_id=None,
            question=q.question,
            options=json.dumps(q.options),
            correct_answer=q.correct_answer
        )
        db.add(assessment)

    # update all shortlisted students to assessment_pending
    shortlisted = db.query(Application).filter(
        Application.post_id == post_id,
        Application.status == StatusEnum.shortlisted
    ).all()

    for app in shortlisted:
        app.status = StatusEnum.assessment_pending

    db.commit()

    return {
        "message": f"{len(questions)} questions created for post. {len(shortlisted)} shortlisted students notified.",
        "post_id": post_id,
        "students_notified": len(shortlisted)
    }


# Employee views existing questions for a post
@router.get("/post/{post_id}/questions")
def get_post_questions(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(RoleEnum.employee))
):
    post = db.query(ReferralPost).filter(
        ReferralPost.id == post_id,
        ReferralPost.employee_id == current_user.id
    ).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    questions = db.query(Assessment).filter(
        Assessment.post_id == post_id,
        Assessment.application_id == None
    ).all()

    if not questions:
        return {"message": "No questions created yet for this post"}

    return [
        {
            "id": q.id,
            "question": q.question,
            "options": json.loads(q.options)
        }
        for q in questions
    ]


# Student views assessment questions
@router.get("/{application_id}/questions")
def get_assessment_questions(
    application_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(RoleEnum.student))
):
    application = db.query(Application).filter(
        Application.id == application_id,
        Application.student_id == current_user.id
    ).first()
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")

    if application.status != StatusEnum.assessment_pending:
        raise HTTPException(
            status_code=400,
            detail="No assessment available for this application"
        )

    questions = db.query(Assessment).filter(
        Assessment.post_id == application.post_id,
        Assessment.application_id == None
    ).all()

    if not questions:
        raise HTTPException(status_code=404, detail="No questions found")

    return [
        {
            "id": q.id,
            "question": q.question,
            "options": json.loads(q.options)
        }
        for q in questions
    ]


# Student submits assessment answers
@router.post("/{application_id}/submit")
def submit_assessment(
    application_id: int,
    submission: AssessmentSubmission,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(RoleEnum.student))
):
    application = db.query(Application).filter(
        Application.id == application_id,
        Application.student_id == current_user.id
    ).first()
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")

    if application.status != StatusEnum.assessment_pending:
        raise HTTPException(
            status_code=400,
            detail="Assessment not available or already submitted"
        )

    # get base questions for this post
    questions = db.query(Assessment).filter(
        Assessment.post_id == application.post_id,
        Assessment.application_id == None
    ).all()

    if not questions:
        raise HTTPException(status_code=404, detail="No questions found")

    correct_map = {q.id: q.correct_answer for q in questions}

    correct_count = 0
    for ans in submission.answers:
        if ans.question_id in correct_map:
            # save student answer as new row tied to application
            student_ans = Assessment(
                post_id=application.post_id,
                application_id=application_id,
                question=next(q.question for q in questions if q.id == ans.question_id),
                options=next(q.options for q in questions if q.id == ans.question_id),
                correct_answer=correct_map[ans.question_id],
                student_answer=ans.answer
            )
            db.add(student_ans)
            if ans.answer.strip().lower() == correct_map[ans.question_id].strip().lower():
                correct_count += 1

    total_questions = len(questions)
    assessment_score = round((correct_count / total_questions) * 100, 2)

    # save assessment score to results
    result = db.query(Result).filter(
        Result.application_id == application_id
    ).first()
    if result:
        result.assessment_score = assessment_score
    else:
        result = Result(
            application_id=application_id,
            resume_score=application.resume_score or 0,
            assessment_score=assessment_score
        )
        db.add(result)

    # update status back to shortlisted
    application.status = StatusEnum.shortlisted
    db.commit()

    return {
        "message": "Assessment submitted successfully! ✅",
        "correct_answers": correct_count,
        "total_questions": total_questions,
        "assessment_score": assessment_score
    }