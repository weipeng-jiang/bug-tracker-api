const request = require("supertest");
const app = require("../app");
const token = require("../utils/token");

module.exports = describe("Testing the issues endpoints", () => {
  it("Should return 401 because of no token", async (done) => {
    const response = await request(app).get("/api/issues");
    expect(response.status).toBe(401);
    done();
  });

  it("Should return 200 and all issues", async (done) => {
    const response = await request(app)
      .get("/api/issues")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 200 and one issue", async (done) => {
    const response = await request(app)
      .get("/api/issues/1")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 404 for issue ID not found", async (done) => {
    const expectedResult = {
      message: "Issue ID is not found",
    };
    const response = await request(app)
      .get("/api/issues/1000")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 400 for bad parameters; characters", async (done) => {
    const response = await request(app)
      .get("/api/issues/abc")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters; characters and numbers", async (done) => {
    const response = await request(app)
      .get("/api/issues/sadfag212313")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters; punctuation", async (done) => {
    const response = await request(app)
      .get("/api/issues/&*(Y(#(*")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 200 and all issues with specified project id", async (done) => {
    const response = await request(app)
      .get("/api/issues/projects/5")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.length).not.toBe(0);
    done();
  });

  it("Should return 404 when project id doesn't exist in any issues", async (done) => {
    const expectedResult = {
      message: "Project ID is not found",
    };
    const response = await request(app)
      .get("/api/issues/projects/1000")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 400 for bad parameters; characters", async (done) => {
    const response = await request(app)
      .get("/api/issues/projects/abc")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters; characters and numbers", async (done) => {
    const response = await request(app)
      .get("/api/issues/projects/abc21351")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters; punctuation", async (done) => {
    const response = await request(app)
      .get("/api/issues/projects/*&##*(#")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 201 for successful post", async (done) => {
    const response = await request(app)
      .post("/api/issues/")
      .set("Authorization", `bearer ${token}`)
      .send({
        project_id: "6",
        priority_id: "00",
        user_id: "5",
        status_id: "1",
        title: "dligfdhkdfgfhkdf",
        description: "data security breach",
        report_date: "2004-10-19T08:23:54.000Z",
      });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters; no status or user ID", async (done) => {
    const response = await request(app)
      .post("/api/issues/")
      .set("Authorization", `bearer ${token}`)
      .send({
        project_id: "6",
        priority_id: "00",
        title: "dligfdhkdfgfhkdf",
        description: "data security breach",
        report_date: "2004-10-19T08:23:54.000Z",
      });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 200 for successful patch", async (done) => {
    const response = await request(app)
      .patch("/api/issues/1")
      .set("Authorization", `bearer ${token}`)
      .send({
        priority_id: "00",
        status_id: "1",
        title: "",
        description: "updatedagain",
      });
    expect(response.status).toBe(200);
    expect(response.body).not.toBe({});
    done();
  });

  it("Should return 404 when issue ID doesn't exist", async (done) => {
    const expectedResult = {
      message: "Issue ID is not found",
    };
    const response = await request(app)
      .patch("/api/issues/1000")
      .set("Authorization", `bearer ${token}`)
      .send({
        priority_id: "00",
        status_id: "1",
        title: "",
        description: "updatedagain",
      });
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 400 for bad parameters; no parameters in body", async (done) => {
    const response = await request(app)
      .patch("/api/issues/1")
      .set("Authorization", `bearer ${token}`)
      .send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });
});
