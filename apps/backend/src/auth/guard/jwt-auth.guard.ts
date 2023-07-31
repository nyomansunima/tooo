import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { IS_PUBLIC_KEY } from '../decorator/public.decorator'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (isPublic) {
      return true
    }
    return super.canActivate(context)
  }

  handleRequest(err, user, info, context, status) {
    if (err) {
      throw err
    }

    // the token access
    // was expired, need action to refresh from client
    if (info && (info?.message as string).includes('jwt expired')) {
      throw new UnauthorizedException('auth/token-expired', {
        cause: new Error(),
        description: 'Pleae refresh the access token',
      })
    }

    if (!user) {
      throw new UnauthorizedException('auth/authentication-need', {
        cause: new Error(),
        description: 'Please signin before access this resource',
      })
    }

    return user
  }
}
