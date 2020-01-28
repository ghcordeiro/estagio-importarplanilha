const { Client } = require('pg');
const connectionString = 'postgressql://postgres:1234@localhost:5432/BeitAbba';

const client = new Client({
  connectionString: connectionString,
})

const Banco = {
  async connect(){
    await client.connect();
  },
  async disconnect(){
    await client.end();
  },
  async query(text, params, callback) {
    try {
      const teste = await client.query(text);

      return teste
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = Banco;
