import Member from '../daos/member-dao';
import { IMembership } from '../schemas/member';

export class MemberService {
  /**
   * Create a new member
   * @param member the member item object
   * @returns the created item
   */
  public async createMember (member: IMembership) {
    try {
      const memberModel = Member.collection();
      return memberModel.save(member);
    } catch (err) {
      throw err;
    }
  }
}
