import * as Joi from 'joi';
import * as router from 'koa-joi-router';
import { tradeInfoService } from '../services/trade-info.service';

const tradeInfoSchema = Joi.object({
  method: Joi.string().required().max(50),
  orderNo: Joi.string().required().length(18),
  merchantNo: Joi.string().required().length(16),
  merchantName: Joi.string().required().length(60),
  tradeTime: Joi.string().required().length(14),
  tradeAmt: Joi.number().required().precision(2),
  tradeType: Joi.number().required().allow([1001, 1002, 1010, 1013, 2001, 2012]),
  tradeStatus: Joi.string().required().length(1).allow(['I', 'S', 'F', 'P']),
  cardType: Joi.string().required().length(1).allow(['D', 'C', 'U']),
  terminalNo: Joi.string().required().length(17),
  agentNo: Joi.string().required().length(16),
  agentName: Joi.string().required().max(60),
  isVipTrade: Joi.boolean().required().truthy(1).falsy(0),
  feeAmt: Joi.number().required().precision(2),
  agentLevel: Joi.number().required().allow([1, 2, 3, 4]),
  usrMobileMask: Joi.string().required().max(11),
});
const tradeInfoRouter = router();
tradeInfoRouter.route({
  method: 'POST',
  path: '/trade-info',
  handler: async (ctx: router.Context ) => {
    tradeInfoService(ctx);
  },
  validate: {
    type: 'json',
    body: tradeInfoSchema,
  },
});
export { tradeInfoRouter };
