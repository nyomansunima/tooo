import { Module } from '@nestjs/common'
import { UserModule } from '~/user/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { HttpModule } from '@nestjs/axios'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { JwtStrategy } from './strategy/jwt.strategy'
import { OAuthService } from './oauth.service'

@Module({
  imports: [
    HttpModule,
    UserModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: {},
        verifyOptions: {
          ignoreExpiration: false,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, OAuthService],
})
export class AuthModule {}
