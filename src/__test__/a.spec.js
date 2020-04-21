const request = require("supertest");
const app = require("../app");

describe("Testing the comments endpoints", () => {
  it("tests the status code for the get all endpoint", async (done) => {
    const response = await request(app).get("/api/comments");
    expect(response.status).toBe(200);
    done();
  });

  it("tests for successful get by comment id endpoint", async (done) => {
    const response = await request(app).get("/api/comments/14");
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("tests for a failed get by comment id endpoint for a comment that doesn't exist", async (done) => {
    const expectedResult = {
      message: "Comment ID is not found",
    };
    const response = await request(app).get("/api/comments/1000");
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("tests for a failed get by comment id endpoint with bad parameter", async (done) => {
    const response = await request(app).get("/api/comments/abc");
    expect(response.status).toBe(400);
    done();
  });

  it("tests for successful get by issue id endpoint", async (done) => {
    const response = await request(app).get("/api/comments/issue/1");
    expect(response.status).toBe(200);
    expect(response.body.length).not.toBe(0);
    done();
  });

  it("tests for a failed get by issue id endpoint for an issue id that no comments have", async (done) => {
    const response = await request(app).get("/api/comments/issue/2");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
    done();
  });

  it("tests for a failed get by comment id endpoint with bad parameter", async (done) => {
    const response = await request(app).get("/api/comments/issue/abc");
    expect(response.status).toBe(400);
    done();
  });

  it("tests a successful post request", async (done) => {
    const response = await request(app).post("/api/comments/").send({
      issue_id: "1",
      user_id: "5",
      description: "test issue",
    });
    expect(response.status).toBe(201);
    done();
  });

  it("tests a failed post request because of wrong number of parameters", async (done) => {
    const response = await request(app).post("/api/comments/").send({
      user_id: "5",
      description: "test issue",
    });
    expect(response.status).toBe(400);
    done();
  });

  it("tests a successful patch", async (done) => {
    const response = await request(app).patch("/api/comments/14").send({
      description: "test patch",
    });
    expect(response.status).toBe(200);
    done();
  });

  it("tests a failed patch because comment id not found", async (done) => {
    const response = await request(app).patch("/api/comments/1000").send({
      description: "test patch",
    });
    expect(response.status).toBe(404);
    done();
  });

  it("tests a failed patch because of bad parameters", async (done) => {
    const response = await request(app).patch("/api/comments/14").send({});
    expect(response.status).toBe(400);
    done();
  });
});

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

describe("Testing the priority endpoints", () => {
  it("tests the status code for the get all endpoint", async (done) => {
    const response = await request(app).get("/api/priority");
    expect(response.status).toBe(200);
    done();
  });

  it("tests for successful get by priority id endpoint", async (done) => {
    const response = await request(app).get("/api/priority/11");
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("tests for failed get by priority id endpoint for non existant priority id", async (done) => {
    const response = await request(app).get("/api/priority/1110");
    expect(response.status).toBe(404);
    done();
  });

  it("tests for failed get by priority id endpoint for bad parameter", async (done) => {
    const response = await request(app).get("/api/priority/abc");
    expect(response.status).toBe(400);
    done();
  });
});

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

describe("Testing the roles endpoints", () => {
  it("tests the status code for the get all endpoint", async (done) => {
    const response = await request(app).get("/api/roles");
    expect(response.status).toBe(200);
    done();
  });

  it("tests for successful get by roles id endpoint", async (done) => {
    const response = await request(app).get("/api/roles/1");
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("tests for failed get by roles id endpoint for non existant role id", async (done) => {
    const response = await request(app).get("/api/roles/1000");
    expect(response.status).toBe(404);
    done();
  });

  it("tests for failed get by roles id endpoint for bad parameter", async (done) => {
    const response = await request(app).get("/api/roles/abc");
    expect(response.status).toBe(400);
    done();
  });
});

describe("Testing the status endpoints", () => {
  it("tests the status code for the get all endpoint", async (done) => {
    const response = await request(app).get("/api/status");
    expect(response.status).toBe(200);
    done();
  });

  it("tests for successful get by status id endpoint", async (done) => {
    const response = await request(app).get("/api/status/0");
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("tests for failed get by status id endpoint for non existant status id", async (done) => {
    const response = await request(app).get("/api/status/111");
    expect(response.status).toBe(404);
    done();
  });

  it("tests for failed get by status id endpoint for bad parameter", async (done) => {
    const response = await request(app).get("/api/status/abc");
    expect(response.status).toBe(400);
    done();
  });
});

describe("Testing the userIssues endpoints", () => {
  it("tests the status code for the get all endpoint", async (done) => {
    const response = await request(app).get("/api/userIssues");
    expect(response.status).toBe(200);
    done();
  });

  it("tests for successful get by user id endpoint", async (done) => {
    const response = await request(app).get("/api/userIssues/user/5");
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("tests for a failed get by user id endpoint for a user that doesn't exist", async (done) => {
    const expectedResult = {
      message: "User ID is not found",
    };
    const response = await request(app).get("/api/userIssues/user/1000");
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("tests for a failed get by user id endpoint with bad parameter", async (done) => {
    const response = await request(app).get("/api/userIssues/user/abc");
    expect(response.status).toBe(400);
    done();
  });

  it("tests for successful get by issue id endpoint", async (done) => {
    const response = await request(app).get("/api/userIssues/issue/1");
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("tests for a failed get by issue id endpoint for an issue that doesn't exist", async (done) => {
    const expectedResult = {
      message: "Issue ID is not found",
    };
    const response = await request(app).get("/api/userIssues/issue/1000");
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("tests for a failed get by issue id endpoint with bad parameter", async (done) => {
    const response = await request(app).get("/api/userIssues/issue/abc");
    expect(response.status).toBe(400);
    done();
  });

  it("tests for successful get by issue and user id endpoint", async (done) => {
    const response = await request(app).get("/api/userIssues/5/1");
    expect(response.status).toBe(200);
    expect(response.body.length).not.toBe(0);
    done();
  });

  it("tests for a failed get by issue and user id endpoint for a user id that doesn't exist", async (done) => {
    const expectedResult = {
      message: "User ID or Issue ID not found",
    };
    const response = await request(app).get("/api/userIssues/1000/1");
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("tests for a failed get by issue and user id endpoint for an issue id that doesn't exist", async (done) => {
    const expectedResult = {
      message: "User ID or Issue ID not found",
    };
    const response = await request(app).get("/api/userIssues/5/1000");
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("tests for a failed get by issue and user id endpoint with bad parameter", async (done) => {
    const response = await request(app).get("/api/userIssues/abc/abc");
    expect(response.status).toBe(400);
    done();
  });

  //This test will pass on the first go but not on subsequent calls
  // it("tests a successful post request", async (done) => {
  //   const response = await request(app).post("/api/userIssues/").send({
  //     user_id: "23",
  //     issue_id: "30",
  //   });
  //   expect(response.status).toBe(201);
  //   done();
  // });

  it("tests a failed post request because of wrong number of parameters", async (done) => {
    const response = await request(app).post("/api/comments/").send({});
    expect(response.status).toBe(400);
    done();
  });
});

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
