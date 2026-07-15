# app/services/gemini_service.py
from app.core.config import settings
from google import genai
import json

client = genai.Client(api_key=settings.GEMINI_API_KEY)


def analyze_resume(resume_text: str, required_skills: str) -> dict:
    prompt = f"""
    You are an expert HR evaluator.

    Analyze this resume against the required skills and return ONLY a JSON object like this:
    {{
        "score": <number between 0-100>,
        "matched_skills": ["skill1", "skill2"],
        "missing_skills": ["skill3", "skill4"],
        "summary": "brief evaluation summary"
    }}

    Required Skills: {required_skills}

    Resume:
    {resume_text}

    Return ONLY the JSON, no extra text.
    """
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )
    text = response.text.strip()
    if text.startswith("```"):
        text = text.split("```")[1]
        if text.startswith("json"):
            text = text[4:]
    return json.loads(text.strip())