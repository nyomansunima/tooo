import { Controller, Get, Request } from '@nestjs/common'
import { User } from '@prisma/client'
import { UserService } from './user.service'

@Controller({
  path: 'user',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUserFromCredentials(@Request() req): Promise<User> {
    const user = req.user
    return this.userService.findUserByEmail(user.email)
  }
}
