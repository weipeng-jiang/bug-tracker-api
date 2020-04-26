const request = require("supertest");
const app = require("../app");
const token = require("../utils/token");

describe("Testing the comments endpoints", () => {
  it("Should return 401 because of no token", async (done) => {
    const response = await request(app).get("/api/comments");
    expect(response.status).toBe(401);
    done();
  });

  it("Should return 200 and all comments", async (done) => {
    const response = await request(app)
      .get("/api/comments")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 200 and a comment", async (done) => {
    const response = await request(app)
      .get("/api/comments/14")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 404 when comment doesn't exist", async (done) => {
    const expectedResult = {
      message: "Comment ID is not found",
    };
    const response = await request(app)
      .get("/api/comments/1000")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app)
      .get("/api/comments/abc")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app)
      .get("/api/comments/abc213")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app)
      .get("/api/comments/%#$##--aw123")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 200 and all comments with specified id number", async (done) => {
    const response = await request(app)
      .get("/api/comments/issue/1")
      .set("Authorization", "bearer " + token);
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
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app)
      .get("/api/comments/issue/abc")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app)
      .get("/api/comments/issue/abc21345151")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app)
      .get("/api/comments/issue/(*&$#(*&))")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 201 for successful post", async (done) => {
    const response = await request(app)
      .post("/api/comments/")
      .set("Authorization", "bearer " + token)
      .send({
        issue_id: "1",
        user_id: "5",
        description: "test issue",
      });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app)
      .post("/api/comments/")
      .set("Authorization", "bearer " + token)
      .send({
        user_id: "5",
        description: "test issue",
      });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 200 for sucessful patch", async (done) => {
    const response = await request(app)
      .patch("/api/comments/14")
      .set("Authorization", "bearer " + token)
      .send({
        description: "test patch",
      });
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 404 for comment not found", async (done) => {
    const expectedResult = {
      message: "Comment ID is not found",
    };
    const response = await request(app)
      .patch("/api/comments/1000")
      .set("Authorization", "bearer " + token)
      .send({
        description: "test patch",
      });
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app)
      .patch("/api/comments/14")
      .set("Authorization", "bearer " + token)
      .send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });
});

describe("Testing the issues endpoints", () => {
  it("Should return 401 because of no token", async (done) => {
    const response = await request(app).get("/api/issues");
    expect(response.status).toBe(401);
    done();
  });

  it("Should return 200 and all issues", async (done) => {
    const response = await request(app)
      .get("/api/issues")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 200 and an issue", async (done) => {
    const response = await request(app)
      .get("/api/issues/1")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 404 for issue not found", async (done) => {
    const expectedResult = {
      message: "Issue ID is not found",
    };
    const response = await request(app)
      .get("/api/issues/1000")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app)
      .get("/api/issues/abc")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app)
      .get("/api/issues/sadfag212313")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app)
      .get("/api/issues/&*(Y(#(*")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 200 and all issues with specified project id", async (done) => {
    const response = await request(app)
      .get("/api/issues/projects/5")
      .set("Authorization", "bearer " + token);
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
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app)
      .get("/api/issues/projects/abc")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app)
      .get("/api/issues/projects/abc21351")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app)
      .get("/api/issues/projects/*&##*(#")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 201 for successful post", async (done) => {
    const response = await request(app)
      .post("/api/issues/")
      .set("Authorization", "bearer " + token)
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

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app)
      .post("/api/issues/")
      .set("Authorization", "bearer " + token)
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
      .set("Authorization", "bearer " + token)
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

  it("Should return 404 when issue doesn't exist", async (done) => {
    const expectedResult = {
      message: "Issue ID is not found",
    };
    const response = await request(app)
      .patch("/api/issues/1000")
      .set("Authorization", "bearer " + token)
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

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app)
      .patch("/api/issues/1")
      .set("Authorization", "bearer " + token)
      .send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });
});

describe("Testing the priority endpoints", () => {
  it("Should return 401 because of no token", async (done) => {
    const response = await request(app).get("/api/priority");
    expect(response.status).toBe(401);
    done();
  });

  it("Should return 200 and all priorities", async (done) => {
    const response = await request(app)
      .get("/api/priority")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 200 and a priority", async (done) => {
    const response = await request(app)
      .get("/api/priority/11")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 404 when priority with specified id doesn't exist", async (done) => {
    const response = await request(app)
      .get("/api/priority/1110")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app)
      .get("/api/priority/abc")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app)
      .get("/api/priority/abc21151")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app)
      .get("/api/priority/*(&(*&$")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });
});

describe("Testing the projects endpoints", () => {
  it("Should return 401 because of no token", async (done) => {
    const response = await request(app).get("/api/projects");
    expect(response.status).toBe(401);
    done();
  });

  it("Should return 200 and all projects", async (done) => {
    const response = await request(app)
      .get("/api/projects")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 200 and a project", async (done) => {
    const response = await request(app)
      .get("/api/projects/6")
      .set("Authorization", "bearer " + token);
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
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app)
      .get("/api/projects/abc")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app)
      .get("/api/projects/abc12461")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app)
      .get("/api/projects/*&@Y@@(*&(")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 201 for successful post", async (done) => {
    const response = await request(app)
      .post("/api/projects/")
      .set("Authorization", "bearer " + token)
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
      .set("Authorization", "bearer " + token)
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
      .set("Authorization", "bearer " + token)
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
      .set("Authorization", "bearer " + token)
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
      .set("Authorization", "bearer " + token)
      .send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });
});

describe("Testing the roles endpoints", () => {
  it("Should return 401 because of no token", async (done) => {
    const response = await request(app).get("/api/roles");
    expect(response.status).toBe(401);
    done();
  });

  it("Should return 200 and all roles", async (done) => {
    const response = await request(app)
      .get("/api/roles")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 200 and a role", async (done) => {
    const response = await request(app)
      .get("/api/roles/1")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 404 when role doesn't exist", async (done) => {
    const expectedResult = {
      message: "Role ID is not found",
    };
    const response = await request(app)
      .get("/api/roles/1000")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app)
      .get("/api/roles/abc")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app)
      .get("/api/roles/iawub31243fdd1")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app)
      .get("/api/roles/(&*Y(#HJFF#2132))")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });
});

describe("Testing the status endpoints", () => {
  it("Should return 401 because of no token", async (done) => {
    const response = await request(app).get("/api/status");
    expect(response.status).toBe(401);
    done();
  });

  it("Should return 200 and all statuses", async (done) => {
    const response = await request(app)
      .get("/api/status")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 200 and a status", async (done) => {
    const response = await request(app)
      .get("/api/status/0")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 404 when status doesn't exist", async (done) => {
    const expectedResult = {
      message: "Status ID is not found",
    };
    const response = await request(app)
      .get("/api/status/111")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 400 for bad parameter", async (done) => {
    const response = await request(app)
      .get("/api/status/abc")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameter", async (done) => {
    const response = await request(app)
      .get("/api/status/abc123dqfwe21")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameter", async (done) => {
    const response = await request(app)
      .get("/api/status/d32*&GGD#93gd9")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });
});

describe("Testing the userIssues endpoints", () => {
  it("Should return 401 because of no token", async (done) => {
    const response = await request(app).get("/api/userIssues");
    expect(response.status).toBe(401);
    done();
  });

  it("Should return 200 and all userIssues", async (done) => {
    const response = await request(app)
      .get("/api/userIssues")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 200 and all users with specified user ID", async (done) => {
    const response = await request(app)
      .get("/api/userIssues/user/5")
      .set("Authorization", "bearer " + token);
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
      .get("/api/userIssues/user/1000")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 400 for bad parameter", async (done) => {
    const response = await request(app)
      .get("/api/userIssues/user/abc")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 200 and all issues with specified issue ID", async (done) => {
    const response = await request(app)
      .get("/api/userIssues/issue/1")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    expect(response.body.length).not.toBe(0);
    done();
  });

  it("Should return 404 when issue ID is not found", async (done) => {
    const expectedResult = {
      message: "Issue ID is not found",
    };
    const response = await request(app)
      .get("/api/userIssues/issue/1000")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 400 for bad parameter", async (done) => {
    const response = await request(app)
      .get("/api/userIssues/issue/abc")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 200 and a userIssue", async (done) => {
    const response = await request(app)
      .get("/api/userIssues/5/1")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 404 when user ID and issue ID is not found", async (done) => {
    const expectedResult = {
      message: "User ID or Issue ID is not found",
    };
    const response = await request(app)
      .get("/api/userIssues/1000/1000")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 404 when user ID doesn't exist", async (done) => {
    const expectedResult = {
      message: "User ID or Issue ID is not found",
    };
    const response = await request(app)
      .get("/api/userIssues/1000/1")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 404 when issue ID doesn't exist", async (done) => {
    const expectedResult = {
      message: "User ID or Issue ID is not found",
    };
    const response = await request(app)
      .get("/api/userIssues/5/1000")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app)
      .get("/api/userIssues/abc/abc")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app)
      .get("/api/userIssues/5/abc")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app)
      .get("/api/userIssues/abc/1")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app)
      .get("/api/userIssues/5/abc2131")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app)
      .get("/api/userIssues/abc12356/1")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  //This test will pass on the first go but not on subsequent calls
  // it("Should return 201 for successful post", async (done) => {
  //   const response = await request(app).post("/api/userIssues/")
  // .set("Authorization", "bearer " + token).send({
  //     user_id: "23",
  //     issue_id: "30",
  //   });
  //   expect(response.status).toBe(201);
  //   expect(response.body).toEqual({});
  //   done();
  // });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app)
      .post("/api/userIssues/")
      .set("Authorization", "bearer " + token)
      .send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });
});

describe("Testing the userProjects endpoints", () => {
  it("Should return 401 because of no token", async (done) => {
    const response = await request(app).get("/api/userProjects");
    expect(response.status).toBe(401);
    done();
  });

  it("Should return 200 and all userProjects", async (done) => {
    const response = await request(app)
      .get("/api/userProjects")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(200);
    expect(response.body).not.toBe(null);
    done();
  });

  it("Should return 200 and users by specified user ID", async (done) => {
    const response = await request(app)
      .get("/api/userProjects/user/5")
      .set("Authorization", "bearer " + token);
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
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 400 for bad parameter", async (done) => {
    const response = await request(app)
      .get("/api/userProjects/user/abc")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 200 and all projects with specified project ID", async (done) => {
    const response = await request(app)
      .get("/api/userProjects/project/6")
      .set("Authorization", "bearer " + token);
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
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 400 for bad parameters", async (done) => {
    const response = await request(app)
      .get("/api/userProjects/project/abc")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 200 and a userProject", async (done) => {
    const response = await request(app)
      .get("/api/userProjects/5/6")
      .set("Authorization", "bearer " + token);
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
      .set("Authorization", "bearer " + token);
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
      .set("Authorization", "bearer " + token);
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
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 400 for bad parameter1", async (done) => {
    const response = await request(app)
      .get("/api/userProjects/abc/abc")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameter2", async (done) => {
    const response = await request(app)
      .get("/api/userProjects/abc1213/abc41223")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameter3", async (done) => {
    const response = await request(app)
      .get("/api/userProjects/5/abc41223")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameter4", async (done) => {
    const response = await request(app)
      .get("/api/userProjects/abc1213/6")
      .set("Authorization", "bearer " + token);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  //This test will pass on the first go but not on subsequent calls
  // it("Should return 201 for successful post", async (done) => {
  //   const response = await request(app).post("/api/userProjects/")
  // .set("Authorization", "bearer " + token).send({
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
      .set("Authorization", "bearer " + token)
      .send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 200 for successful patch", async (done) => {
    const response = await request(app)
      .patch("/api/userProjects/5/6")
      .set("Authorization", "bearer " + token)
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
      .set("Authorization", "bearer " + token)
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
      .set("Authorization", "bearer " + token)
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
      .set("Authorization", "bearer " + token)
      .send({});
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expectedResult);
    done();
  });

  it("Should return 400 for bad parameter6", async (done) => {
    const response = await request(app)
      .patch("/api/userProjects/abc/abc")
      .set("Authorization", "bearer " + token)
      .send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameter7", async (done) => {
    const response = await request(app)
      .patch("/api/userProjects/abc/abc1234")
      .set("Authorization", "bearer " + token)
      .send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });

  it("Should return 400 for bad parameter8", async (done) => {
    const response = await request(app)
      .patch("/api/userProjects/abc312445/abc1234")
      .set("Authorization", "bearer " + token)
      .send({});
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
    done();
  });
});

describe("Testing the users endpoints", () => {});
