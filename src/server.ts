/* tslint:disable:max-line-length */
// https://git.xogrp.com/Registry-Ruby/Replatform/blob/dev/Registry.Libraries/Autolink/XO.Registry.Autolink/AutolinkAlgorithm.cs
/* tslint:enable:max-line-length */
import * as koa from 'koa';
import * as body from 'koa-bodyparser';
import * as koaError from 'koa-json-error';
import * as logger from 'koa-logger';
import { healthyCheckRouter, tradeInfoRouter } from './routers';

const qs = require('koa-qs');

const app = new koa();
app.use(logger());
app.use(koaError());
app.use(body({
  jsonLimit: '256kb',
}));

qs(app);
// response
app.use(healthyCheckRouter.middleware());
app.use(tradeInfoRouter.middleware());

app.listen(3000, undefined, () => {
  console.log('Application Started\nlistening port 3000');
});
