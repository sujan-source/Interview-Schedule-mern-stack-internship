import InterviewList from "./InterviewList";
import { FaUserGraduate } from 'react-icons/fa';

export default function UserDashboard({ interviews, userName }) {
  return (
    <div className="user-dashboard">
      <div className="glass-card welcome-banner" style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div className="avatar-circle">
          <FaUserGraduate size={30} />
        </div>
        <div>
          <h2>Welcome back, {userName}!</h2>
          <p className="text-muted">Track your interview progress and join virtual sessions.</p>
        </div>
      </div>

      <InterviewList interviews={interviews} role="user" />

      <style jsx>{`
        .avatar-circle {
            width: 60px;
            height: 60px;
            background: var(--primary);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .welcome-banner h2 { margin-bottom: 5px; background: none; -webkit-text-fill-color: initial; color: white; }
      `}</style>
    </div>
  );
}
