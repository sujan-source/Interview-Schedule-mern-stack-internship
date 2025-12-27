import { useEffect, useState } from "react";

export default function InterviewForm({ selected, onSave }) {
  const [form, setForm] = useState({
    candidate: "",
    date: "",
    interviewer: "",
  });

  useEffect(() => {
    if (!selected) return;

    setForm({
      candidate: selected.candidate,
      date: selected.date,
      interviewer: selected.interviewer,
    });
  },[selected]); // ✅ dependency array FIXED

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Interview Form</h3>

      <input
        name="candidate"
        placeholder="Candidate Name"
        value={form.candidate}
        onChange={handleChange}
        required
      />

      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        required
      />

      <input
        name="interviewer"
        placeholder="Interviewer"
        value={form.interviewer}
        onChange={handleChange}
        required
      />

      <button type="submit">Save</button>
    </form>
  );
}
