import { Injectable } from '@nestjs/common'
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

  async generateToken(user: User): Promise<AuthData> {
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

    return { accessToken, refreshToken }
  }

  async authWithGoogle(input: GoogleAuthInput): Promise<AuthData> {
    const googleUser = await this.oAuthService.retrieveGoogleUser(input)
    const user = await this.userService.signUserWithGoogle(googleUser)
    const token = await this.generateToken(user)

    return token
  }

  async authWithGithub(input: GithubAuthInput): Promise<AuthData> {
    const githubUser = await this.oAuthService.retrieveGithubUser(input)
    const user = await this.userService.signUserWithGithub(githubUser)
    const token = await this.generateToken(user)

    return token
  }
}
