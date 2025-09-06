import type { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthJwtPayload } from '../types/auth-jwtPayload';
import jwtConfig  from '../config/jwt.config';
import { Inject, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import refreshJwtConfig from '../config/refresh-jwt.config'

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {
  constructor(
    @Inject(refreshJwtConfig.KEY)
    // private authService: AuthService,
    private jwtConfiguration: ConfigType<typeof refreshJwtConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfiguration.secret as string,
      ignoreExpiration: false,

    });
  }

  validate(payload: AuthJwtPayload) {
      return { id: payload.sub };
  }
}
