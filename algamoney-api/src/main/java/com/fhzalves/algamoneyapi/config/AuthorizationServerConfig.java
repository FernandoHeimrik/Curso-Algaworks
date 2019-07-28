package com.fhzalves.algamoneyapi.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;


@Configuration
@EnableAuthorizationServer
public class AuthorizationServerConfig extends AuthorizationServerConfigurerAdapter {

	// Gerencia a autentificação. Pega o usuario e senha admin da aplicação
	@Autowired
	private AuthenticationManager authenticationManager;

	// Autoriza o cliente a acessar a aplicacao
	@Override
	public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
		clients.inMemory().withClient("angular")// define o nome do client
				.secret("@angul@r0")// define a senha do client
				.scopes("read", "write")// um Array de String definindo o scope, limitar o acesso do client
				.authorizedGrantTypes("password")// Fluxo PassWord a aplicação recebe o usuario e senha do user
				.accessTokenValiditySeconds(1800);// Quantos segundos o token ficara ativo
	}

	@Override
	public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
		endpoints.tokenStore(tokenStore())
			.accessTokenConverter(accessTokenConverter())
			.authenticationManager(authenticationManager);// valida se esta tudo certo com
																						// o usuario e senha
	}

	@Bean
	public JwtAccessTokenConverter accessTokenConverter() {
		JwtAccessTokenConverter accessTokenConverter = new JwtAccessTokenConverter();
		accessTokenConverter.setSigningKey("algawors");//VERIFY SIGNATURE
		return accessTokenConverter;
	}

	@Bean
	public TokenStore tokenStore() {
		return new JwtTokenStore(accessTokenConverter());
	}

}
