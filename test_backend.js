const axios = require("axios");

const API_URL = "http://localhost:5000/api";

const testAuth = async () => {
    try {
        console.log("1. Testing Registration...");
        const email = `testuser_${Date.now()}@example.com`;
        const password = "password123";

        let registerRes;
        try {
            registerRes = await axios.post(`${API_URL}/auth/signup`, { email, password });
            console.log("✅ Registration successful:", registerRes.data.message);
        } catch (e) {
            console.error("❌ Registration failed:", e.response ? e.response.data : e.message);
            return;
        }

        const token = registerRes.data.token;
        if (!token) {
            console.error("❌ No token received after registration!");
            return;
        }
        console.log("✅ Token received.");

        console.log("2. Testing Protected Route (Create Interview)...");
        try {
            const interviewRes = await axios.post(
                `${API_URL}/interviews`,
                {
                    candidate: "John Doe",
                    position: "Developer",
                    date: "2024-12-25",
                    time: "10:00 AM"
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            console.log("✅ Protected Route Access successful:", interviewRes.data);
        } catch (e) {
            console.error("❌ Protected Route Access failed:", e.response ? e.response.data : e.message);
        }

        console.log("3. Testing Unauthorized Access...");
        try {
            await axios.get(`${API_URL}/interviews`);
            console.error("❌ Unauthorized access check FAILED (Should have failed but succeeded)");
        } catch (e) {
            if (e.response && e.response.status === 401) {
                console.log("✅ Unauthorized access correctly blocked (401).");
            } else {
                console.error("❌ Unexpected error:", e.message);
            }
        }

    } catch (err) {
        console.error("Unexpected error:", err);
    }
};

testAuth();
