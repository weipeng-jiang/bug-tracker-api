const request = require("supertest");
const app = require("../app");

describe("Testing the comments API", () => {
  it("tests the status code for the get all endpoint", async done => {
    const response = await request(app).get("/api/comments");
    expect(response.status).toBe(200);
    done();
  });
});
