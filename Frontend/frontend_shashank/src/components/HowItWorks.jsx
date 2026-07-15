import "../styles/HowItWorks.css";

function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Find Referral Opportunities",
      description:
        "Browse verified referral opportunities posted by employees.",
    },
    {
      number: "02",
      title: "Upload Resume",
      description:
        "Submit your resume for AI-powered screening and evaluation.",
    },
    {
      number: "03",
      title: "Take Assessment",
      description: "Complete skill-based assessments generated for the role.",
    },
    {
      number: "04",
      title: "Get Shortlisted",
      description: "Top candidates are automatically ranked and shortlisted.",
    },
    {
      number: "05",
      title: "Receive Referral",
      description: "Verified employees review and refer qualified candidates.",
    },
  ];

  return (
    <section id="how-it-works" className="how-it-works">
      <h2>How ReferralX Works</h2>

      <div className="steps-container">
        {steps.map((step) => (
          <div key={step.number} className="step-card">
            <span className="step-number">{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;
