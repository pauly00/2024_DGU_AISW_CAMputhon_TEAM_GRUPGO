package rofla.back.back.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import rofla.back.back.model.Food;
import rofla.back.back.model.User;
import rofla.back.back.repository.FoodRepository;
import rofla.back.back.repository.UserRepository;

// 로컬 프로필 초기 데이터 시드
@Component
@Profile("local")
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final FoodRepository foodRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        seedDemoUser();
        seedFoods();
    }

    // 데모 계정 (demo / demo1234)
    private void seedDemoUser() {
        if (userRepository.findByUsername("demo").isPresent()) {
            return;
        }
        User demo = new User();
        demo.setName("데모유저");
        demo.setUsername("demo");
        demo.setPassword(passwordEncoder.encode("demo1234"));
        demo.setPhoneNum("0100000000");
        demo.setMajor("컴퓨터공학");
        demo.setRole("U");
        userRepository.save(demo);
    }

    // 식당 메뉴 초기값
    private void seedFoods() {
        if (foodRepository.count() > 0) {
            return;
        }
        saveFood("삼겹살김치철판", "솥앤누들", 3, "매콤한 김치와 함께 철판에 구운 삼겹살 요리");
        saveFood("치즈불닭철판", "솥앤누들", 5, "매콤한 불닭 위에 치즈를 올린 철판 요리");
        saveFood("데리야끼치킨솥밥", "솥앤누들", 2, "데리야끼 소스에 구운 닭고기를 올린 솥밥");
        saveFood("우삼겹솥밥", "솥앤누들", 4, "육즙 가득한 우삼겹을 얹은 고소한 솥밥");
        saveFood("냉모밀", "솥앤누들", 1, "시원한 국물에 쫄깃한 모밀면");
        saveFood("수육국밥", "솥앤누들", 6, "부드러운 수육과 깊은 국물의 국밥");
    }

    private void saveFood(String name, String restaurant, int waiting, String info) {
        Food food = new Food();
        food.setName(name);
        food.setRestaurant(restaurant);
        food.setWaiting(waiting);
        food.setFoodInfo(info);
        foodRepository.save(food);
    }
}
