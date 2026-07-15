import "../styles/CTA.css";

function CTA() {
  return (
    <section className="cta">
      <div className="cta-container">
        <h2>
          Ready to Accelerate Your Career?
        </h2>

        <p>
          Join thousands of students and professionals
          using ReferralX to discover opportunities,
          build connections, and secure referrals.
        </p>

        <div className="cta-buttons">
          <button className="cta-primary">
            Get Started
          </button>

          <button className="cta-secondary">
            Explore Referrals
          </button>
        </div>
      </div>
    </section>
  );
}

export default CTA;