const request = require("supertest");
const app = require("../app");

describe("Testing the userProjects endpoints", () => {
  it("tests the status code for the get all endpoint", async (done) => {
    const response = await request(app).get("/api/userProjects");
    expect(response.status).toBe(200);
    done();
  });

  it("tests for successful get by user id endpoint", async (done) => {
    const response = await request(app).get("/api/userProjects/user/5");
    expect(response.status).toBe(200);
    expect(response.body.length).not.toBe(0);
    done();
  });

  it("tests for a failed get by user id endpoint for a user that doesn't exist", async (done) => {
    const expectedResult = {
      message: "User ID is not found",
    };
    const response = await request(app).get("/api/userProjects/user/1000");
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("tests for a failed get by user id endpoint with bad parameter", async (done) => {
    const response = await request(app).get("/api/userProjects/user/abc");
    expect(response.status).toBe(400);
    done();
  });

  it("tests for successful get by project id endpoint", async (done) => {
    const response = await request(app).get("/api/userProjects/project/6");
    expect(response.status).toBe(200);
    expect(response.body.length).not.toBe(0);
    done();
  });

  it("tests for a failed get by project id endpoint for a project that doesn't exist", async (done) => {
    const expectedResult = {
      message: "Project ID is not found",
    };
    const response = await request(app).get("/api/userProjects/project/1000");
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("tests for a failed get by project id endpoint with bad parameter", async (done) => {
    const response = await request(app).get("/api/userProjects/project/abc");
    expect(response.status).toBe(400);
    done();
  });

  it("tests for successful get by project and user id endpoint", async (done) => {
    const response = await request(app).get("/api/userProjects/5/6");
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("tests for a failed get by project and user id endpoint for a user id that doesn't exist", async (done) => {
    const expectedResult = {
      message: "User ID or Project ID not found",
    };
    const response = await request(app).get("/api/userProjects/1000/6");
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("tests for a failed get by project and user id endpoint for a project id that doesn't exist", async (done) => {
    const expectedResult = {
      message: "User ID or Project ID not found",
    };
    const response = await request(app).get("/api/userProjects/5/1000");
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("tests for a failed get by project and user id endpoint with bad parameter", async (done) => {
    const response = await request(app).get("/api/userProjects/abc/abc");
    expect(response.status).toBe(400);
    done();
  });

  //This test will pass on the first go but not on subsequent calls
  // it("tests a successful post request", async (done) => {
  //   const response = await request(app).post("/api/userProjects/").send({
  //     user_id: "24",
  //     project_id: "6",
  //   });
  //   expect(response.status).toBe(201);
  //   done();
  // });

  it("tests a failed post request because of wrong number of parameters", async (done) => {
    const response = await request(app).post("/api/userProjects/").send({});
    expect(response.status).toBe(400);
    done();
  });

  it("tests a successful patch", async (done) => {
    const response = await request(app).patch("/api/userProjects/5/6").send({});
    expect(response.status).toBe(200);
    done();
  });

  it("tests a failed patch because user or project ID not found", async (done) => {
    const expectedResult = {
      message: "User ID or Project ID not found",
    };
    const response = await request(app)
      .patch("/api/userProjects/1000/1000")
      .send({});
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });
});
