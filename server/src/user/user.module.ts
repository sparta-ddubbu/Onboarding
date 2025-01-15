import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './adapter/out/user.schema';
import { UserService } from './application/user.service';
import { UserController } from './adapter/in/user.controller';
import { UserRepository, UserRepositoryToken } from './adapter/out/user.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService, { provide: UserRepositoryToken, useClass: UserRepository }],
  exports: [UserService],
})
export class UserModule {}
