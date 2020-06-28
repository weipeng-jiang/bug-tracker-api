const request = require("supertest");
const app = require("../app");
const token = require("../utils/token");

module.exports = describe("Testing the comments endpoints", () => {
  it("Should return 401 because of no token", async (done) => {
    const response = await request(app).get("/api/comments");
    expect(response.status).toBe(401);
    done();
  });

  it("Should return 200 and all comments", async (done) => {
    const response = await request(app)
      .get("/api/comments")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 200 and one comment", async (done) => {
    const response = await request(app)
      .get("/api/comments/186")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 404 when comment ID doesn't exist", async (done) => {
    const expectedResult = {
      message: "Comment ID is not found",
    };
    const response = await request(app)
      .get("/api/comments/1000")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 400 for bad parameters; characters", async (done) => {
    const response = await request(app)
      .get("/api/comments/abc")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters; characters and numbers", async (done) => {
    const response = await request(app)
      .get("/api/comments/abc213")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters; punctuation", async (done) => {
    const response = await request(app)
      .get("/api/comments/%#$##--aw123")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 200 and all comments with specified issue id number", async (done) => {
    const response = await request(app)
      .get("/api/comments/issue/39")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.length).not.toBe(0);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 404 when issue id doesn't exist in any comments", async (done) => {
    const expectedResult = {
      message: "Issue ID is not found",
    };
    const response = await request(app)
      .get("/api/comments/issue/2")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 400 for bad parameters; characters", async (done) => {
    const response = await request(app)
      .get("/api/comments/issue/abc")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters; characters and numbers", async (done) => {
    const response = await request(app)
      .get("/api/comments/issue/abc21345151")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters; punctuation", async (done) => {
    const response = await request(app)
      .get("/api/comments/issue/(*&$#(*&))")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 201 for successful post", async (done) => {
    const response = await request(app)
      .post("/api/comments/")
      .set("Authorization", `bearer ${token}`)
      .send({
        issue_id: "39",
        user_id: "5",
        description: "test issue",
      });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters; no issue ID", async (done) => {
    const response = await request(app)
      .post("/api/comments/")
      .set("Authorization", `bearer ${token}`)
      .send({
        user_id: "5",
        description: "test issue",
      });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 200 for successful patch", async (done) => {
    const response = await request(app)
      .patch("/api/comments/186")
      .set("Authorization", `bearer ${token}`)
      .send({
        description: "test patch",
      });
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 404 when comment ID is not found", async (done) => {
    const expectedResult = {
      message: "Comment ID is not found",
    };
    const response = await request(app)
      .patch("/api/comments/1000")
      .set("Authorization", `bearer ${token}`)
      .send({
        description: "test patch",
      });
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 400 for bad parameters; no description in body", async (done) => {
    const response = await request(app)
      .patch("/api/comments/186")
      .set("Authorization", `bearer ${token}`)
      .send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });
});
