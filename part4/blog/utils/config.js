// require('dotenv/config');

let DB_LINK = process.env.DB_LINK;
const PORT = process.env.PORT || 3002;

if (process.env.NODE_ENV === 'test') {
  DB_LINK = process.env.TEST_DB_LINK;
}

module.exports = {
  DB_LINK,
  PORT,
};
