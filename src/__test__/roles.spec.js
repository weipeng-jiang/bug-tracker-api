const request = require("supertest");
const app = require("../app");

describe("Testing the roles endpoints", () => {
  it("tests the status code for the get all endpoint", async (done) => {
    const response = await request(app).get("/api/roles");
    expect(response.status).toBe(200);
    done();
  });

  it("tests for successful get by roles id endpoint", async (done) => {
    const response = await request(app).get("/api/roles/1");
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("tests for failed get by roles id endpoint for non existant role id", async (done) => {
    const response = await request(app).get("/api/roles/1000");
    expect(response.status).toBe(404);
    done();
  });

  it("tests for failed get by roles id endpoint for bad parameter", async (done) => {
    const response = await request(app).get("/api/roles/abc");
    expect(response.status).toBe(400);
    done();
  });
});
