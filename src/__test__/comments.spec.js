const request = require("supertest");
const app = require("../index");
const http = require("http");

describe("Testing the comments API", () => {
  let server;

  beforeAll(done => {
    server = http.createServer((req, res) => {
      res.write("ok");
      res.end();
    });
    server.listen(done);
  });

  afterAll(done => {
    server.close(done);
  });

  it("tests the status code for the get all endpoint", async done => {
    const response = await request(app).get("/api/comments");
    expect(response.status).toBe(200);
    done();
  });
});
