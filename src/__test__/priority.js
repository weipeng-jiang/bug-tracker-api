const request = require("supertest");
const app = require("../app");
const token = require("../utils/token");

module.exports = describe("Testing the priority endpoints", () => {
  it("Should return 401 because of no token", async (done) => {
    const response = await request(app).get("/api/priority");
    expect(response.status).toBe(401);
    done();
  });

  it("Should return 200 and all priorities", async (done) => {
    const response = await request(app)
      .get("/api/priority")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 200 and a priority", async (done) => {
    const response = await request(app)
      .get("/api/priority/11")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 404 when priority with specified id doesn't exist", async (done) => {
    const response = await request(app)
      .get("/api/priority/1110")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app)
      .get("/api/priority/abc")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app)
      .get("/api/priority/abc21151")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app)
      .get("/api/priority/*(&(*&$")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });
});
