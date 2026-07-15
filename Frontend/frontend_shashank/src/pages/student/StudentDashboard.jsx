import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function StudentDashboard() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <>
      <Navbar />

      <div
        style={{
          display: "flex",
          marginTop: "80px",
        }}
      >
        <Sidebar />

        <div
          style={{
            marginLeft: "270px",
            padding: "30px",
          }}
        >
          <h1>
            Welcome, {user?.name}
          </h1>

          <p>
            Student Dashboard
          </p>
        </div>
      </div>
    </>
  );
}

export default StudentDashboard;