const request = require("supertest");
const app = require("../app");

describe("Testing the projects endpoints", () => {
  it("Should return 200 and all projects", async (done) => {
    const response = await request(app).get("/api/projects");
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 200 and a project", async (done) => {
    const response = await request(app).get("/api/projects/6");
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 404 for project ID not found", async (done) => {
    const expectedResult = {
      message: "Project ID is not found",
    };
    const response = await request(app).get("/api/projects/1000");
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app).get("/api/projects/abc");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app).get("/api/projects/abc12461");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app).get("/api/projects/*&@Y@@(*&(");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 201 for successful post", async (done) => {
    const response = await request(app).post("/api/projects/").send({
      project_name: "hello",
      description: "hello world",
    });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app).post("/api/projects/").send({
      description: "hello world",
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 200 for successful patch", async (done) => {
    const response = await request(app).patch("/api/projects/6").send({
      project_name: "hello3",
      description: "hello world3",
    });
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 404 for project ID not found", async (done) => {
    const expectedResult = {
      message: "Project ID is not found",
    };
    const response = await request(app).patch("/api/projects/1000").send({
      project_name: "hello3",
      description: "hello world3",
    });
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app).patch("/api/projects/6").send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });
});
