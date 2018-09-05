import { IRouterContext } from 'koa-router';

export const tradeInfoService = async (ctx: IRouterContext) => {
  console.log(ctx.body);
};
