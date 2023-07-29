import { BadRequestException, Injectable, Logger } from '@nestjs/common'
import {
  GithubOAuthData,
  GithubOAuthEmailData,
  GoogleOAuthData,
} from './model/auth.payload'
import { GithubAuthInput, GoogleAuthInput } from './model/auth.input'
import { HttpService } from '@nestjs/axios'
import { AxiosError } from 'axios'
import { catchError, firstValueFrom } from 'rxjs'

@Injectable()
export class OAuthService {
  private readonly logger = new Logger(OAuthService.name)
  constructor(private readonly httpService: HttpService) {}

  /**
   * Retrieve the user account profile in google
   * @returns {GoogleOAuthData} github account user info
   */
  async retrieveGoogleUser({
    tokenId,
    accessToken,
  }: GoogleAuthInput): Promise<GoogleOAuthData> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<GoogleOAuthData>(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`,
          {
            headers: {
              Authorization: `Bearer ${tokenId}`,
            },
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data)
            throw new BadRequestException('auth/retrieve-google-user-failed', {
              cause: new Error(),
              description: 'Opps, cannot get the google user',
            })
          }),
        ),
    )

    return data
  }

  /**
   * Retrieve the user account profile in github
   * @returns {GithubOAuthData} github account user info
   */
  async retrieveGithubUser({
    accessToken,
  }: GithubAuthInput): Promise<GithubOAuthData> {
    const emailRes = await firstValueFrom(
      this.httpService
        .get<GithubOAuthEmailData[]>(`https://api.github.com/user/emails`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data)
            throw new BadRequestException('auth/retrieve-github-email-failed', {
              cause: new Error(),
              description: 'Opps, cannot get the github user',
            })
          }),
        ),
    )

    const { data } = await firstValueFrom(
      this.httpService
        .get<GithubOAuthData>(`https://api.github.com/user`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data)
            throw new BadRequestException('auth/retrieve-github-user-failed', {
              cause: new Error(),
              description: 'Opps, cannot get the github user',
            })
          }),
        ),
    )

    return { ...data, email: emailRes.data[0].email }
  }
}
