package rofla.back.back.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rofla.back.back.model.Food;
import rofla.back.back.repository.FoodRepository;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor

public class FoodService {

        private final FoodRepository foodRepository;

        // 음식 등록 (중복 확인 후 저장)
        public Food saveFood(Food food) {
            if (foodRepository.findByName(food.getName()).isPresent()) {
                throw new IllegalArgumentException("동일한 음식이 존재 합니다.");
            }
            return foodRepository.save(food);
        }

        //조회
        public Optional<Food> searchFoodByName(String name) {
            return foodRepository.findByName(name);
        }

        //모두 조회
        public List<Food> getAllFood() {
            return foodRepository.findAll();
        }


        //수정
        public Optional<Food> modifyFood(Food newFood) {
            return foodRepository.findByName(newFood.getName())
                    .map(Food -> {
                        Food.setId(newFood.getId());
                        Food.setName(newFood.getName());
                        Food.setRestaurant(newFood.getRestaurant());
                        Food.setWaiting(newFood.getWaiting());
                        Food.setFoodInfo(newFood.getFoodInfo());
                        return foodRepository.save(Food);
                    });
        }


        //삭제
        public void deleteFood(String name) {
            if(foodRepository.findByName(name).isPresent()) {
                foodRepository.delete(foodRepository.findByName(name).get());
            }
            else {
                System.out.println("not Present in DB!");
            }
        }
}
