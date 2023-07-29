import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { GithubAuthInput, GoogleAuthInput } from './model/auth.input'
import { AuthData } from './model/auth.payload'
import { Public } from './decorator/public.decorator'

@Controller({ path: 'auth' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/google')
  async authWithGoogle(@Body() input: GoogleAuthInput): Promise<AuthData> {
    return this.authService.authWithGoogle(input)
  }

  @Public()
  @Post('/github')
  async authWithGithub(@Body() input: GithubAuthInput): Promise<AuthData> {
    return this.authService.authWithGithub(input)
  }
}
