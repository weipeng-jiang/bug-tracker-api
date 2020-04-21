const request = require("supertest");
const app = require("../app");

describe("Testing the issues endpoints", () => {
  it("tests the status code for the get all endpoint", async (done) => {
    const response = await request(app).get("/api/issues");
    expect(response.status).toBe(200);
    done();
  });

  it("tests for successful get by issue id endpoint", async (done) => {
    const response = await request(app).get("/api/issues/1");
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("tests for a failed get by issue id endpoint for an issue that doesn't exist", async (done) => {
    const expectedResult = {
      message: "Issue ID is not found",
    };
    const response = await request(app).get("/api/issues/1000");
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("tests for a failed get by issue id endpoint with bad parameter", async (done) => {
    const response = await request(app).get("/api/issues/abc");
    expect(response.status).toBe(400);
    done();
  });

  it("tests for successful get by project id endpoint", async (done) => {
    const response = await request(app).get("/api/issues/projects/5");
    expect(response.status).toBe(200);
    expect(response.body.length).not.toBe(0);
    done();
  });

  it("tests for a failed get by project id endpoint for project id that no issues have", async (done) => {
    const response = await request(app).get("/api/issues/projects/1000");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
    done();
  });

  it("tests for a failed get by comment id endpoint with bad parameter", async (done) => {
    const response = await request(app).get("/api/issues/projects/abc");
    expect(response.status).toBe(400);
    done();
  });

  it("tests a successful post request", async (done) => {
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
    done();
  });

  it("tests a failed post request because of wrong number of parameters", async (done) => {
    const response = await request(app).post("/api/issues/").send({
      project_id: "6",
      priority_id: "00",
      title: "dligfdhkdfgfhkdf",
      description: "data security breach",
      report_date: "2004-10-19T08:23:54.000Z",
    });
    expect(response.status).toBe(400);
    done();
  });

  it("tests a successful patch", async (done) => {
    const response = await request(app).patch("/api/issues/1").send({
      priority_id: "00",
      status_id: "1",
      title: "",
      description: "updatedagain",
    });
    expect(response.status).toBe(200);
    done();
  });

  it("tests a failed patch because project id not found", async (done) => {
    const response = await request(app).patch("/api/issues/1000").send({
      priority_id: "00",
      status_id: "1",
      title: "",
      description: "updatedagain",
    });
    expect(response.status).toBe(404);
    done();
  });

  it("tests a failed patch because of bad parameters", async (done) => {
    const response = await request(app).patch("/api/issues/1").send({});
    expect(response.status).toBe(400);
    done();
  });
});
