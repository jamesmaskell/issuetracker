const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  test("Create an issue with every field", function (done) {
    chai
      .request(server)
      .post("/api/issues/functionaltestproject")
      .type("form")
      .send({
        issue_title: "Fix entity service response",
        issue_text: "Lorum ipsum blah blah blah",
        created_by: "James Maskell",
        assigned_to: "Joe Bloggs",
        status_text: "Not started",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.issue_title, "Fix entity service response");
        assert.equal(res.body.issue_text, "Lorum ipsum blah blah blah");
        assert.equal(res.body.created_by, "James Maskell");
        assert.equal(res.body.assigned_to, "Joe Bloggs");
        assert.equal(res.body.status_text, "Not started");
        assert.approximately(new Date(res.body.created_on).getTime(), new Date().getTime(), 2000);
        assert.approximately(new Date(res.body.updated_on).getTime(), new Date().getTime(), 2000);
        assert.isTrue(res.body.open);
        assert.isTrue(/^[a-f0-9]{24}$/g.test(res.body._id));
        done();
      });
  });
  test("Create an issue with only required fields", function (done) {
    chai
      .request(server)
      .post("/api/issues/functionaltestproject")
      .type("form")
      .send({
        issue_title: "Fix entity service response",
        issue_text: "Lorum ipsum blah blah blah",
        created_by: "James Maskell",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.issue_title, "Fix entity service response");
        assert.equal(res.body.issue_text, "Lorum ipsum blah blah blah");
        assert.equal(res.body.created_by, "James Maskell");
        assert.equal(res.body.assigned_to, "");
        assert.equal(res.body.status_text, "");
        assert.approximately(new Date(res.body.created_on).getTime(), new Date().getTime(), 2000);
        assert.approximately(new Date(res.body.updated_on).getTime(), new Date().getTime(), 2000);
        assert.isTrue(res.body.open);
        assert.isTrue(/^[a-f0-9]{24}$/g.test(res.body._id));
        done();
      });
  });
  test("Create an issue with missing required fields", function (done) {
    chai
      .request(server)
      .post("/api/issues/functionaltestproject")
      .type("form")
      .send({})
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, "required field(s) missing");
        done();
      });
  });

  /*test("View issues on a project", function(done) {
    chai.request(server)
    .get("/api/issues/functionaltestproject")
    .query({})
    .end(function (err,res) {
      assert.equal(res.status, 200);
      assert.equal(res.body.length, 2);
      done();
    })
  })*/

  test("View issues on a project with one filter", function (done) {
    chai
      .request(server)
      .get("/api/issues/functionaltestproject")
      .query({ open: true })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        res.body.forEach((issue) => {
          assert.equal(issue.open, true);
        });
        done();
      });
  });

  test("View issues on a project with two filters", function (done) {
    chai
      .request(server)
      .get("/api/issues/functionaltestproject")
      .query({
        open: true,
        created_by: "Esther Isaacson",
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        res.body.forEach((issue) => {
          assert.equal(issue.open, true);
          assert.equal(issue.created_by, "Esther Isaacson");
        });
        done();
      });
  });

  test("");
});
