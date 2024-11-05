package com.positive.culture.seoulQuest.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Log4j2
@RequestMapping("/api/admin/")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class AdminController {

    @GetMapping("/admin")
    public String adminP() {
        return "admin controller";
    }
}
