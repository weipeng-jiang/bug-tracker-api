const request = require("supertest");
const app = require("../app");
const token = require("../utils/token");

describe("Testing the status endpoints", () => {
  it("Should return 401 because of no token", async (done) => {
    const response = await request(app).get("/api/status");
    expect(response.status).toBe(401);
    done();
  });

  it("Should return 200 and all statuses", async (done) => {
    const response = await request(app)
      .get("/api/status")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 200 and a status", async (done) => {
    const response = await request(app)
      .get("/api/status/0")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 404 when status doesn't exist", async (done) => {
    const expectedResult = {
      message: "Status ID is not found",
    };
    const response = await request(app)
      .get("/api/status/111")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 400 for bad parameter", async (done) => {
    const response = await request(app)
      .get("/api/status/abc")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameter", async (done) => {
    const response = await request(app)
      .get("/api/status/abc123dqfwe21")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameter", async (done) => {
    const response = await request(app)
      .get("/api/status/d32*&GGD#93gd9")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });
});
