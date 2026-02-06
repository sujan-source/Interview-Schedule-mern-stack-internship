import { FaEdit, FaTrash, FaVideo, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaClock } from 'react-icons/fa';

export default function InterviewList({
  interviews,
  onEdit,
  onDelete,
  role,
}) {
  const getStatusClass = (status) => {
    switch (status) {
      case 'scheduled': return 'status-scheduled';
      case 'pending': return 'status-pending';
      case 'cancelled': return 'status-cancelled';
      case 'completed': return 'status-completed';
      default: return '';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'zoom':
      case 'teams': return <FaVideo />;
      case 'phone': return <FaPhone />;
      case 'in-person': return <FaMapMarkerAlt />;
      default: return <FaCalendarAlt />;
    }
  };

  return (
    <div className="interview-list-container">
      <div className="interview-list-header">
        <h3>{role === 'admin' ? 'Total Interviews' : 'Your Interviews'}</h3>
        <span className="badge">{interviews.length} Scheduled</span>
      </div>

      <div className="dashboard-grid">
        {interviews.length === 0 && <p className="text-muted">No interviews found.</p>}

        {interviews.map((i) => (
          <div key={i._id} className="interview-card">
            <div className="card-top">
              <span className={`status-badge ${getStatusClass(i.status)}`}>
                {i.status}
              </span>
              <span className="round-badge">{i.round}</span>
            </div>

            <div className="card-body">
              <h4>{i.position}</h4>
              <p className="candidate-name">{i.candidate?.name || i.candidate}</p>

              <div className="info-row" style={{ marginTop: '-10px', marginBottom: '15px' }}>
                <span className="text-muted">Interviewer: </span>
                <span style={{ fontWeight: 500 }}>{i.interviewer?.name || i.interviewer || "N/A"}</span>
              </div>

              <div className="info-row">
                <FaCalendarAlt className="icon" />
                <span>{new Date(i.date).toLocaleDateString()}</span>
              </div>
              <div className="info-row">
                <FaClock className="icon" />
                <span>{i.startTime}</span>
              </div>

              <div className="info-row">
                {getTypeIcon(i.type)}
                <span className="capitalize">{i.type}</span>
              </div>

              {i.meetingLink && (
                <a href={i.meetingLink} target="_blank" rel="noreferrer" className="meeting-link">
                  <FaVideo /> Join Meeting
                </a>
              )}
            </div>

            {(role === "admin" || role === "interviewer") && (
              <div className="card-actions">
                <button className="btn-icon" onClick={() => onEdit(i)} title="Edit">
                  <FaEdit />
                </button>
                {role === "admin" && (
                  <button className="btn-icon btn-delete" onClick={() => onDelete(i._id)} title="Delete">
                    <FaTrash />
                  </button>
                )}
              </div>
            )}

            <style jsx>{`
              .card-top { display: flex; justify-content: space-between; margin-bottom: 15px; }
              .round-badge { font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; }
              .card-body h4 { margin-bottom: 5px; color: var(--text); }
              .candidate-name { color: var(--primary); font-weight: 600; margin-bottom: 15px; }
              .info-row { display: flex; align-items: center; gap: 10px; color: var(--text-muted); font-size: 0.9rem; margin-bottom: 8px; }
              .icon { color: var(--primary); }
              .card-actions { display: flex; justify-content: flex-end; gap: 10px; border-top: 1px solid var(--border); padding-top: 15px; margin-top: 15px; }
              .capitalize { text-transform: capitalize; }
            `}</style>
          </div>
        ))}
      </div>
    </div>
  );
}
