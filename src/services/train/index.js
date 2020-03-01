const { ConsoleConnector } = require('../../packages/console-connector/src');
const { Nlp } = require('../../packages/nlp/src');
const { LangPt } = require('../../packages/lang-pt/src');
const { fs } = require('../../packages/request/src');
const train = require('./train');

const nlp = new Nlp({ languages: ['pt'], threshold: 0.5 });
nlp.container.register('fs', fs);
nlp.use(LangPt);

const connector = new ConsoleConnector();
connector.onHear = async (parent, line) => {
  if (line.toLowerCase() === 'quit') {
    connector.destroy();
    process.exit();
  } else {
    const result = await nlp.process(line);
    connector.say(result.answer);
  }
};

(async () => {
  await train(nlp);
  connector.say('Say something!');
})();
