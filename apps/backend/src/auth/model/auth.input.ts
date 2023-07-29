import { IsNotEmpty, IsString } from 'class-validator'

export class GoogleAuthInput {
  @IsNotEmpty()
  @IsString()
  tokenId: string

  @IsNotEmpty()
  @IsString()
  accessToken: string
}

export class GithubAuthInput {
  accessToken: string
}
