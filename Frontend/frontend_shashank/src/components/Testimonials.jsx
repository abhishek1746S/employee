import "../styles/Testimonials.css";

function Testimonials() {
  return (
    <section
      style={{
        padding: "80px 20px",
        textAlign: "center",
      }}
    >
      <h2>Success Stories</h2>

      <div
        style={{
          maxWidth: "700px",
          margin: "30px auto",
          border: "1px solid #ddd",
          padding: "30px",
          borderRadius: "10px",
        }}
      >
        <h3>⭐⭐⭐⭐⭐</h3>

        <p>
          "ReferralX helped me get referred for an internship
          and land interviews much faster."
        </p>

        <h4>- Student</h4>
      </div>
    </section>
  );
}

export default Testimonials;