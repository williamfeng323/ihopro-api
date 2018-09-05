import * as Router from 'koa-router';
import { logger } from '../config';

const middleware: Router.IMiddleware = async (ctx: Router.IRouterContext, next) => {
  try {
    await next();
  } catch (err) {
    logger.error(err.message);
    ctx.status = 500;
    ctx.body = {
      status: 'failed',
      message: err.message,
    };
  }
};

export default middleware;
