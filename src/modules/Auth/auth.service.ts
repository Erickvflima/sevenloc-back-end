import { TokensI, userResponseSignin } from '@interfaces/auth';
import { UserService } from '@modules/User/user.service';
import { UserByGroupService } from '@modules/UserByGroup/usersByGroup.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private userByGroupService: UserByGroupService,
  ) {}

  async signin(
    email: string,
    passwordPayload: string,
  ): Promise<userResponseSignin> {
    const user = await this.userService.findOne(email);
    const userByGroup = await this.userByGroupService.userByGroupList({
      where: { userId: user.id },
    });
    const groupListUser = userByGroup.document?.map((value) => {
      return value.groupName;
    });

    if (user && compareSync(passwordPayload, user.password)) {
      const { accessToken, refreshToken } = await this.generateTokens(
        user.id,
        email,
      );
      return {
        status: 'success',
        message: 'usuario logado com sucesso.',
        document: [
          {
            aplicacao: 'sevenloc',
            email,
            grupo: groupListUser || [],
            accessToken,
            refreshToken,
          },
        ],
      };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async generateTokens(userId: number, email: string): Promise<TokensI> {
    const accessToken = this.jwtService.sign({ userId, email });
    const refreshToken = this.jwtService.sign(
      { userId, email },
      { expiresIn: '30m', secret: process.env.JWT_REFRESH_SECRET },
    );
    return { accessToken, refreshToken };
  }

  async refreshTokens(refreshToken: string): Promise<TokensI> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      const { document } = await this.userService.listUser({
        where: { id: payload.userId },
      });

      if (!document) {
        throw new Error('User not found');
      }

      const { accessToken, refreshToken: newRefreshToken } =
        await this.generateTokens(document[0].id, document[0].email);
      return { accessToken, refreshToken: newRefreshToken };
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === 'Invalid refresh token') {
          throw new Error('Invalid refresh token');
        } else if (error.message === 'User not found') {
          throw new Error('User not found');
        }
      }
      throw new Error('Unexpected error');
    }
  }
}
