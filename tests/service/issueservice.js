function IssueService() {
  this.createIssue = function (postParams) {
    let date = new Date();

    let object = {
      assigned_to: postParams.assignee ? postParams.assignee : "",
      status_text: postParams.status ? postParams.status : "",
      open: true,
      _id: mongoObjectId(),
      issue_title: postParams.title,
      issue_text: postParams.text,
      created_by: postParams.createdBy,
      created_on: date,
      updated_on: date,
      project: postParams.project,
    };

    let newObj = jsonTestData.push();

    delete object.project;

    return object;
  };

  this.getData = function (filter) {
    console.log("filter", filter);
    let filteredData = [...jsonTestData];

    filteredData.forEach((x) => console.log("project", x.project));

    filter.forEach((filterCrit) => {
      filteredData = filteredData.filter((issue) => {
        console.log(issue, filterCrit.property, issue[filterCrit.property], filterCrit.value);
        issue[filterCrit.property] == filterCrit.value;
      });
    });
    return filteredData;
  };

  const mongoObjectId = function () {
    //convert unix time in seconds to hex string
    var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
    //generate random hex string and concat to timestampe hex
    return (
      timestamp +
      "xxxxxxxxxxxxxxxx"
        .replace(/[x]/g, function () {
          // get random base16 (hex) character
          return ((Math.random() * 16) | 0).toString(16);
        })
        .toLowerCase()
    );
  };

  let jsonTestData = [
    /*{
        "assigned_to": "Chase Mandres",
        "status_text": "Closed",
        "open": true,
        "_id": mongoObjectId(),
        "issue_title": "Stringtough",
        "issue_text": "Inverse disintermediate service-desk",
        "created_by": "Elvera Selvey",
        "created_on": "2020-05-27T16:44:17Z",
        "update_on": "2021-01-11T15:43:39Z"
      },
      {
        "assigned_to": "Allyce Holton",
        "status_text": "Started",
        "open": false,
        "_id": mongoObjectId(),
        "issue_title": "Rank",
        "issue_text": "Right-sized multi-tasking adapter",
        "created_by": "Marsha Lage",
        "created_on": "2020-06-02T00:29:32Z",
        "update_on": "2021-01-14T12:00:40Z"
      },
      {
        "assigned_to": "Gerladina Varker",
        "status_text": "Complete",
        "open": false,
        "_id": mongoObjectId(),
        "issue_title": "Transcof",
        "issue_text": "User-centric dynamic utilisation",
        "created_by": "Johnathon Fewkes",
        "created_on": "2020-12-28T20:57:54Z",
        "update_on": "2021-01-10T22:00:36Z"
      },
      {
        "assigned_to": "Nicolea Ainscough",
        "status_text": "Complete",
        "open": false,
        "_id": mongoObjectId(),
        "issue_title": "Redhold",
        "issue_text": "Open-architected logistical toolset",
        "created_by": "Delaney Durrell",
        "created_on": "2020-03-22T07:22:55Z",
        "update_on": "2021-01-10T02:38:44Z"
      },
      {
        "assigned_to": "Briana Spere",
        "status_text": "Not started",
        "open": true,
        "_id": mongoObjectId(),
        "issue_title": "Opela",
        "issue_text": "Team-oriented 5th generation benchmark",
        "created_by": "Esther Isaacson",
        "created_on": "2020-08-28T17:25:09Z",
        "update_on": "2021-01-09T10:58:46Z"
      }*/
  ];
}

module.exports = IssueService;
