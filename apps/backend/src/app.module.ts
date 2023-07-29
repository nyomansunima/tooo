import { Global, Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { settingConfiguration } from './config/settings'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { PrismaService } from './config/prisma.service'
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard'

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [settingConfiguration],
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),

    // TODO: add the feature module
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [PrismaService],
})
export class AppModule {}
