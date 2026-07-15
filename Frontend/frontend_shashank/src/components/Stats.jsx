import "../styles/Stats.css";

function Stats() {
  return (
    <section className="stats">
      <h2>Trusted by Students and Professionals</h2>

      <div className="stats-container">
        <div className="stat-box">
          <h3>50K+</h3>
          <p>Students</p>
        </div>

        <div className="stat-box">
          <h3>5K+</h3>
          <p>Verified Employees</p>
        </div>

        <div className="stat-box">
          <h3>10K+</h3>
          <p>Successful Referrals</p>
        </div>

        <div className="stat-box">
          <h3>95%</h3>
          <p>Resume Match Accuracy</p>
        </div>
      </div>
    </section>
  );
}

export default Stats;