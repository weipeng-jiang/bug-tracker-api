const request = require("supertest");
const app = require("../app");

describe("Testing the comments endpoints", () => {
  it("tests the status code for the get all endpoint", async (done) => {
    const response = await request(app).get("/api/comments");
    expect(response.status).toBe(200);
    done();
  });

  it("tests for successful get by comment id endpoint", async (done) => {
    const response = await request(app).get("/api/comments/14");
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("tests for a failed get by comment id endpoint for a comment that doesn't exist", async (done) => {
    const expectedResult = {
      message: "Comment ID is not found",
    };
    const response = await request(app).get("/api/comments/1000");
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("tests for a failed get by comment id endpoint with bad parameter", async (done) => {
    const response = await request(app).get("/api/comments/abc");
    expect(response.status).toBe(400);
    done();
  });

  it("tests for successful get by issue id endpoint", async (done) => {
    const response = await request(app).get("/api/comments/issue/1");
    expect(response.status).toBe(200);
    expect(response.body.length).not.toBe(0);
    done();
  });

  it("tests for a failed get by issue id endpoint for an issue id that no comments have", async (done) => {
    const response = await request(app).get("/api/comments/issue/2");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
    done();
  });

  it("tests for a failed get by comment id endpoint with bad parameter", async (done) => {
    const response = await request(app).get("/api/comments/issue/abc");
    expect(response.status).toBe(400);
    done();
  });

  it("tests a successful post request", async (done) => {
    const response = await request(app).post("/api/comments/").send({
      issue_id: "1",
      user_id: "5",
      description: "test issue",
    });
    expect(response.status).toBe(201);
    done();
  });

  it("tests a failed post request because of wrong number of parameters", async (done) => {
    const response = await request(app).post("/api/comments/").send({
      user_id: "5",
      description: "test issue",
    });
    expect(response.status).toBe(400);
    done();
  });

  it("tests a successful patch", async (done) => {
    const response = await request(app).patch("/api/comments/14").send({
      description: "test patch",
    });
    expect(response.status).toBe(200);
    done();
  });

  it("tests a failed patch because comment id not found", async (done) => {
    const response = await request(app).patch("/api/comments/1000").send({
      description: "test patch",
    });
    expect(response.status).toBe(404);
    done();
  });

  it("tests a failed patch because of bad parameters", async (done) => {
    const response = await request(app).patch("/api/comments/14").send({});
    expect(response.status).toBe(400);
    done();
  });
});
