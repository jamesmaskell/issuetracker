"use strict";

module.exports = function (app, service, repository) {
  app
    .route("/api/issues/:project")

    .get(function (req, res) {
      console.log("get");

      let filter = [
        {
          property: "project",
          value: req.params.project,
        },
      ];

      let keys = Object.keys(req.query);
      if (keys.length > 0) {
        keys.forEach((property) => filter.push({ property: property, value: req.query[property] }));
      }

      return res.json(service.getData(filter));
    })

    .post(function (req, res) {
      if (req.body.issue_title === undefined || req.body.issue_text === undefined || req.body.created_by === undefined) {
        return res.json({ error: "required field(s) missing" });
      }

      let postParams = {
        project: req.params.project,
        title: req.body.issue_title,
        text: req.body.issue_text,
        createdBy: req.body.created_by,
      };

      if (req.body.assigned_to) postParams.assignee = req.body.assigned_to;
      if (req.body.status_text) postParams.status = req.body.status_text;

      let response = service.createIssue(postParams);

      return res.json(response);
    })

    .put(function (req, res) {
      let project = req.params.project;
    })

    .delete(function (req, res) {
      let project = req.params.project;
    });
};
