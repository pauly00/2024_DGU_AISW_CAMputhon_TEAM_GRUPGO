package rofla.back.back.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rofla.back.back.common.ApiResponse;
import rofla.back.back.dto.UserResponse;
import rofla.back.back.dto.loginRequest;
import rofla.back.back.model.User;
import rofla.back.back.service.UserService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/User")
public class UserController {

    private final UserService userService;

    // POST [/User/join] 회원가입 (아이디 중복 확인)
    @PostMapping("/join")
    public ResponseEntity<ApiResponse<UserResponse>> saveUser(@RequestBody User users) {
        User saved = userService.saveUser(users);
        return ResponseEntity.ok(ApiResponse.success(new UserResponse(saved), "회원가입 성공!"));
    }

    // POST [/User/login] 로그인 인증 (아이디 및 비밀번호 검증)
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<UserResponse>> loginUser(@Valid @RequestBody loginRequest loginRequest) {
        User user = userService.authenticate(loginRequest.getUsername(), loginRequest.getPassword());
        return ResponseEntity.ok(ApiResponse.success(new UserResponse(user), "로그인 성공!"));
    }

    // GET [/User/getAll] 전체 사용자 조회
    @GetMapping("/getAll")
    public ResponseEntity<List<UserResponse>> getAllUser() {
        List<UserResponse> total = userService.getAllUser().stream()
                .map(UserResponse::new)
                .toList();
        return ResponseEntity.ok(total);
    }

    // GET [/User/search/{name}] 사용자 조회
    @GetMapping("/search/{name}")
    public ResponseEntity<UserResponse> searchUser(@PathVariable String name) {
        return userService.searchUserByUsername(name)
                .map(user -> ResponseEntity.ok(new UserResponse(user)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // PUT [/User/update] 사용자 정보 수정
    @PutMapping("/update")
    public ResponseEntity<UserResponse> updateUser(@RequestBody User newUser) {
        return userService.modifyUser(newUser)
                .map(user -> ResponseEntity.ok(new UserResponse(user)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // DELETE [/User/delete/{name}] 사용자 삭제
    @DeleteMapping("/delete/{name}")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable String name) {
        userService.deleteUser(name);
        return ResponseEntity.ok(ApiResponse.success(null, "삭제되었습니다."));
    }
}
