import { Injectable } from '@nestjs/common'
import { GithubOAuthData, GoogleOAuthData } from '~/auth/model/auth.payload'
import { PrismaService } from '~/config/prisma.service'
import { User, UserProvider, Prisma } from '@prisma/client'

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findUserByEmail(email: string): Promise<User | null> {
    const res = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    })

    return res ?? null
  }

  async assignNewProvider(user: User, provider: UserProvider): Promise<User> {
    // check if the current user already have the
    // privider, if not let's add it
    if (user.providers && !user.providers.includes(provider)) {
      const res = await this.prismaService.user.update({
        where: { email: user.email },
        data: {
          providers: [...user.providers, provider],
        },
      })

      return res
    }

    return user
  }

  async createNewUser(input: Prisma.UserCreateInput): Promise<User> {
    const res = await this.prismaService.user.create({
      data: input,
    })

    return res
  }

  createUsernameFromEmail(email: string): string {
    return email.split('@')[0]
  }

  async signUserWithGoogle(input: GoogleOAuthData): Promise<User> {
    let currentUser = await this.findUserByEmail(input.email)
    if (currentUser) {
      currentUser = await this.assignNewProvider(currentUser, 'GOOGLE')
    }
    if (!currentUser) {
      const createUserInput: Prisma.UserCreateInput = {
        email: input.email,
        username: this.createUsernameFromEmail(input.email),
        avatar: input.picture,
        fullName: input.name,
        providers: ['GOOGLE'],
        role: 'USER',
        isVerified: false,
      }
      currentUser = await this.createNewUser(createUserInput)
    }

    return currentUser
  }

  async signUserWithGithub(input: GithubOAuthData): Promise<User> {
    let currentUser = await this.findUserByEmail(input.email)
    if (currentUser) {
      currentUser = await this.assignNewProvider(currentUser, 'GITHUB')
    }
    if (!currentUser) {
      const createUserInput: Prisma.UserCreateInput = {
        email: input.email,
        username: this.createUsernameFromEmail(input.email),
        avatar: input.avatar_url,
        fullName: input.name,
        providers: ['GITHUB'],
        role: 'USER',
        address: input.location,
        isVerified: false,
      }
      currentUser = await this.createNewUser(createUserInput)
    }

    return currentUser
  }
}
