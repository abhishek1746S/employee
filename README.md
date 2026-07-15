<div align="center">

<img src="https://img.shields.io/badge/ReferralX-Smart%20Referral%20Platform-6C63FF?style=for-the-badge&logo=rocket&logoColor=white" alt="ReferralX Banner" />

# 🚀 ReferralX — Smart Employee Referral Platform

### *Connecting Talented Students with the Right Opportunities — Intelligently.*

[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React.js-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)](https://jwt.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

---

> **ReferralX** is a merit-based platform that bridges the gap between ambitious students and verified employees willing to refer them. It combines **AI-powered resume screening** and **skill-based assessments** to ensure only the most qualified candidates reach employees — eliminating referral spam and making the process fair, transparent, and efficient.

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🏗️ Tech Stack](#️-tech-stack)
- [⚙️ System Workflow](#️-system-workflow)
- [👥 User Roles](#-user-roles)
- [📊 Application Status Flow](#-application-status-flow)
- [🔐 Non-Functional Requirements](#-non-functional-requirements)
- [🚀 Getting Started](#-getting-started)
- [📁 Project Structure](#-project-structure)
- [🌍 Environment Variables](#-environment-variables)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

| Feature | Description |
|---|---|
| 📢 **Referral Posting** | Employees post opportunities with role details, skills, eligibility, and referral slot count |
| 📄 **Resume Upload & Analysis** | AI extracts and scores resumes against job requirements using the Gemini API |
| 🧠 **Skill Assessments** | Auto-generated skill-based tests drawn from curated question banks |
| 🏆 **Candidate Ranking** | Candidates ranked by combined resume score + assessment score |
| 👁️ **Referral Management** | Employees review, accept/reject shortlisted candidates, and issue referrals |
| 📬 **Application Tracking** | Students track their status across every stage in real time |
| 🔒 **Secure Auth** | JWT-based authentication with role-based access control |
| 🛡️ **Admin Controls** | Admins verify employees, manage question banks, and monitor activity |

---

## 🏗️ Tech Stack

<div align="center">

| Layer | Technology | Purpose |
|---|---|---|
| 🎨 **Frontend** | React.js + Chakra UI | Responsive, accessible user interface |
| ⚡ **Backend** | FastAPI + SQLAlchemy | High-performance REST API with ORM |
| 🗄️ **Database** | PostgreSQL | Reliable relational data storage |
| 🤖 **AI Integration** | Gemini API | Resume parsing, scoring & question generation |
| 🖼️ **File Storage** | Cloudinary | Resume and document cloud storage |
| 🔑 **Authentication** | JWT | Secure, stateless user authentication |

</div>

---

## ⚙️ System Workflow

```
┌─────────────────────────────────────────────────────────────────────┐
│                        REFERRALX WORKFLOW                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  👨‍💼 Employee                                                        │
│      │                                                              │
│      ▼                                                              │
│  [1] 📢 Creates a Referral Opportunity                              │
│         (role, skills, eligibility, slots)                          │
│                                                                     │
│  👩‍🎓 Student                                                         │
│      │                                                              │
│      ▼                                                              │
│  [2] 📄 Applies & Uploads Resume                                    │
│      │                                                              │
│      ▼                                                              │
│  [3] 🤖 AI Resume Analysis & Scoring          ◄── Gemini API        │
│      │                                                              │
│      ▼                                                              │
│  [4] 🧠 Skill-Based Assessment Generated      ◄── Question Bank     │
│      │                                                              │
│      ▼                                                              │
│  [5] ✍️  Student Completes Assessment                               │
│      │                                                              │
│      ▼                                                              │
│  [6] 📊 Final Score Calculated & Candidates Ranked                  │
│      │                                                              │
│      ▼                                                              │
│  [7] 👨‍💼 Employee Reviews Shortlisted Candidates                    │
│      │                                                              │
│      ▼                                                              │
│  [8] 🎉 Selected Candidates Receive Referrals                       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 👥 User Roles

### 👩‍🎓 Student
- ✅ Register and log in to the platform
- 📤 Upload resume and submit profile links
- 🔍 Browse and apply for referral opportunities
- ✍️ Take AI-generated skill assessments
- 📡 Track application status in real time

### 👨‍💼 Employee
- ✅ Register with verified company email
- 📢 Create and manage referral posts
- 📋 Review AI-shortlisted candidates
- ✔️ Accept or reject candidates
- 🎁 Issue referrals to selected students

### 🛠️ Admin
- 🔍 Verify and approve employee accounts
- 👥 Manage all platform users
- 📚 Create and manage skill-based question banks
- 📈 Monitor platform activity and health

---

## 📊 Application Status Flow

```
  ┌─────────┐     ┌────────────────────┐     ┌──────────────┐
  │ Applied │ ──► │ Assessment Pending │ ──► │ Under Review │
  └─────────┘     └────────────────────┘     └──────────────┘
                                                      │
                              ┌───────────────────────┤
                              │                       │
                              ▼                       ▼
                       ┌─────────────┐         ┌──────────┐
                       │ Shortlisted │         │ Rejected │
                       └─────────────┘         └──────────┘
                              │
                              ▼
                        ┌──────────┐
                        │ Referred │ 🎉
                        └──────────┘
```

---

## 🔐 Non-Functional Requirements

### ⚡ Performance
- API response time under **2 seconds**
- Supports **10,000+ concurrent users**

### 🛡️ Security
- JWT-based stateless authentication
- Bcrypt password hashing
- Role-based access control (RBAC)

### 📈 Scalability
- Modular backend architecture
- Cloud-ready deployment support

### 💾 Reliability
- Secure data storage with PostgreSQL
- Regular automated backups

---

## 🚀 Getting Started

### 🧰 Prerequisites

Make sure you have the following installed and configured:

- ![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white&style=flat-square) for the frontend
- ![Python](https://img.shields.io/badge/Python-3.9%2B-3776AB?logo=python&logoColor=white&style=flat-square) for the backend
- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15%2B-316192?logo=postgresql&logoColor=white&style=flat-square) database
- A [Cloudinary](https://cloudinary.com/) account for file storage
- A [Gemini API](https://ai.google.dev/) key for AI features

---

### 📦 Installation

**1. Clone the repository**
```bash
git clone https://github.com/dreamadoration-pvt/ReferralX.git
cd Referralx
```

**2. Backend setup**
```bash
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate        # macOS/Linux
venv\Scripts\activate           # Windows

# Install dependencies
pip install -r requirements.txt
```

**3. Configure environment variables**
```bash
cp .env.example .env
# Open .env and fill in your credentials (see Environment Variables section)
```

**4. Run database migrations**
```bash
alembic upgrade head
```

**5. Start the backend server**
```bash
uvicorn main:app --reload
# API available at http://localhost:8000
# Docs available at http://localhost:8000/docs
```

**6. Frontend setup**
```bash
cd ../frontend

# Install dependencies
npm install

# Start development server
npm start
# App available at http://localhost:3000
```

---

## 📁 Project Structure

```
referralx/
│
├── 📂 backend/
│   ├── 📂 app/
│   │   ├── 📂 api/              # Route handlers
│   │   ├── 📂 models/           # SQLAlchemy models
│   │   ├── 📂 schemas/          # Pydantic schemas
│   │   ├── 📂 services/         # Business logic
│   │   │   ├── ai_service.py    # Gemini API integration
│   │   │   ├── resume_parser.py # Resume extraction
│   │   │   └── scoring.py       # Candidate scoring
│   │   └── 📂 core/             # Config, auth, security
│   ├── main.py
│   └── requirements.txt
│
├── 📂 frontend/
│   ├── 📂 src/
│   │   ├── 📂 components/       # Reusable UI components
│   │   ├── 📂 pages/            # Route-level pages
│   │   ├── 📂 services/         # API calls
│   │   └── 📂 context/          # Global state
│   └── package.json
│
└── README.md
```

---

## 🌍 Environment Variables

Create a `.env` file in the `/backend` directory with the following:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/referralx

# Authentication
SECRET_KEY=your_jwt_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. 🍴 **Fork** the repository
2. 🌿 **Create** a feature branch: `git checkout -b feature/your-feature-name`
3. 💾 **Commit** your changes: `git commit -m 'Add: your feature description'`
4. 📤 **Push** to your branch: `git push origin feature/your-feature-name`
5. 🔃 **Open** a Pull Request

> For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ by the ReferralX Team

⭐ **Star this repo** if you find it useful!

</div>
