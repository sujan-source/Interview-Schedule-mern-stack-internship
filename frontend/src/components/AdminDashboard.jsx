import InterviewList from "./InterviewList";

export default function AdminDashboard({
  interviews,
  onEdit,
  onSubmit, // Function to handle Add/Update
  onDelete,
  interviewData, // Current form state
  setInterview, // Function to update form state
  editId
}) {
  return (
    <>
      <h2>Admin Dashboard</h2>

      <div className="form-container">
        <h3>{editId ? "Edit Interview" : "Schedule Interview"}</h3>
        <input
          placeholder="Candidate Name"
          value={interviewData.candidate}
          onChange={(e) =>
            setInterview({ ...interviewData, candidate: e.target.value })
          }
        />
        <input
          placeholder="Position"
          value={interviewData.position}
          onChange={(e) =>
            setInterview({ ...interviewData, position: e.target.value })
          }
        />
        <input
          placeholder="Interviewer"
          value={interviewData.interviewer || ""}
          onChange={(e) =>
            setInterview({ ...interviewData, interviewer: e.target.value })
          }
        />
        <input
          type="date"
          value={interviewData.date}
          onChange={(e) =>
            setInterview({ ...interviewData, date: e.target.value })
          }
        />
        <input
          type="time"
          value={interviewData.time}
          onChange={(e) =>
            setInterview({ ...interviewData, time: e.target.value })
          }
        />
        <button onClick={onSubmit}>
          {editId ? "Update Interview" : "Schedule Interview"}
        </button>
      </div>

      <hr />

      <InterviewList
        interviews={interviews}
        onEdit={onEdit}
        onDelete={onDelete}
        role="admin"
      />
    </>
  );
}
