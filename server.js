const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sequelize = require('./config/connection');
const { User, Post, Comment } = require('./models');

const app = express();
const PORT = process.env.PORT || 3001;

// Set up sessions with cookies and the Sequelize session store
const sess = {
  secret: process.env.SESSION_SECRET || 'default_secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Import and use routes
app.use(require('./controllers/'));

// Sync Sequelize models to the database and then start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
