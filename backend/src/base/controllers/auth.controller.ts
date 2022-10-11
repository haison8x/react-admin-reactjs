import { Controller, Get, Post, UseGuards, UnauthorizedException, Body } from '@nestjs/common';

import { AuthService, Login, Payload, JwtAuthGuard, JwtSign, JwtVerifyGuard } from '../../auth';
import { ReqUser, Public } from '../../common';

/**
 * https://docs.nestjs.com/techniques/authentication
 */
@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Public()
  @Post('login')
  public async jwtLogin(@Body() login: Login): Promise<JwtSign> {
    const user = await this.auth.validateUser(login.username, login.password);
    if (!user) {
      throw new UnauthorizedException('InvalidUser');
    }
    const payload = { userId: user.id.toString(), username: user.username, role: user.role };
    return this.auth.jwtSign(payload, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('check')
  public jwtCheck(@ReqUser() payload: Payload): Payload {
    return payload;
  }

  // Only verify is performed without checking the expiration of the access_token.
  @UseGuards(JwtVerifyGuard)
  @Post('refresh')
  public async jwtRefresh(@ReqUser() payload: Payload, @Body('refresh_token') token?: string): Promise<JwtSign> {
    if (!token || !this.auth.validateRefreshToken(payload, token)) {
      throw new UnauthorizedException('InvalidRefreshToken');
    }
    const user = await this.auth.getUser(payload.username);
    if (!user) {
      throw new UnauthorizedException('InvalidRefreshToken');
    }

    return this.auth.jwtSign(payload, user);
  }
}
