import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import {
  getAllReferrals,
  createReferral,
  closeReferral,
  reopenReferral,
} from "../services/referralService";

import "../styles/Referrals.css";

function Referrals() {
  const [referrals, setReferrals] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const role = user?.role || "";

  const [formData, setFormData] = useState({
    company_name: "",
    job_role: "",
    required_skills: "",
    eligibility: "",
    slots: 1,
  });

  useEffect(() => {
    fetchReferrals();
  }, []);

  const fetchReferrals = async () => {
    try {
      const data = await getAllReferrals();
      setReferrals(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "slots"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleCreate = async () => {
    try {
      await createReferral(formData);

      alert("Referral Created Successfully");

      setShowForm(false);

      setFormData({
        company_name: "",
        job_role: "",
        required_skills: "",
        eligibility: "",
        slots: 1,
      });

      fetchReferrals();
    } catch (error) {
      console.log(error);
      alert("Failed to create referral");
    }
  };

  const handleClose = async (id) => {
    try {
      await closeReferral(id);
      fetchReferrals();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReopen = async (id) => {
    try {
      await reopenReferral(id);
      fetchReferrals();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="referrals-layout">
        <Sidebar />

        <div className="referrals-content">
          <div className="referrals-top">
            <h1>Referral Opportunities</h1>

            {(role === "employee" ||
              role === "admin") && (
              <button
                className="create-btn"
                onClick={() =>
                  setShowForm(!showForm)
                }
              >
                + Create Referral
              </button>
            )}
          </div>

          {showForm &&
            (role === "employee" ||
              role === "admin") && (
              <div className="create-card">
                <input
                  type="text"
                  name="company_name"
                  placeholder="Company Name"
                  value={formData.company_name}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="job_role"
                  placeholder="Job Role"
                  value={formData.job_role}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="required_skills"
                  placeholder="Required Skills"
                  value={formData.required_skills}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="eligibility"
                  placeholder="Eligibility"
                  value={formData.eligibility}
                  onChange={handleChange}
                />

                <input
                  type="number"
                  name="slots"
                  value={formData.slots}
                  onChange={handleChange}
                />

                <button
                  className="save-btn"
                  onClick={handleCreate}
                >
                  Create Referral
                </button>
              </div>
            )}

          <div className="referral-grid">
            {referrals.length === 0 ? (
              <div className="no-referrals">
                <h2>
                  🚫 Currently No Referrals
                  Available
                </h2>

                <p>
                  There are no referral
                  opportunities available at
                  the moment.
                </p>
              </div>
            ) : (
              referrals.map((referral) => (
                <div
                  key={referral.id}
                  className="referral-card"
                >
                  <div className="card-header">
                    <h2>
                      {referral.company_name}
                    </h2>

                    <span
                      className={
                        referral.is_active
                          ? "status active"
                          : "status closed"
                      }
                    >
                      {referral.is_active
                        ? "Open"
                        : "Closed"}
                    </span>
                  </div>

                  <h3>{referral.job_role}</h3>

                  <p>
                    <strong>Skills:</strong>{" "}
                    {
                      referral.required_skills
                    }
                  </p>

                  <p>
                    <strong>
                      Eligibility:
                    </strong>{" "}
                    {referral.eligibility}
                  </p>

                  <p>
                    <strong>Slots:</strong>{" "}
                    {referral.slots}
                  </p>

                  {(role === "employee" ||
                    role === "admin") && (
                    <div className="card-actions">
                      {referral.is_active ? (
                        <button
                          className="close-btn"
                          onClick={() =>
                            handleClose(
                              referral.id
                            )
                          }
                        >
                          Close
                        </button>
                      ) : (
                        <button
                          className="open-btn"
                          onClick={() =>
                            handleReopen(
                              referral.id
                            )
                          }
                        >
                          Reopen
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Referrals;