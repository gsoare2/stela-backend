const express = require("express");
const bodyParser = require("body-parser")

const app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

const { Nlp } = require("./src/packages/nlp/src");
const { LangPt } = require("./src/packages/lang-pt/src");
const { fs } = require("./src/packages/request/src");
const train = require("./src/services/train/train");

const nlp = new Nlp({ languages: ["pt"], threshold: 0.5 });
nlp.container.register("fs", fs);
nlp.use(LangPt);
app.use(bodyParser.json());

/**
 * REST
 */
app.get("/", async (request, response) => {
  response.send("Aaaaaaaa");
});

app.post("/talk", async (request, response) => {
  const message = request.body.message;
  const result = await nlp.process(message);
  response.send(result.answer);
});

app.listen(3000, async () => {
  await train(nlp);
  console.log("Express on port 3000.")
});