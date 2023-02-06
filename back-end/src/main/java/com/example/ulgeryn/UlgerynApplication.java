package com.example.ulgeryn;


import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.mongodb.config.EnableReactiveMongoAuditing;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@SpringBootApplication
//@EnableMongoRepositories(basePackages="com/example/ulgeryn/repositories/VersionService.class")
@Configuration
@EnableMongoAuditing
public class UlgerynApplication {

	public static void main(String[] args) {
		SpringApplication.run(UlgerynApplication.class, args);
	}
}
