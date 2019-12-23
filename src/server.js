const express = require("express");
const app = express();
app.get("/clients", function (request, response) {
  response.send("<h2>Привет Express!</h2>");
});
app.post("/clients", function (request, response) {
  response.send("<h2>Привет Express!</h2>");
});
// начинаем прослушивать подключения на 3000 порту
app.listen(3002);
