package rofla.back.back.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rofla.back.back.common.BadCredentialsException;
import rofla.back.back.model.User;
import rofla.back.back.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // 회원가입 (아이디 중복 확인 및 비밀번호 해시)
    @Transactional
    public User saveUser(User users) {
        if (userRepository.findByUsername(users.getUsername()).isPresent()) {
            throw new IllegalArgumentException("동일한 아이디가 있는 유저가 존재 합니다.");
        }
        users.setPassword(passwordEncoder.encode(users.getPassword()));
        if (users.getRole() == null || users.getRole().isBlank()) {
            users.setRole("U");
        }
        return userRepository.save(users);
    }

    // 로그인 인증 (아이디 존재 및 비밀번호 일치 확인)
    @Transactional(readOnly = true)
    public User authenticate(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new BadCredentialsException("아이디 또는 비밀번호가 올바르지 않습니다."));
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new BadCredentialsException("아이디 또는 비밀번호가 올바르지 않습니다.");
        }
        return user;
    }

    // 조회
    @Transactional(readOnly = true)
    public Optional<User> searchUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    // 모두 조회
    @Transactional(readOnly = true)
    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    // 수정
    @Transactional
    public Optional<User> modifyUser(User newUser) {
        return userRepository.findByUsername(newUser.getUsername())
                .map(user -> {
                    user.setName(newUser.getName());
                    user.setPhoneNum(newUser.getPhoneNum());
                    user.setMajor(newUser.getMajor());
                    if (newUser.getRole() != null && !newUser.getRole().isBlank()) {
                        user.setRole(newUser.getRole());
                    }
                    if (newUser.getPassword() != null && !newUser.getPassword().isBlank()) {
                        user.setPassword(passwordEncoder.encode(newUser.getPassword()));
                    }
                    return userRepository.save(user);
                });
    }

    // 삭제
    @Transactional
    public void deleteUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
        userRepository.delete(user);
    }
}
