'use strict';

const express = require(`express`);

const articlesRoutes = require(`./routes/articles`);
const myRoutes = require(`./routes/my`);
const mainRoutes = require(`./routes/main`);
const categoriesRoutes = require(`./routes/categories`);

const DEFAULT_PORT = 8080;

const app = express();
const path = require(`path`);

const PUBLIC_DIR = `public`;
app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.use(`/articles`, articlesRoutes);
app.use(`/my`, myRoutes);
app.use(`/`, mainRoutes);
app.use(`/categories`, categoriesRoutes);

app.listen(DEFAULT_PORT);
