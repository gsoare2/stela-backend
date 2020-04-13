const fs = require("fs");

module.exports = async function train(manager) {
  if (fs.existsSync("./model.nlp")) {
    manager.load("./model.nlp");
    return;
  }

  /**
   * Greeting
   */
  manager.addDocument("pt", "Olá", "agent.greeting");
  manager.addDocument("pt", "Olaaaaaa", "agent.greeting")
  manager.addDocument("pt", "E aí", "agent.greeting");
  manager.addDocument("pt", "Oi", "agent.greeting");
  /**
   * How are you?
   */ 
  manager.addDocument("pt", "Tudo bem com você?", "agent.howareyou");
  manager.addDocument("pt", "Como você tem se sentido ultimamente?", "agent.howareyou");
  manager.addDocument("pt", "Como você anda?", "agent.howareyou");
  manager.addDocument("pt", "Como você tem andado?", "agent.howareyou");
  manager.addDocument("pt", "Como você está hoje?", "agent.howareyou");
  /**
   * Talk me about you
   */
  manager.addDocument("pt", "Me fale sobre você", "agent.acquaintance");
  await manager.train();

  /**
   * Greeting
   */
  manager.addAnswer("pt", "agent.greeting", "Oi");
  manager.addAnswer("pt", "agent.greeting", "Olá");
  manager.addAnswer("pt", "agent.greeting", "E aí");
  /**
   * How are you?
   */
  manager.addAnswer("pt", "agent.howareyou", "Eu estou ótima e você?");
  manager.addAnswer("pt", "agent.howareyou", "Estou me sentindo muito bem. Obrigada por perguntar. E você?");
  manager.addAnswer("pt", "agent.howareyou", "Eu estou ótima e você?");
  /**
   * Talk me about you
   */
  manager.addAnswer("pt", "agent.acquaintance", "Bom, eu sou Stela, sua assistente pessoal. Pode contar comigo sempre que precisar (=")
  manager.save();
}