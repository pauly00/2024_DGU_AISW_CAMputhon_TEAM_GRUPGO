package rofla.back.back.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rofla.back.back.model.User;
import rofla.back.back.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;


    // 회원가입
    public void saveUser(User users) {
        if (userRepository.findByUsername(users.getUsername()).isPresent()) {
            throw new IllegalArgumentException("동일한 아이디가 있는 유저가 존재 합니다.");
        }
    }

    //조회
    public Optional<User> searchUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    //모두 조회
    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    //수정
    public Optional<User> modifyUser(User newUser) {
        return userRepository.findByUsername(newUser.getUsername())
                .map(User -> {
                    User.setId(newUser.getId());
                    User.setName(newUser.getName());
                    User.setUsername(newUser.getUsername());
                    User.setPassword(newUser.getPassword());
                    User.setPhoneNum(newUser.getPhoneNum());
                    User.setMajor(newUser.getMajor());
                    User.setRole(newUser.getRole());
                    return userRepository.save(User);
                });
    }


    //삭제
    public void deleteUser(String username) {
        if(userRepository.findByUsername(username).isPresent()) {
            userRepository.delete(userRepository.findByUsername(username).get());
        }
        else {
            System.out.println("not Present in DB!");
        }
    }
}
