const request = require("supertest");
const app = require("../app");

describe("Testing the priority endpoints", () => {
  it("tests the status code for the get all endpoint", async (done) => {
    const response = await request(app).get("/api/priority");
    expect(response.status).toBe(200);
    done();
  });

  it("tests for successful get by priority id endpoint", async (done) => {
    const response = await request(app).get("/api/priority/11");
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("tests for failed get by priority id endpoint for non existant priority id", async (done) => {
    const response = await request(app).get("/api/priority/1110");
    expect(response.status).toBe(404);
    done();
  });

  it("tests for failed get by priority id endpoint for bad parameter", async (done) => {
    const response = await request(app).get("/api/priority/abc");
    expect(response.status).toBe(400);
    done();
  });
});
