const request = require("supertest");
const app = require("../app");

describe("Testing the projects endpoints", () => {
  it("tests the status code for the get all endpoint", async (done) => {
    const response = await request(app).get("/api/projects");
    expect(response.status).toBe(200);
    done();
  });

  it("tests for successful get by project id endpoint", async (done) => {
    const response = await request(app).get("/api/projects/6");
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("tests for a failed get by project id endpoint for a project that doesn't exist", async (done) => {
    const expectedResult = {
      message: "Project ID is not found",
    };
    const response = await request(app).get("/api/projects/1000");
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("tests for a failed get by project id endpoint with bad parameter", async (done) => {
    const response = await request(app).get("/api/projects/abc");
    expect(response.status).toBe(400);
    done();
  });

  it("tests a successful post request", async (done) => {
    const response = await request(app).post("/api/projects/").send({
      project_name: "hello",
      description: "hello world",
    });
    expect(response.status).toBe(201);
    done();
  });

  it("tests a failed post request because of wrong number of parameters", async (done) => {
    const response = await request(app).post("/api/projects/").send({
      description: "hello world",
    });
    expect(response.status).toBe(400);
    done();
  });

  it("tests a successful patch", async (done) => {
    const response = await request(app).patch("/api/projects/6").send({
      project_name: "hello3",
      description: "hello world3",
    });
    expect(response.status).toBe(200);
    done();
  });

  it("tests a failed patch because project id not found", async (done) => {
    const response = await request(app).patch("/api/projects/1000").send({
      project_name: "hello3",
      description: "hello world3",
    });
    expect(response.status).toBe(404);
    done();
  });

  it("tests a failed patch because of bad parameters", async (done) => {
    const response = await request(app).patch("/api/projects/6").send({});
    expect(response.status).toBe(400);
    done();
  });
});
