import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h2>ReferralX</h2>
          <p>
            AI-powered employee referral platform helping
            students connect with verified professionals.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>

          <a href="/">Home</a>
          <a href="/referrals">Referrals</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div>

        <div className="footer-links">
          <h3>Legal</h3>

          <a href="/">Privacy Policy</a>
          <a href="/">Terms & Conditions</a>
        </div>

        <div className="footer-links">
          <h3>Connect</h3>

          <a href="/">LinkedIn</a>
          <a href="/">GitHub</a>
          <a href="/">Twitter</a>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 ReferralX. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;