package rofla.back.back.dto;

import lombok.Getter;
import rofla.back.back.model.User;

// 비밀번호 제외 사용자 응답
@Getter
public class UserResponse {
    private final Long id;
    private final String name;
    private final String username;
    private final String phoneNum;
    private final String major;
    private final String role;

    public UserResponse(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.username = user.getUsername();
        this.phoneNum = user.getPhoneNum();
        this.major = user.getMajor();
        this.role = user.getRole();
    }
}
