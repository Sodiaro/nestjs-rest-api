import type { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthJwtPayload } from '../types/auth-jwtPayload';
import jwtConfig from '../config/jwt.config';
import { Inject, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import refreshJwtConfig from '../config/refresh-jwt.config';
import { Request } from 'express';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(
    @Inject(refreshJwtConfig.KEY)
    // private authService: AuthService,
    // private jwtConfiguration: ConfigType<typeof refreshJwtConfig>,
    private readonly jwtConfiguration: ConfigType<typeof refreshJwtConfig>, // <-- config goes here
    private readonly authService: AuthService, // <-- normal DI, no @Inject
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfiguration.secret as string,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: AuthJwtPayload) {
    const refreshToken = req
      .get('authorization')
      ?.replace('Bearer', '')
      .trim() as string;
    const userId = payload.sub;
    return this.authService.validateRefreshToken(userId, refreshToken);
  }
}
