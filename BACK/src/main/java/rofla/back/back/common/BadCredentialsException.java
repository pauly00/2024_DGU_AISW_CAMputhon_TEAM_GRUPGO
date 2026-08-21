package rofla.back.back.common;

// 인증 실패 예외
public class BadCredentialsException extends RuntimeException {
    public BadCredentialsException(String message) {
        super(message);
    }
}
