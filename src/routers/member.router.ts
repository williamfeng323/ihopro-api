import * as router from 'koa-joi-router';
import { initMembershipValidator } from '../schemas/member';
import { MemberService } from '../services/member.service';

const memberService = new MemberService();
const memberRouter = router();
memberRouter.route({
  method: 'POST',
  path: '/',
  handler: async (ctx: router.Context ) => {
    await memberService.createMember(ctx.body);
  },
  validate: {
    type: 'json',
    body: initMembershipValidator,
  },
});
export { memberRouter };
