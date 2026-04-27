package com.mz.lec.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/user")
@Controller
public class UserC {
    @Autowired
    private UserService userService;

    @GetMapping
    public String getAllUser(Model model) {
        model.addAttribute("users", userService.getAllUser());
        return "user/select";
    }


    @GetMapping("/delete")
    public String deleteUser(@RequestParam String id) {
        userService.deleteUser(id);
        return "redirect:/user";
    }

    @PostMapping()
    public String addUSer(UserVO userVO) {
        userService.insertUser(userVO);
        return "redirect:/user";
    }


    @GetMapping("/{id}")
    public String getUser(@PathVariable String id, Model model) {
        UserVO user = userService.getUser(id);

        model.addAttribute("user", user);

        return "user/mypage";
    }

    @GetMapping("/detail")
    public String getUser(UserVO userVO) {
        System.out.println(userVO);


        return "user/mypage";
    }

}
