import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity, UserSchema } from './adapter/out/user.schema';
import { UserService } from './application/user.service';
import { UserController } from './adapter/in/user.controller';
import { UserMapperProvider, UserRepositoryProvider } from './user.provider';

@Module({
  imports: [MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService, UserRepositoryProvider, UserMapperProvider],
  exports: [UserService],
})
export class UserModule {}
