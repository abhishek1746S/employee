import "../styles/HeroSection.css";

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-badge">
        <span className="badge-dot"></span>
        AI-Powered Employee Referral Platform
      </div>

      <h1 className="hero-title">
        Get Referred by Verified Employees and Accelerate Your Career Growth
      </h1>

      <p className="hero-subtitle">
        ReferralX connects students with verified professionals using AI-powered
        resume screening, skill assessments, and intelligent candidate matching
        to maximize referral success rates.
      </p>

      <div className="hero-buttons">
        <button className="primary-btn">Find Referrals</button>

        <button className="secondary-btn">Become a Referrer</button>
      </div>

      <div className="hero-stats">
        <div className="stat">
          <h2>50K+</h2>
          <p>Students</p>
        </div>

        <div className="stat">
          <h2>5K+</h2>
          <p>Verified Employees</p>
        </div>

        <div className="stat">
          <h2>10K+</h2>
          <p>Successful Referrals</p>
        </div>

        <div className="stat">
          <h2>95%</h2>
          <p>Resume Match Accuracy</p>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
