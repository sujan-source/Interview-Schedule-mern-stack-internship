import axios from "axios";

const API = "http://localhost:5000/api/interviews";

export const getInterviews = () => axios.get(API);
export const addInterview = (data) => axios.post(API, data);
export const updateInterview = (id, data) =>
  axios.put(`${API}/${id}`, data);
export const deleteInterview = (id) =>
  axios.delete(`${API}/${id}`);
