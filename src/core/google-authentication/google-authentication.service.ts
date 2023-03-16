import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Auth, google } from 'googleapis';
import environments from 'src/config/environments';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GoogleAuthenticationService {
  oauthClient: Auth.OAuth2Client;
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {
    this.oauthClient = new google.auth.OAuth2(
      environments().GOOGLE_AUTH_CLIENT_ID,
      environments().GOOGLE_AUTH_CLIENT_SECRET
    );
  }

  async authenticate(token: string) {
    const tokenInfo = await this.oauthClient.verifyIdToken({
      idToken: token,
      audience: environments().GOOGLE_AUTH_CLIENT_ID
    }).catch(
      (err) => {
        throw new UnauthorizedException();
      }
    );

    const payload = tokenInfo.getPayload();

    const user = await this.userService.getByEmail(payload.email);

    if (user) {
      return this.handleRegisteredUser(user);
    } else {
      return this.registerUser(payload.email);
    }
  }

  async registerUser(email: string) {
    const username = email;
    const user = await this.userService.createWithGoogle(email, username);
    return this.handleRegisteredUser(user);
  }


  handleRegisteredUser(user) {
    const userResult = { id: user.id, username: user.username, email: user.email };
    const { pwd, ...result } = user;
    return {
      user: result,
      access_token: this.jwtService.sign(userResult),
    };
  }
}