const axios = require("axios");

describe("Orders tests", () => {
  it("read all orders", async () => {
    const res = await axios({
      url: "http://localhost:5001/trybuy-d42d2/us-central1/api/v1/orders",
    });
    expect(res.status).toBe(200);
  });
});
