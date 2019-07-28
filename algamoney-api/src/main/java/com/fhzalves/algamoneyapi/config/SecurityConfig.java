package com.fhzalves.algamoneyapi.config;

import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
	  auth.inMemoryAuthentication()
	      .withUser("admin").password("{noop}admin").roles("ROLE");
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests().antMatchers("/categorias").permitAll()// qualquer um tem acesso
				.anyRequest().authenticated()// apenas usuarios autenticados tem acesso
				.and().httpBasic().and()// tipo de autentificacao Basic
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()// api não mantem estado de nada,sem sessão
				.csrf().disable();
	}

}
