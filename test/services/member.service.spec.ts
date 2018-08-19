import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import mongoProvider from '../../src/db/mongo-provider';
import { MemberRole } from '../../src/schemas/member';
import { MemberService } from '../../src/services/member.service';

describe('MemberService', () => {
  describe('#createMember', () => {
    const sandbox = sinon.sandbox.create();
    const memberService = new MemberService();
    beforeEach(() => {
      sandbox.stub(mongoProvider, 'db').returns(
        {
          databaseName: 'some-database',
          collection: () => {
            return {
              save: () => true,
            };
          },
        });
    });
    afterEach(() => {
      sandbox.restore();
    });
    it('should be able to insert a valid member', async () => {
      const result = await memberService.createMember({
        phoneNumber: 12345678910,
        email: 'abc@123.com',
        password: 'abcD123',
        firstName: '名',
        lastName: '姓',
        role: MemberRole.regular,
      });
      expect(result).to.be.equal(true);
    });
  });
});
