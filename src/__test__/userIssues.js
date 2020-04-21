const request = require("supertest");
const app = require("../app");

describe("Testing the userIssues endpoints", () => {
  it("tests the status code for the get all endpoint", async (done) => {
    const response = await request(app).get("/api/userIssues");
    expect(response.status).toBe(200);
    done();
  });

  it("tests for successful get by user id endpoint", async (done) => {
    const response = await request(app).get("/api/userIssues/user/5");
    expect(response.status).toBe(200);
    expect(response.body.length).not.toBe(0);
    done();
  });

  it("tests for a failed get by user id endpoint for a user that doesn't exist", async (done) => {
    const expectedResult = {
      message: "User ID is not found",
    };
    const response = await request(app).get("/api/userIssues/user/1000");
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("tests for a failed get by user id endpoint with bad parameter", async (done) => {
    const response = await request(app).get("/api/userIssues/user/abc");
    expect(response.status).toBe(400);
    done();
  });

  it("tests for successful get by issue id endpoint", async (done) => {
    const response = await request(app).get("/api/userIssues/issue/1");
    expect(response.status).toBe(200);
    expect(response.body.length).not.toBe(0);
    done();
  });

  it("tests for a failed get by issue id endpoint for an issue that doesn't exist", async (done) => {
    const expectedResult = {
      message: "Issue ID is not found",
    };
    const response = await request(app).get("/api/userIssues/issue/1000");
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("tests for a failed get by issue id endpoint with bad parameter", async (done) => {
    const response = await request(app).get("/api/userIssues/issue/abc");
    expect(response.status).toBe(400);
    done();
  });

  it("tests for successful get by issue and user id endpoint", async (done) => {
    const response = await request(app).get("/api/userIssues/5/1");
    expect(response.status).toBe(200);
    expect(response.body.length).not.toBe(0);
    done();
  });

  it("tests for a failed get by issue and user id endpoint for a user id that doesn't exist", async (done) => {
    const expectedResult = {
      message: "User ID or Issue ID not found",
    };
    const response = await request(app).get("/api/userIssues/1000/1");
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("tests for a failed get by issue and user id endpoint for an issue id that doesn't exist", async (done) => {
    const expectedResult = {
      message: "User ID or Issue ID not found",
    };
    const response = await request(app).get("/api/userIssues/5/1000");
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("tests for a failed get by issue and user id endpoint with bad parameter", async (done) => {
    const response = await request(app).get("/api/userIssues/abc/abc");
    expect(response.status).toBe(400);
    done();
  });

  //This test will pass on the first go but not on subsequent calls
  // it("tests a successful post request", async (done) => {
  //   const response = await request(app).post("/api/userIssues/").send({
  //     user_id: "23",
  //     issue_id: "30",
  //   });
  //   expect(response.status).toBe(201);
  //   done();
  // });

  it("tests a failed post request because of wrong number of parameters", async (done) => {
    const response = await request(app).post("/api/userIssues/").send({});
    expect(response.status).toBe(400);
    done();
  });
});
