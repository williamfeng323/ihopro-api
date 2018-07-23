import { Context } from 'koa-joi-router';

export const tradeInfoService = async (ctx: Context) => {
  console.log(ctx.body);
};
