const request = require("supertest");
const app = require("../app");
const token = require("../utils/token");

module.exports = describe("Testing the userIssues endpoints", () => {
  it("Should return 401 because of no token", async (done) => {
    const response = await request(app).get("/api/userIssues");
    expect(response.status).toBe(401);
    done();
  });

  it("Should return 200 and all userIssues", async (done) => {
    const response = await request(app)
      .get("/api/userIssues")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 200 and all users with specified user ID", async (done) => {
    const response = await request(app)
      .get("/api/userIssues/user/5")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    expect(response.body.length).not.toBe(0);
    done();
  });

  it("Should return 404 when user ID not found", async (done) => {
    const expectedResult = {
      message: "User ID is not found",
    };
    const response = await request(app)
      .get("/api/userIssues/user/1000")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 400 for bad parameter; characters", async (done) => {
    const response = await request(app)
      .get("/api/userIssues/user/abc")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 200 and all userIssues with specified issue ID", async (done) => {
    const response = await request(app)
      .get("/api/userIssues/issue/39")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    expect(response.body.length).not.toBe(0);
    done();
  });

  it("Should return 404 when issue ID is not found", async (done) => {
    const expectedResult = {
      message: "Issue ID is not found",
    };
    const response = await request(app)
      .get("/api/userIssues/issue/1000")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 400 for bad parameter; characters", async (done) => {
    const response = await request(app)
      .get("/api/userIssues/issue/abc")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 200 and one userIssue", async (done) => {
    const response = await request(app)
      .get("/api/userIssues/5/39")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 404 when user ID and issue ID is not found", async (done) => {
    const expectedResult = {
      message: "User ID or Issue ID is not found",
    };
    const response = await request(app)
      .get("/api/userIssues/1000/1000")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 404 when user ID is not found", async (done) => {
    const expectedResult = {
      message: "User ID or Issue ID is not found",
    };
    const response = await request(app)
      .get("/api/userIssues/1000/1")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 404 when issue ID is not found", async (done) => {
    const expectedResult = {
      message: "User ID or Issue ID is not found",
    };
    const response = await request(app)
      .get("/api/userIssues/5/1000")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 400 for bad parameters; both characters", async (done) => {
    const response = await request(app)
      .get("/api/userIssues/abc/abc")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters; issue ID parameter as characters", async (done) => {
    const response = await request(app)
      .get("/api/userIssues/5/abc")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters; user ID parameter as characters", async (done) => {
    const response = await request(app)
      .get("/api/userIssues/abc/1")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters; issue ID parameter as characters and numbers", async (done) => {
    const response = await request(app)
      .get("/api/userIssues/5/abc2131")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters; user ID parameter as characters and numbers", async (done) => {
    const response = await request(app)
      .get("/api/userIssues/abc12356/1")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  //This test will pass on the first go but not on subsequent calls
  // it("Should return 201 for successful post", async (done) => {
  //   const response = await request(app).post("/api/userIssues/")
  // .set("Authorization", `bearer ${token}`).send({
  //     user_id: "23",
  //     issue_id: "30",
  //   });
  //   expect(response.status).toBe(201);
  //   expect(response.body).toEqual({});
  //   done();
  // });

  it("Should return 400 for bad parameters; no user ID or issue ID", async (done) => {
    const response = await request(app)
      .post("/api/userIssues/")
      .set("Authorization", `bearer ${token}`)
      .send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });
});
