const request = require("supertest");
const app = require("../app");

describe("Testing the status endpoints", () => {
  it("tests the status code for the get all endpoint", async (done) => {
    const response = await request(app).get("/api/status");
    expect(response.status).toBe(200);
    done();
  });

  it("tests for successful get by status id endpoint", async (done) => {
    const response = await request(app).get("/api/status/0");
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("tests for failed get by status id endpoint for non existant status id", async (done) => {
    const response = await request(app).get("/api/status/111");
    expect(response.status).toBe(404);
    done();
  });

  it("tests for failed get by status id endpoint for bad parameter", async (done) => {
    const response = await request(app).get("/api/status/abc");
    expect(response.status).toBe(400);
    done();
  });
});
