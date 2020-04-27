const request = require("supertest");
const app = require("../app");
const token = require("../utils/token");

module.exports = describe("Testing the userProjects endpoints", () => {
  it("Should return 401 because of no token", async (done) => {
    const response = await request(app).get("/api/userProjects");
    expect(response.status).toBe(401);
    done();
  });

  it("Should return 200 and all userProjects", async (done) => {
    const response = await request(app)
      .get("/api/userProjects")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 200 and users by specified user ID", async (done) => {
    const response = await request(app)
      .get("/api/userProjects/user/5")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    expect(response.body.length).not.toBe(0);
    done();
  });

  it("Should return 404 when user ID not found", async (done) => {
    const expectedResult = {
      message: "User ID is not found",
    };
    const response = await request(app)
      .get("/api/userProjects/user/1000")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 400 for bad parameter", async (done) => {
    const response = await request(app)
      .get("/api/userProjects/user/abc")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 200 and all projects with specified project ID", async (done) => {
    const response = await request(app)
      .get("/api/userProjects/project/6")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    expect(response.body.length).not.toBe(0);
    done();
  });

  it("Should return 404 when project ID is not found", async (done) => {
    const expectedResult = {
      message: "Project ID is not found",
    };
    const response = await request(app)
      .get("/api/userProjects/project/1000")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app)
      .get("/api/userProjects/project/abc")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 200 and one userProject", async (done) => {
    const response = await request(app)
      .get("/api/userProjects/5/6")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 404 when user and project id not found", async (done) => {
    const expectedResult = {
      message: "User ID or Project ID not found",
    };
    const response = await request(app)
      .get("/api/userProjects/1000/1000")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 404 when user ID is not found", async (done) => {
    const expectedResult = {
      message: "User ID or Project ID not found",
    };
    const response = await request(app)
      .get("/api/userProjects/1000/6")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 404 when project ID is not found", async (done) => {
    const expectedResult = {
      message: "User ID or Project ID not found",
    };
    const response = await request(app)
      .get("/api/userProjects/5/1000")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 400 for bad parameter1", async (done) => {
    const response = await request(app)
      .get("/api/userProjects/abc/abc")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameter2", async (done) => {
    const response = await request(app)
      .get("/api/userProjects/abc1213/abc41223")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameter3", async (done) => {
    const response = await request(app)
      .get("/api/userProjects/5/abc41223")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameter4", async (done) => {
    const response = await request(app)
      .get("/api/userProjects/abc1213/6")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  //This test will pass on the first go but not on subsequent calls
  // it("Should return 201 for successful post", async (done) => {
  //   const response = await request(app).post("/api/userProjects/")
  // .set("Authorization", `bearer ${token}`).send({
  //     user_id: "24",
  //     project_id: "6",
  //   });
  //   expect(response.status).toBe(201);
  //   expect(response.body).toEqual({});
  //   done();
  // });

  it("Should return 400 for bad parameters5", async (done) => {
    const response = await request(app)
      .post("/api/userProjects/")
      .set("Authorization", `bearer ${token}`)
      .send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 200 for successful patch", async (done) => {
    const response = await request(app)
      .patch("/api/userProjects/5/6")
      .set("Authorization", `bearer ${token}`)
      .send({});
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 404 when user and project id not found", async (done) => {
    const expectedResult = {
      message: "User ID or Project ID not found",
    };
    const response = await request(app)
      .patch("/api/userProjects/1000/1000")
      .set("Authorization", `bearer ${token}`)
      .send({});
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 404 when user ID is not found", async (done) => {
    const expectedResult = {
      message: "User ID or Project ID not found",
    };
    const response = await request(app)
      .patch("/api/userProjects/5/1000")
      .set("Authorization", `bearer ${token}`)
      .send({});
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 404 when project id is not found", async (done) => {
    const expectedResult = {
      message: "User ID or Project ID not found",
    };
    const response = await request(app)
      .patch("/api/userProjects/1000/6")
      .set("Authorization", `bearer ${token}`)
      .send({});
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 400 for bad parameter6", async (done) => {
    const response = await request(app)
      .patch("/api/userProjects/abc/abc")
      .set("Authorization", `bearer ${token}`)
      .send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameter7", async (done) => {
    const response = await request(app)
      .patch("/api/userProjects/abc/abc1234")
      .set("Authorization", `bearer ${token}`)
      .send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameter8", async (done) => {
    const response = await request(app)
      .patch("/api/userProjects/abc312445/abc1234")
      .set("Authorization", `bearer ${token}`)
      .send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });
});
