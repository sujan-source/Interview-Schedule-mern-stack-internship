import React, { useState } from 'react';
import InterviewList from "./InterviewList";
import InterviewForm from "./InterviewForm";
import AnalyticsDashboard from "./AnalyticsDashboard";

export default function AdminDashboard({
  interviews,
  onEdit,
  onSubmit,
  onDelete,
  interviewData,
  setInterview,
  editId,
  token,
  role
}) {
  const [view, setView] = useState("interviews"); // interviews | analytics

  return (
    <div className="admin-container">
      <div className="tabs">
        <button className={view === "interviews" ? "active" : ""} onClick={() => setView("interviews")}>Interviews</button>
        {role === "admin" && (
          <button className={view === "analytics" ? "active" : ""} onClick={() => setView("analytics")}>Analytics</button>
        )}
      </div>

      {view === "interviews" ? (
        <div className="dashboard-content">
          <div className={(role === "admin" || (role === "interviewer" && editId)) ? "grid-2-1" : "grid-full"}>
            <div className="list-section">
              <InterviewList
                interviews={interviews}
                onEdit={onEdit}
                onDelete={onDelete}
                role={role}
              />
            </div>
            {(role === "admin" || (role === "interviewer" && editId)) && (
              <div className="form-section">
                <InterviewForm
                  selected={editId ? interviewData : null}
                  onSave={(data) => onSubmit(data)}
                  token={token}
                  role={role}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <AnalyticsDashboard token={token} />
      )}

      <style jsx>{`
        .admin-container { width: 100%; }
        .tabs { display: flex; gap: 10px; margin-bottom: 30px; }
        .tabs button { 
            width: auto; padding: 10px 25px; background: var(--glass); 
            border: 1px solid var(--border); border-radius: 12px;
        }
        .tabs button.active { background: var(--primary); border-color: var(--primary); }
        .grid-2-1 { display: grid; grid-template-columns: 2fr 1fr; gap: 30px; }
        .grid-full { display: block; width: 100%; }
        @media (max-width: 1000px) { .grid-2-1 { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
