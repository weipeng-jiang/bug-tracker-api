const request = require("supertest");
const app = require("../app");

describe("Testing the roles endpoints", () => {
  it("Should return 200 and all roles", async (done) => {
    const response = await request(app).get("/api/roles");
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 200 and a role", async (done) => {
    const response = await request(app).get("/api/roles/1");
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 404 when role doesn't exist", async (done) => {
    const expectedResult = {
      message: "Role ID is not found",
    };
    const response = await request(app).get("/api/roles/1000");
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app).get("/api/roles/abc");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app).get("/api/roles/iawub31243fdd1");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app).get("/api/roles/(&*Y(#HJFF#2132))");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });
});
