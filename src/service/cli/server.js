'use strict';

const chalk = require(`chalk`);

const HttpCode = require(`../http-code`);
const express = require(`express`);
const routes = require(`../api`);
const API_PREFIX = `/api`;

const DEFAULT_PORT = 3000;

const app = express();
app.use(express.json());
app.use(API_PREFIX, routes);

const postsRoutes = require(`./routes/posts-routes`);
app.use(`/posts`, postsRoutes);

app.use((req, res) => res
  .status(HttpCode.NOT_FOUND)
  .send(`Not found`));

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;
    app.listen(port)
    .on(`listening`, (err) => {
      if (err) {
        return console.error(`Ошибка при создании сервера`, err);
      }

      return console.info(chalk.green(`Ожидаю соединений на ${port}`));
    });
  }
};
