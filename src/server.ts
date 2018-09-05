import * as koa from 'koa';
import * as body from 'koa-bodyparser';
import * as logger from 'koa-logger';
import router from './routers';

const qs = require('koa-qs');

const app = new koa();
app.use(logger());
app.use(body({
  jsonLimit: '256kb',
}));

qs(app);

app.use(router);

const server = app.listen(8080, undefined, () => {
  console.log('Application Started\nlistening port 8080');
});
export default server;
