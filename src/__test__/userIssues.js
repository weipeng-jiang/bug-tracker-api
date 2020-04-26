const request = require("supertest");
const app = require("../app");

describe("Testing the userIssues endpoints", () => {
  it("Should return 200 and all userIssues", async (done) => {
    const response = await request(app).get("/api/userIssues");
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 200 and all users with specified user ID", async (done) => {
    const response = await request(app).get("/api/userIssues/user/5");
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    expect(response.body.length).not.toBe(0);
    done();
  });

  it("Should return 404 when user ID not found", async (done) => {
    const expectedResult = {
      message: "User ID is not found",
    };
    const response = await request(app).get("/api/userIssues/user/1000");
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 400 for bad parameter", async (done) => {
    const response = await request(app).get("/api/userIssues/user/abc");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 200 and all issues with specified issue ID", async (done) => {
    const response = await request(app).get("/api/userIssues/issue/1");
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    expect(response.body.length).not.toBe(0);
    done();
  });

  it("Should return 404 when issue ID is not found", async (done) => {
    const expectedResult = {
      message: "Issue ID is not found",
    };
    const response = await request(app).get("/api/userIssues/issue/1000");
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 400 for bad parameter", async (done) => {
    const response = await request(app).get("/api/userIssues/issue/abc");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 200 and a userIssue", async (done) => {
    const response = await request(app).get("/api/userIssues/5/1");
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 404 when user ID and issue ID is not found", async (done) => {
    const expectedResult = {
      message: "User ID or Issue ID is not found",
    };
    const response = await request(app).get("/api/userIssues/1000/1000");
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 404 when user ID doesn't exist", async (done) => {
    const expectedResult = {
      message: "User ID or Issue ID is not found",
    };
    const response = await request(app).get("/api/userIssues/1000/1");
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 404 when issue ID doesn't exist", async (done) => {
    const expectedResult = {
      message: "User ID or Issue ID is not found",
    };
    const response = await request(app).get("/api/userIssues/5/1000");
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app).get("/api/userIssues/abc/abc");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app).get("/api/userIssues/5/abc");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app).get("/api/userIssues/abc/1");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app).get("/api/userIssues/5/abc2131");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app).get("/api/userIssues/abc12356/1");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  //This test will pass on the first go but not on subsequent calls
  // it("Should return 201 for successful post", async (done) => {
  //   const response = await request(app).post("/api/userIssues/").send({
  //     user_id: "23",
  //     issue_id: "30",
  //   });
  //   expect(response.status).toBe(201);
  //   expect(response.body).toEqual({});
  //   done();
  // });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app).post("/api/userIssues/").send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });
});