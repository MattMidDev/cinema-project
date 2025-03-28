package com.cinema.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class SecurityConfig {

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		
		http
			.cors().and()
			.csrf().disable() // disabilitato per test angular
			.authorizeHttpRequests(auth -> auth
				.requestMatchers(
					"/api/films/current",
					"/api/films/range",
					"/",
					"/index.html"
				).permitAll()
				.requestMatchers("/api/films/past", "/api/films").hasRole("ADMIN")
				.requestMatchers("/api/films/range/past").hasRole("ADMIN")
				.anyRequest().authenticated()
			)
			.httpBasic();
		
		return http.build();
	}

	
	@Bean
	public WebMvcConfigurer corsConfigurer() {
	    return new WebMvcConfigurer() {
	        @Override
	        public void addCorsMappings(CorsRegistry registry) {
	            registry.addMapping("/api/**")
	                    .allowedOrigins("http://localhost:4200")
	                    .allowedMethods("*")
	                    .allowedHeaders("*")
	                    .allowCredentials(true);
	        }
	    };
	}
	
	@Bean
	public UserDetailsService userDetailsService(PasswordEncoder encoder) {
		
		return new InMemoryUserDetailsManager(
				User.withUsername("admin")
				.password(encoder.encode("admin"))
				.roles("ADMIN")
				.build()
				);
	}
	
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }	
}
