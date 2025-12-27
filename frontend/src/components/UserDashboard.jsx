import InterviewList from "./InterviewList";

export default function UserDashboard({ interviews, userName }) {
  // ✅ FRONTEND FILTER to guarantee privacy
  const filteredInterviews = interviews.filter(i =>
    i.candidate.toLowerCase().includes((userName || "").toLowerCase())
  );

  return (
    <>
      <h2>User Dashboard</h2>

      {/* Show who is logged in */}
      <p style={{ color: "#555", marginBottom: "10px" }}>
        Showing schedules for: <strong>{userName || "Unknown"}</strong>
      </p>

      {filteredInterviews.length > 0 ? (
        <>
          <p>Welcome! Here are the scheduled interviews.</p>
          <InterviewList interviews={filteredInterviews} role="user" />
        </>
      ) : (
        <div style={{ padding: "20px", background: "#ffebee", color: "#c62828", borderRadius: "8px", marginTop: "20px" }}>
          <strong>No interviews found.</strong>
          <p>We could not find any schedules matching your profile.</p>
        </div>
      )}
    </>
  );
}
