import { Injectable, Logger } from '@nestjs/common'
import { UserService } from '~/user/user.service'
import { GithubAuthInput, GoogleAuthInput } from './model/auth.input'
import { AuthData } from './model/auth.payload'
import { OAuthService } from './oauth.service'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly oAuthService: OAuthService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  logger = new Logger(AuthService.name)

  async generateToken(user: User): Promise<AuthData> {
    this.logger.log('Create Access and Refresh Token')

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    }
    const accessTokenExpiration = this.configService.get<string>(
      'jwt.accessTokenExpiresIn',
    )
    const refreshTokenExpiration = this.configService.get<string>(
      'jwt.refreshTokenExpiresIn',
    )

    const accessToken = await this.jwtService.sign(payload, {
      expiresIn: accessTokenExpiration,
    })
    const refreshToken = await this.jwtService.sign(payload, {
      expiresIn: refreshTokenExpiration,
    })

    const decodedAccessToken = await this.jwtService.decode(accessToken, {
      json: true,
    })

    return {
      accessToken,
      refreshToken,
      iat: decodedAccessToken['iat'],
      exp: decodedAccessToken['exp'],
    }
  }

  async authWithGoogle(input: GoogleAuthInput): Promise<AuthData> {
    this.logger.log('Auth with google')

    const googleUser = await this.oAuthService.retrieveGoogleUser(input)
    const user = await this.userService.signUserWithGoogle(googleUser)
    const token = await this.generateToken(user)

    this.logger.log('Auth completed')

    return token
  }

  async authWithGithub(input: GithubAuthInput): Promise<AuthData> {
    this.logger.log('Auth with github')

    const githubUser = await this.oAuthService.retrieveGithubUser(input)
    const user = await this.userService.signUserWithGithub(githubUser)
    const token = await this.generateToken(user)

    this.logger.log('Auth completed')

    return token
  }
}
