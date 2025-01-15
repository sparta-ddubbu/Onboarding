import { UserDomain } from '../../domain/user.domain';
import { GetUserInfoResDto } from '../dto/res/user.dto';

// Q. converter 같은 경우에는 class injection 없이 util 로 넣으면 안될지?
export const mapDomainToUserInfoDto = (user: UserDomain): GetUserInfoResDto => ({
  userId: user.id,
  nickname: user.nickname,
});
