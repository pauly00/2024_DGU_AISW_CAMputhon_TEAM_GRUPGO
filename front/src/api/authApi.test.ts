// axios 클라이언트 모의 (실제 axios 로드 방지)
jest.mock('./client', () => ({
  __esModule: true,
  default: { post: jest.fn(), get: jest.fn() },
}));

import client from './client';
import { login } from './authApi';

const mockPost = client.post as jest.Mock;

describe('authApi.login', () => {
  beforeEach(() => {
    mockPost.mockReset();
  });

  it('성공 응답이면 사용자 반환', async () => {
    mockPost.mockResolvedValue({
      data: {
        success: true,
        data: { id: 1, name: '데모', username: 'demo', major: '컴퓨터공학', role: 'U' },
        message: '로그인 성공!',
      },
    });

    const user = await login({ username: 'demo', password: 'demo1234' });
    expect(user.username).toBe('demo');
  });

  it('실패 응답이면 예외 발생', async () => {
    mockPost.mockResolvedValue({
      data: { success: false, data: null, message: '아이디 또는 비밀번호가 올바르지 않습니다.' },
    });

    await expect(login({ username: 'demo', password: 'wrong' })).rejects.toThrow(
      '아이디 또는 비밀번호가 올바르지 않습니다.'
    );
  });
});
