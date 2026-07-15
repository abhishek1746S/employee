import "../styles/Features.css";

function Features() {
  const features = [
    {
      icon: "🤖",
      title: "AI Resume Analysis",
      description:
        "Automatically evaluate resumes against job requirements.",
    },
    {
      icon: "📝",
      title: "Skill Assessments",
      description:
        "Generate and evaluate assessments based on required skills.",
    },
    {
      icon: "🏆",
      title: "Smart Ranking",
      description:
        "Rank candidates using resume and assessment scores.",
    },
    {
      icon: "🔒",
      title: "Verified Employees",
      description:
        "Get referrals from trusted and verified professionals.",
    },
  ];

  return (
    <section id="features" className="features">
      <h2>Why Choose ReferralX?</h2>

      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>

            <h3>{feature.title}</h3>

            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;