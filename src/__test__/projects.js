const request = require("supertest");
const app = require("../app");
const token = require("../utils/token");

module.exports = describe("Testing the projects endpoints", () => {
  it("Should return 401 because of no token", async (done) => {
    const response = await request(app).get("/api/projects");
    expect(response.status).toBe(401);
    done();
  });

  it("Should return 200 and all projects", async (done) => {
    const response = await request(app)
      .get("/api/projects")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 200 and a project", async (done) => {
    const response = await request(app)
      .get("/api/projects/6")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 404 for project ID not found", async (done) => {
    const expectedResult = {
      message: "Project ID is not found",
    };
    const response = await request(app)
      .get("/api/projects/1000")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app)
      .get("/api/projects/abc")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app)
      .get("/api/projects/abc12461")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app)
      .get("/api/projects/*&@Y@@(*&(")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 201 for successful post", async (done) => {
    const response = await request(app)
      .post("/api/projects/")
      .set("Authorization", `bearer ${token}`)
      .send({
        project_name: "hello",
        description: "hello world",
      });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app)
      .post("/api/projects/")
      .set("Authorization", `bearer ${token}`)
      .send({
        description: "hello world",
      });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 200 for successful patch", async (done) => {
    const response = await request(app)
      .patch("/api/projects/6")
      .set("Authorization", `bearer ${token}`)
      .send({
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
    const response = await request(app)
      .patch("/api/projects/1000")
      .set("Authorization", `bearer ${token}`)
      .send({
        project_name: "hello3",
        description: "hello world3",
      });
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app)
      .patch("/api/projects/6")
      .set("Authorization", `bearer ${token}`)
      .send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });
});
