
const entidades = require('../controllers/local');

function parseXLSX(path, line, info) {
  let vetLine = [];

  
      if (info === 'local') {
        vetLine = entidades.local(rows[line]);
        console.log(vetLine)
      }
    })
    .catch(e => {
      console.log(e);
    });

  return vetLine
}

module.exports = parseXLSX;