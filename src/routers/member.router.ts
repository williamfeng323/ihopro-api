import * as Router from 'koa-router';
import * as _ from 'lodash';
import { logger } from '../config';
import joiValidator from '../interceptors/validate.interceptor';
import { IMembership, initMembershipValidator } from '../schemas/member';
import { MemberService } from '../services/member.service';

const memberService = new MemberService();
const memberRouter = new Router();

memberRouter.prefix('/member');

memberRouter.post('/',
  joiValidator({
    body: initMembershipValidator,
  }),
  async (ctx: Router.IRouterContext, next) => {
    const memberDetail = initMembershipValidator.validate(ctx.request.body);
    if (_.isNil(memberDetail.error)) {
      await memberService.createMember(memberDetail.value as IMembership);
      ctx.status = 200;
      ctx.body = {msg: 'member get route'};
    } else {
      throw new Error(memberDetail.error.message);
    }
});

export { memberRouter };
