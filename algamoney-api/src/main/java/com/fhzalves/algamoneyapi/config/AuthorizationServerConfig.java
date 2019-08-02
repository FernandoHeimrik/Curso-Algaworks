package com.fhzalves.algamoneyapi.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;


@Configuration
public class AuthorizationServerConfig extends AuthorizationServerConfigurerAdapter {

	// Gerencia a autentificação. Pega o usuario e senha admin da aplicação
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private UserDetailsService userDetailsService;
	
	@Autowired
	private PasswordEncoder encoder;

	// Autoriza o cliente a acessar a aplicacao
	@Override
	public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
		clients.inMemory().withClient("angular")// define o nome do client
				.secret(encoder.encode("@angul@r0"))// define a senha do client @angul@r0
				.scopes("read", "write")// um Array de String definindo o scope, limitar o acesso do client
				.authorizedGrantTypes("password","refresh_token")// Fluxo PassWord a aplicação recebe o usuario e senha do user
				.accessTokenValiditySeconds(1800)// Quantos segundos o token ficara ativo
				.refreshTokenValiditySeconds(3600*24)
				.and()
				.withClient("mobile")
				.secret(encoder.encode("m0b1le0"))
				.scopes("read")
				.authorizedGrantTypes("password","refresh_token")
				.accessTokenValiditySeconds(1800)
				.refreshTokenValiditySeconds(3600*24);
	}

	@Override
	public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
		endpoints.tokenStore(tokenStore())
			.accessTokenConverter(accessTokenConverter())
			.reuseRefreshTokens(false)
			.userDetailsService(userDetailsService)
			.authenticationManager(authenticationManager);// valida se esta tudo certo com o usuario e senha
	}

	@Bean
	public JwtAccessTokenConverter accessTokenConverter() {
		JwtAccessTokenConverter accessTokenConverter = new JwtAccessTokenConverter();
		accessTokenConverter.setSigningKey("algaworks");//VERIFY SIGNATURE
		return accessTokenConverter;
	}

	@Bean
	public TokenStore tokenStore() {
		return new JwtTokenStore(accessTokenConverter());
	}

}
