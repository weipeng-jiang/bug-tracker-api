const request = require("supertest");
const app = require("../app");

describe("Testing the comments endpoints", () => {
  it("Should return 200 and all comments", async (done) => {
    const response = await request(app).get("/api/comments");
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 200 and a comment", async (done) => {
    const response = await request(app).get("/api/comments/14");
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 404 when comment doesn't exist", async (done) => {
    const expectedResult = {
      message: "Comment ID is not found",
    };
    const response = await request(app).get("/api/comments/1000");
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app).get("/api/comments/abc");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app).get("/api/comments/abc213");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app).get("/api/comments/%#$##--aw123");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 200 and all comments with specified id number", async (done) => {
    const response = await request(app).get("/api/comments/issue/1");
    expect(response.status).toBe(200);
    expect(response.body.length).not.toBe(0);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 404 when issue id doesn't exist in any comments", async (done) => {
    const expectedResult = {
      message: "Issue ID is not found",
    };
    const response = await request(app).get("/api/comments/issue/2");
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app).get("/api/comments/issue/abc");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app).get("/api/comments/issue/abc21345151");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app).get("/api/comments/issue/(*&$#(*&))");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 201 for successful post", async (done) => {
    const response = await request(app).post("/api/comments/").send({
      issue_id: "1",
      user_id: "5",
      description: "test issue",
    });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app).post("/api/comments/").send({
      user_id: "5",
      description: "test issue",
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 200 for sucessful patch", async (done) => {
    const response = await request(app).patch("/api/comments/14").send({
      description: "test patch",
    });
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 404 for comment not found", async (done) => {
    const expectedResult = {
      message: "Comment ID is not found",
    };
    const response = await request(app).patch("/api/comments/1000").send({
      description: "test patch",
    });
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app).patch("/api/comments/14").send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });
});
