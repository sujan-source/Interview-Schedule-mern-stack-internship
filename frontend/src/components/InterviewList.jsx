export default function InterviewList({
  interviews,
  onEdit,
  onDelete,
  role, // admin | user
}) {
  return (
    <ul className="interview-list">
      {interviews.length === 0 && <p>No scheduled interviews.</p>}

      {interviews.map((i) => (
        <li key={i._id} className="interview-item">
          <div>
            <strong>{i.candidate}</strong> — {i.position}
            <br />
            <small>📅 {i.date} at {i.time} {i.interviewer && `| 🎤 ${i.interviewer}`}</small>
          </div>

          {/* ✅ ONLY ADMIN CAN EDIT / DELETE */}
          {role === "admin" && (
            <div className="actions">
              <button onClick={() => onEdit(i)}>Edit</button>
              <button onClick={() => onDelete(i._id)} className="delete-btn">Delete</button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
