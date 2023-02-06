package com.example.ulgeryn.security.payloads;

import com.example.ulgeryn.models.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {
    private String jwt;
    private String id;
    private String userName;
    private String email;
    private List<String> roles;
}
