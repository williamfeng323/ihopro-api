import { expect } from 'chai';
import * as koa from 'koa';
import * as body from 'koa-bodyparser';
import * as logger from 'koa-logger';
import 'mocha';
import * as sinon from 'sinon';
import * as request from 'supertest';
import routes from '../../src/routers';
import { MemberService } from '../../src/services/member.service';

describe('Member Router', () => {
  describe('#createMember', () => {
    const sandbox = sinon.sandbox.create();
    const createMemberStub = new MemberService();
    const app = new koa();
    app.use(logger());
    app.use(body({
      jsonLimit: '256kb',
    }));
    app.use(routes);
    let server;

    beforeEach(() => {
      server = app.listen(8888);
      sandbox.stub(createMemberStub, 'createMember').resolves({});
    });
    afterEach(() => {
      server.close();
      sandbox.restore();
    });
    it('should return status 400 when parameter validation failed', async () => {
      const response = await request(server).post('/member').send({
        username: 'yau@williamrepublic.org',
        password: '12341234',
      });
      expect(response.status).to.equal(400);
    });
  });
});
