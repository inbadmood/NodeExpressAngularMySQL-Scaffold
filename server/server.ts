import * as express from 'express';
import * as fs from 'fs';
import * as mysql from 'mysql';
import * as path from 'path';
import * as bodyParser from 'body-parser';

const app = express();
app.set('port', 5000);
app.use('/', express.static(path.join(__dirname, '..', 'client')));
app.use('/node_modules', express.static(path.join(__dirname, '..', 'node_modules')));
app.use(bodyParser.json());

// Set up database connection
var thishost = ''; // <hostname>;
var thisuser = ''; //<username>;
var thispwd = '' //<password>;
var thisdbase = '' //<database>';

var client = mysql.createConnection({
  host: thishost,
  user: thisuser,
  password: thispwd,
  database: thisdbase
});

// GET requests
app.get('/records', (_, res) => {

  const sql = 'SELECT * FROM beta_mailing_list';

  console.log("Sending query!");

  const query = client.query(sql, function(err, rows, fields) {
      if (!err) {
        res.send(rows);
      }
      else {
        console.log('Error while performing query: %s', err);
        res.send(err);
      }
  });
})

// PUT requests

app.put('/deleterecord', function(req, res) {

  if (!(req.body.email)) (_) => {
    console.log('Bad request! To delete an entry you must specify an email address!');
    res.send('Bad request! To delete an entry you must specify an email address!');
  }

  let email = encodeURI(req.body.email);

  const sql = 'DELETE FROM beta_mailing_list WHERE email="'+email+'"';

  const query = client.query(sql, function(err, rows, fields) {
      if (!err) {
        res.send("Deletion successful!");
      }
      else {
        console.log('Error while performing query: %s', err);
        res.send(err);
      }
  });
})

// POST requests

app.post('/post', function(req, res) {

  if (!(req.body.firstName || req.body.lastName || req.body.background || req.body.emailAddress)) (_) => {
    res.send("Error! You must specify all fields!");
  }

  const fname  = encodeURI(req.body.firstName);
  const lname = encodeURI(req.body.lastName);
  const background = encodeURI(req.body.background);
  const email = encodeURI(req.body.emailAddress);

  var sql = 'INSERT INTO beta_mailing_list (firstName, lastName, background, email, termsandconditions) VALUES ("'+fname+'", "'+lname+'", "'+background+'", "'+email+'", "accept")';

  const query = client.query(sql);

  query.on('error', function(err) {
    console.log(err);
    res.send(err);
  });

  query.on('result', function() {
    res.send("Form submitted!");
  });

});

const port = process.env.PORT || 5000;
app.listen(port);
console.log("Listening on port %s", port);
