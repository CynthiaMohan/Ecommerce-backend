const express = require('express');
// const { sync } = require('./models/Product');
const routes = require('./routes');
// import sequelize connection
const sequelize = require('./config/connection');

// Set up express app
const app = express();
const PORT = process.env.PORT || 3001;
// Set up middleware to handle parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});

