const http = require("http");
const app = require("./app");

const server = app.listen(0, async () => {
  const port = server.address().port;
  const baseUrl = `http://localhost:${port}`;

  console.log(`Test server running on port ${port}`);

  async function request(method, path, body = null) {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await fetch(`${baseUrl}${path}`, {
      ...options,
      body: body ? JSON.stringify(body) : undefined
    });

    const data = await res.json();
    return { status: res.status, data };
  }

  try {
    console.log("\n--- Testing GET /students ---");
    let res = await request("GET", "/students");
    console.log("Status:", res.status, "Response:", JSON.stringify(res.data));

    console.log("\n--- Testing GET /students/1 ---");
    res = await request("GET", "/students/1");
    console.log("Status:", res.status, "Response:", JSON.stringify(res.data));

    console.log("\n--- Testing GET /students/999 (Not Found) ---");
    res = await request("GET", "/students/999");
    console.log("Status:", res.status, "Response:", JSON.stringify(res.data));

    console.log("\n--- Testing GET /students/abc (Invalid ID) ---");
    res = await request("GET", "/students/abc");
    console.log("Status:", res.status, "Response:", JSON.stringify(res.data));

    console.log("\n--- Testing POST /students (Valid) ---");
    res = await request("POST", "/students", { name: "Neha", course: "MCA" });
    console.log("Status:", res.status, "Response:", JSON.stringify(res.data));

    console.log("\n--- Testing POST /students (Invalid Input) ---");
    res = await request("POST", "/students", { name: "" });
    console.log("Status:", res.status, "Response:", JSON.stringify(res.data));

    console.log("\n--- Testing PUT /students/1 (Valid Update) ---");
    res = await request("PUT", "/students/1", { course: "MCA" });
    console.log("Status:", res.status, "Response:", JSON.stringify(res.data));

    console.log("\n--- Testing PUT /students/999 (Not Found) ---");
    res = await request("PUT", "/students/999", { name: "Ghost" });
    console.log("Status:", res.status, "Response:", JSON.stringify(res.data));

    console.log("\n--- Testing DELETE /students/2 (Delete Priya) ---");
    res = await request("DELETE", "/students/2");
    console.log("Status:", res.status, "Response:", JSON.stringify(res.data));

    console.log("\n--- Testing DELETE /students/999 (Not Found) ---");
    res = await request("DELETE", "/students/999");
    console.log("Status:", res.status, "Response:", JSON.stringify(res.data));

    console.log("\n--- Testing Undefined Route GET /random ---");
    res = await request("GET", "/random");
    console.log("Status:", res.status, "Response:", JSON.stringify(res.data));

    console.log("\nAll API tests completed successfully!");
  } catch (err) {
    console.error("Test error:", err);
  } finally {
    server.close(() => {
      console.log("Test server closed.");
      process.exit(0);
    });
  }
});
