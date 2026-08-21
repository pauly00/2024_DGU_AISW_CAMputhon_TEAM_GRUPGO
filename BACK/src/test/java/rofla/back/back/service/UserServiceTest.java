package rofla.back.back.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import rofla.back.back.common.BadCredentialsException;
import rofla.back.back.model.User;
import rofla.back.back.repository.UserRepository;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

// 사용자 서비스 인증 단위 테스트
class UserServiceTest {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private UserService userService;

    @BeforeEach
    void setUp() {
        userRepository = mock(UserRepository.class);
        passwordEncoder = new BCryptPasswordEncoder();
        userService = new UserService(userRepository, passwordEncoder);
    }

    @Test
    void 회원가입시_비밀번호_해시_저장() {
        User user = newUser("kim", "plain1234");
        when(userRepository.findByUsername("kim")).thenReturn(Optional.empty());
        when(userRepository.save(any(User.class))).thenAnswer(inv -> inv.getArgument(0));

        User saved = userService.saveUser(user);

        assertThat(saved.getPassword()).isNotEqualTo("plain1234");
        assertThat(passwordEncoder.matches("plain1234", saved.getPassword())).isTrue();
    }

    @Test
    void 아이디_중복시_예외() {
        User user = newUser("kim", "plain1234");
        when(userRepository.findByUsername("kim")).thenReturn(Optional.of(user));

        assertThatThrownBy(() -> userService.saveUser(user))
                .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    void 올바른_비밀번호로_인증_성공() {
        User stored = newUser("kim", passwordEncoder.encode("plain1234"));
        when(userRepository.findByUsername("kim")).thenReturn(Optional.of(stored));

        User result = userService.authenticate("kim", "plain1234");

        assertThat(result.getUsername()).isEqualTo("kim");
    }

    @Test
    void 잘못된_비밀번호로_인증_실패() {
        User stored = newUser("kim", passwordEncoder.encode("plain1234"));
        when(userRepository.findByUsername("kim")).thenReturn(Optional.of(stored));

        assertThatThrownBy(() -> userService.authenticate("kim", "wrong"))
                .isInstanceOf(BadCredentialsException.class);
    }

    private User newUser(String username, String password) {
        User user = new User();
        user.setName("홍길동");
        user.setUsername(username);
        user.setPassword(password);
        user.setMajor("컴퓨터공학");
        user.setRole("U");
        return user;
    }
}
