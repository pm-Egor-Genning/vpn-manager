// const connectorNodeV1 = require('@opuscapita/react-filemanager-connector-node-v1');
const express = require("express");
const app = express();
const path = require("path");
const os = require("os");
const fsRoot = os.platform === 'win32' ? process.cwd().split(path.sep)[0] : "/";
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('');

db.serialize(function () {
  db.run("CREATE TABLE vpn (paths TEXT)");

  const stmt = db.prepare("INSERT INTO vpn VALUES (?)");
  stmt.run('/home/genning_ep/Загрузки/forticlientsslvpn/64bit/forticlientsslvpn_cli');
  stmt.run('/home/genning_ep/Загрузки/forticlientsslvpn/64bit/forticlientsslvpn_cli_1');
  stmt.finalize();

  db.each("SELECT paths FROM vpn", function (err, row) {
    console.log(row.info);
  });
});

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cors());

const config = {
  fsRoot,
  rootName: '',
  port: process.env.PORT || '3020',
  host: process.env.HOST || 'localhost'
};

const filemanager = require('@opuscapita/filemanager-server');
filemanager.server.run(config);

app.get("/clients", function (request, response) {
  console.log(request.body);
  db.all("SELECT * FROM vpn", function (err, row) {
    response.json(row);
  });
});

app.post("/client", function (request, response) {
  console.log('body', request.body);
  // console.log('connectorNodeV1', connectorNodeV1);
  /*try {
    connectorNodeV1.default.api.getResourceById(
      connectorNodeV1.default.apiOptions,
      request.body.resourceId
    ).then(res => {
      console.log('res', res)
      const path = res.ancestors
        .map(({name}) => name)
        .join('/')
        .concat(`/${res.name}`);
      console.log('path', path);
    }).catch(e => {
      console.error(e);
    });
  } catch (e) {
    console.error(e);
  }*/

  db.run("insert into vpn VALUES (?)", request.body.path, function (err, row) {
    if (err) {
      console.error(err);
      response.status(500);
    } else {
      response.status(202);
      response.json(row);
    }
    response.end();
  });
  response.json({success: true});
});

app.listen(3002);
