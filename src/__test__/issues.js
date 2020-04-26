const request = require("supertest");
const app = require("../app");

describe("Testing the issues endpoints", () => {
  it("Should return 200 and all issues", async (done) => {
    const response = await request(app).get("/api/issues");
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 200 and an issue", async (done) => {
    const response = await request(app).get("/api/issues/1");
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 404 for issue not found", async (done) => {
    const expectedResult = {
      message: "Issue ID is not found",
    };
    const response = await request(app).get("/api/issues/1000");
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app).get("/api/issues/abc");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app).get("/api/issues/sadfag212313");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app).get("/api/issues/&*(Y(#(*");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 200 and all issues with specified project id", async (done) => {
    const response = await request(app).get("/api/issues/projects/5");
    expect(response.status).toBe(200);
    expect(response.body.length).not.toBe(0);
    done();
  });

  it("Should return 404 when project id doesn't exist in any issues", async (done) => {
    const expectedResult = {
      message: "Project ID is not found",
    };
    const response = await request(app).get("/api/issues/projects/1000");
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app).get("/api/issues/projects/abc");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app).get("/api/issues/projects/abc21351");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app).get("/api/issues/projects/*&##*(#");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 201 for successful post", async (done) => {
    const response = await request(app).post("/api/issues/").send({
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

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app).post("/api/issues/").send({
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
    const response = await request(app).patch("/api/issues/1").send({
      priority_id: "00",
      status_id: "1",
      title: "",
      description: "updatedagain",
    });
    expect(response.status).toBe(200);
    expect(response.body).not.toBe({});
    done();
  });

  it("Should return 404 when issue doesn't exist", async (done) => {
    const expectedResult = {
      message: "Issue ID is not found",
    };
    const response = await request(app).patch("/api/issues/1000").send({
      priority_id: "00",
      status_id: "1",
      title: "",
      description: "updatedagain",
    });
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app).patch("/api/issues/1").send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });
});
