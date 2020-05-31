const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require("body-parser");

const { Nlp } = require("./src/packages/nlp/src");
const { LangPt } = require("./src/packages/lang-pt/src");
const { fs } = require("./src/packages/request/src");
const train = require("./src/services/train/train");

const nlp = new Nlp({ languages: ["pt"], threshold: 0.5 });
nlp.container.register("fs", fs);
nlp.use(LangPt);

app.set('port', (5000));

io.on('connect', async (socket) => {
  console.log('connected');

  socket.on('serverListenMessage', async (message) => {
    console.log(LangPt)
    const result = await nlp.process(message);

    // io.emit('serverSendResponse', { text: result });
  });
});

http.listen(app.get('port'), async () => {
  await train(nlp);
  console.log('Node app is running on port', app.get('port'));
});