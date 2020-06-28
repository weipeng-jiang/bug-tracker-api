const request = require("supertest");
const app = require("../app");
const token = require("../utils/token");

module.exports = describe("Test types endpoint", () => {
  it("Should return 401 because of no token.", async (done) => {
    const response = await request(app).get("/api/types");
    expect(response.status).toBe(401);
    done();
  });

  it("Should return 200 and all types", async (done) => {
    const response = await request(app)
      .get("/api/types")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 200 and one type", async (done) => {
    const response = await request(app)
      .get("/api/types/1")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });
});
