import "../styles/TrustedBy.css";

import googleLogo from "../assets/logos/google.svg";
import microsoftLogo from "../assets/logos/microsoft.svg";
import amazonLogo from "../assets/logos/amazon.svg";
import metaLogo from "../assets/logos/meta.svg";
import netflixLogo from "../assets/logos/netflix.svg";

function TrustedBy() {
  const companies = [
    { name: "Google", logo: googleLogo },
    { name: "Microsoft", logo: microsoftLogo },
    { name: "Amazon", logo: amazonLogo },
    { name: "Meta", logo: metaLogo },
    { name: "Netflix", logo: netflixLogo },
  ];

  return (
    <section className="trusted">
      <h2>Trusted by Students Targeting Top Companies</h2>

      <p className="trusted-subtitle">
        Explore referral opportunities from leading technology companies.
      </p>

      <div className="logo-strip">
        {companies.map((company) => (
          <div key={company.name} className="logo-item">
            <img
              src={company.logo}
              alt={company.name}
              className="company-logo"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default TrustedBy;