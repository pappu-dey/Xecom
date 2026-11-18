package com.xtp.XEcom.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.xtp.XEcom.dtos.userdto;
import com.xtp.XEcom.services.userservices;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;



@RestController 
@RequestMapping ("/api/v1/user")
public class usercontroll {

    private  final userservices userservices;

    public usercontroll(userservices userservices) {
      this.userservices = userservices;
    }

    @PostMapping
    public  ResponseEntity<userdto> createuser(@RequestBody userdto userdto){
  return  ResponseEntity.status(HttpStatus.CREATED).body(userservices.createUser(userdto));
    }

    @GetMapping
    public ResponseEntity<Iterable<userdto>> getalluser() {
        return ResponseEntity.ok(userservices.getAllUsers());
    }
    @GetMapping("/email/{email}")
    public ResponseEntity <userdto> getUserByEmail (@PathVariable("email") String email){
        return ResponseEntity.ok(userservices.getUserByEmail(email));
    }
    
    
    
}
