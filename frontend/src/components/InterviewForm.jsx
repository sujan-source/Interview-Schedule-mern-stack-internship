import { useEffect, useState } from "react";
import axios from "axios";

export default function InterviewForm({ selected, onSave, token, role }) {
  const [form, setForm] = useState({
    candidate: "",
    position: "",
    date: "",
    startTime: "",
    type: "zoom",
    round: "screening",
    interviewer: "",
    status: "pending",
  });

  const initialState = {
    candidate: "",
    position: "",
    date: "",
    startTime: "",
    type: "zoom",
    round: "screening",
    interviewer: "",
    status: "pending",
  };

  useEffect(() => {
    if (selected) {
      setForm({
        ...selected,
        date: selected.date ? new Date(selected.date).toISOString().split('T')[0] : "",
        candidate: selected.candidate?.name || selected.candidate || "",
        interviewer: selected.interviewer?.name || selected.interviewer || "",
        status: selected.status || "pending"
      });
    } else {
      setForm(initialState);
    }
  }, [selected]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    if (!selected) {
      setForm(initialState);
    }
  };

  const isInterviewer = role === "interviewer";

  return (
    <div className="glass-card form-container">
      <h3>{selected ? "Edit" : "Schedule"} Interview</h3>
      <form onSubmit={handleSubmit} className="modern-form">
        <div className="form-group">
          <label>Candidate Name</label>
          <input
            name="candidate"
            value={form.candidate}
            onChange={handleChange}
            required
            placeholder="e.g. John Doe"
            disabled={isInterviewer}
          />
        </div>

        <div className="form-group">
          <label>Position</label>
          <input
            name="position"
            value={form.position}
            onChange={handleChange}
            required
            placeholder="e.g. Frontend Engineer"
            disabled={isInterviewer}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Date</label>
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              required
              disabled={isInterviewer}
            />
          </div>
          <div className="form-group">
            <label>Start Time</label>
            <input
              name="startTime"
              type="time"
              value={form.startTime}
              onChange={handleChange}
              required
              disabled={isInterviewer}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Type</label>
            <select name="type" value={form.type} onChange={handleChange} disabled={isInterviewer}>
              <option value="in-person">In Person</option>
              <option value="zoom">Zoom</option>
              <option value="teams">Microsoft Teams</option>
              <option value="phone">Phone</option>
            </select>
          </div>
          <div className="form-group">
            <label>Round</label>
            <select name="round" value={form.round} onChange={handleChange} disabled={isInterviewer}>
              <option value="screening">Screening</option>
              <option value="technical">Technical</option>
              <option value="hr">HR</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Interviewer Name</label>
          <input
            name="interviewer"
            value={form.interviewer}
            onChange={handleChange}
            required
            placeholder="e.g. Jane Smith"
            disabled={isInterviewer}
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="pending">Pending</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <button type="submit" className="btn-save">{selected ? "Update" : "Schedule"}</button>
      </form>
    </div>
  );
}
