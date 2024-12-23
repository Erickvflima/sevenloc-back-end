import { PublicRoute } from '@auth/public.guard';
import { TokensI } from '@interfaces/auth';
import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SigninDTO } from './dto/signin.dto';

@ApiBearerAuth('JWT')
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @PublicRoute()
  @ApiOperation({ summary: 'Rota de login' })
  @ApiResponse({
    status: 201,
    description: 'Usuário logado com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'Requisição inválida.' })
  @Post('signin')
  async signin(@Body() signinDto: SigninDTO): Promise<any> {
    const user = await this.authService.signin(
      signinDto.email,
      signinDto.password,
    );
    return user;
  }

  @Post('refresh')
  async refresh(@Body() body: { refreshToken: string }): Promise<TokensI> {
    const { accessToken, refreshToken } = await this.authService.refreshTokens(
      body.refreshToken,
    );
    return { accessToken, refreshToken };
  }
}
