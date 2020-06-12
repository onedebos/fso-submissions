const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
const config = require('./utils/config');
app.use(cors());

// app.listen(config.PORT, () => {
//   console.log(`server started on port ${config.PORT}`);
// });

module.exports = app;
