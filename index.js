/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.helloWorld = async (req, res) => {
  let message = req.query.message || req.body.message || 'Hello World!';
  res.status(200).send(message);

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: '34.100.164.237',
  user: 'akash',
  password: 'test',
  database: 'crf2022',
  port:3306,  
});

var applicationStatus = [];
var publicProfileUrl = [];
var badges = ["Preparing for Your Associate Cloud Engineer Journey",
"Google Cloud Fundamentals: Core Infrastructure",
"Essential Google Cloud Infrastructure: Foundation",
"Essential Google Cloud Infrastructure: Core Services",
"Elastic Google Cloud Infrastructure: Scaling and Automation",
"Getting Started with Google Kubernetes Engine",
"Logging, Monitoring and Observability in Google Cloud",
"Getting Started with Terraform for Google Cloud"];

  connection.query("SELECT * FROM CRF2022", async function (err, result, fields) {
    if (err) throw err;
    Object.keys(result).forEach(function(key) {
      var row = result[key];
      publicProfileUrl = row.Public_Profile_URL;
    });
    for(i = 0; i < publicProfileUrl.length; ++i){
    applicationStatus = await getApplicationStatus(publicProfileUrl);
    console.log(applicationStatus);
    var sql = `UPDATE CRF2022 SET Application_Status = ? WHERE Public_Profile_URL = ?`;
    connection.query(sql, [[applicationStatus],[publicProfileUrl]], function(err) {
    if (err) throw err;
      });
    }
  });
};

/*function badgesCountFunc(profileBadge, badges, badgeCount){
  for (var j = 0; j < profileBadge.length; ++j) {
    var profileBadgeChildren = profileBadge.get(j).children;
    var badgeName = profileBadgeChildren[2].children[0].data.toString().trim();
    if(badgeName == badges){
    badgeCount = badgeCount + 1;
    break;
    }
  }
  return badgeCount;
}*/

async function getApplicationStatus(respondentProfile) {

  const cheerio = require('cheerio')
  const axios = require('axios')

  const {data} = await axios.get(respondentProfile);
  const $ = cheerio.load(data);
  var profileUrl = $('p[class^="ql-body-1 l-mbl"]').length;
    if(profileUrl == 1){
        return "All Good";
    } else {
        return "Wrong Google Cloud Skills Boost Public Profile URL";
    }
}
