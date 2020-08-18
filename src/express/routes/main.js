'use strict';

const {Router} = require(`express`);
const MainRouter = new Router();

MainRouter.get(`/`, (req, res) => res.send(`/`));
MainRouter.get(`/login`, (req, res) => res.send(`/login`));
MainRouter.get(`/register`, (req, res) => res.send(`/register`));
MainRouter.get(`/search`, (req, res) => res.send(`/search`));

module.exports = MainRouter;
