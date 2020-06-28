const request = require("supertest");
const app = require("../app");
const token = require("../utils/token");

module.exports = describe("Testing the roles endpoints", () => {
  it("Should return 401 because of no token", async (done) => {
    const response = await request(app).get("/api/roles");
    expect(response.status).toBe(401);
    done();
  });

  it("Should return 200 and all roles", async (done) => {
    const response = await request(app)
      .get("/api/roles")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 200 and one role", async (done) => {
    const response = await request(app)
      .get("/api/roles/1")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 404 when role ID doesn't exist", async (done) => {
    const expectedResult = {
      message: "Role ID is not found",
    };
    const response = await request(app)
      .get("/api/roles/1000")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 400 for bad parameters; characters", async (done) => {
    const response = await request(app)
      .get("/api/roles/abc")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters; characters and numbers", async (done) => {
    const response = await request(app)
      .get("/api/roles/iawub31243fdd1")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters; punctuation", async (done) => {
    const response = await request(app)
      .get("/api/roles/(&*Y(#HJFF#2132))")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });
});
