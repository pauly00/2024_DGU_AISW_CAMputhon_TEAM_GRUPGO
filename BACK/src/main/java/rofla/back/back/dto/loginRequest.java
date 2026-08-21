package rofla.back.back.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class loginRequest {
    @NotBlank(message = "아이디를 입력하세요.")
    private String username;

    @NotBlank(message = "비밀번호를 입력하세요.")
    private String password;
}
