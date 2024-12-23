import { userResponseSignin } from '@interfaces/auth';
import { UserService } from '@modules/User/user.service';
import { mockUserService } from '@modules/User/user.service.spec';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

const mockJwtService = {
  verifyAsync: jest
    .fn()
    .mockResolvedValue({
      secret: 'valid-refresh-token',
    })
    .mockRejectedValue(new Error('Invalid refresh token')),
};

const mockAuthService = {
  signin: jest
    .fn()
    .mockImplementation(
      (email: string, password: string): Promise<userResponseSignin> => {
        if (email === 'user@gmail.com' && password === 'password') {
          return Promise.resolve({
            status: 'success',
            message: 'usuario logado com sucesso.',
            document: [
              {
                aplicacao: 'sevenloc',
                email,
                grupo: ['Administrador'],
                accessToken: 'fake-token',
                refreshToken: 'new-refresh-token',
              },
            ],
          });
        } else {
          return Promise.reject(
            new UnauthorizedException('Invalid credentials'),
          );
        }
      },
    ),
  refreshTokens: jest.fn().mockResolvedValue({
    accessToken: 'access-token',
    refreshToken: 'new-refresh-token',
  }),
  generateTokens: jest.fn(),
};
describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: UserService, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should return access token on valid login', async () => {
    const result = await authService.signin('user@gmail.com', 'password');
    expect(result.document).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          accessToken: 'fake-token',
          refreshToken: 'new-refresh-token',
        }),
      ]),
    );
  });

  it('should throw error on invalid credentials', async () => {
    await expect(
      authService.signin('invalidUser', 'invalidPassword'),
    ).rejects.toThrow('Invalid credentials');
  });
  describe('refreshTokens', () => {
    it('should return new tokens if refresh token is valid and user is found', async () => {
      const mockPayload = { userId: '123' };
      mockJwtService.verifyAsync.mockResolvedValueOnce(mockPayload);

      mockUserService.listUser.mockResolvedValueOnce({
        document: [{ id: '123', email: 'user@gmail.com' }],
      });

      mockAuthService.generateTokens.mockResolvedValueOnce({
        accessToken: 'access-token',
        refreshToken: 'new-refresh-token',
      });

      const result = await authService.refreshTokens('valid-refresh-token');

      expect(result).toEqual({
        accessToken: 'access-token',
        refreshToken: 'new-refresh-token',
      });
    });
  });
});
