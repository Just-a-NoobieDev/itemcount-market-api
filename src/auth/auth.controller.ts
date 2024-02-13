import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { GoogleOAuthGuard } from './utils/google-oauth.guard';
import { AuthService } from './auth.service';
import { FacebookOAuthGuard } from './utils/facebook.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/google')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Request() req) {
    return req.user;
  }

  @Get('/google/google-redirect')
  @UseGuards(GoogleOAuthGuard)
  googleAuthRedirect(@Request() req) {
    return this.authService.googleLogin(req);
  }

  @Get('/facebook')
  @UseGuards(FacebookOAuthGuard)
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/facebook/redirect')
  @UseGuards(FacebookOAuthGuard)
  async facebookLoginRedirect(@Req() req): Promise<any> {
    return {
      statusCode: HttpStatus.OK,
      data: req.user,
    };
  }
}
