const axios = require('axios');

async function testPost() {
    try {
        const res = await axios.post('http://localhost:5000/api/interviews', {
            candidate: "Test Candidate",
            position: "Test Position",
            date: "2026-02-01",
            startTime: "10:00",
            type: "zoom",
            round: "technical",
            interviewer: "Test Interviewer"
        }, {
            headers: { Authorization: "Bearer test_token" } // This will fail auth if no real token
        });
        console.log("Success:", res.data);
    } catch (err) {
        console.log("Status:", err.response?.status);
        console.log("Message:", err.response?.data?.message || err.message);
    }
}

testPost();
