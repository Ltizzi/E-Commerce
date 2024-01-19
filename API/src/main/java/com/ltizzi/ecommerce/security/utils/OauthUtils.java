package com.ltizzi.ecommerce.security.utils;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

/**
 * @author Leonardo Terlizzi
 */

@Component
public class OauthUtils {

    private final String OAUTH_CLIENT = System.getenv("OAUTH_CLIENT_ID");
    private final String OAUTH_SECRET = System.getenv("OAUTH_SECRET");

    @Autowired
    private OAuth2AuthorizedClientService authorizedClientService;

    public Map<String, Object> verifyTokenWithGoogle(String code) {
        String tokenEndpoint = "https://www.googleapis.com/oauth2/v4/token";
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", code);
        params.add("client_id", OAUTH_CLIENT);
        params.add("client_secret", OAUTH_SECRET);
        params.add("redirect_uri", "http://localhost:8080/auth/success");
        params.add("grant_type", "authorization_code");
        ResponseEntity<Map> response = restTemplate().postForEntity(tokenEndpoint, params, Map.class);
        return response.getBody();
    }


    public Map<String, Object> getUserInfoFromGoogle(Map<String, Object> tokens) {
        String userInfoEndpoint = "https://www.googleapis.com/oauth2/v3/userinfo";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + tokens.get("access_token"));
        HttpEntity<?> entity = new HttpEntity<>(headers);
        ResponseEntity<Map> userInfoResponse = restTemplate().exchange(userInfoEndpoint, HttpMethod.GET, entity, Map.class);
        return userInfoResponse.getBody();
    }

    public OAuth2AuthorizedClient getClient(OAuth2AuthenticationToken authenticationToken) {
        OAuth2AuthorizedClient client = authorizedClientService.loadAuthorizedClient(authenticationToken.getAuthorizedClientRegistrationId(),
                authenticationToken.getName());
        return client;
    }

    public String getUserInfoEndpointUri(OAuth2AuthorizedClient client) {
        return client.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUri();
    }

    public Map<String, Object> oauthHandler(String userInfoEndpointUri, OAuth2AuthorizedClient client) {
        RestTemplate restTemplate = restTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.AUTHORIZATION, "Bearer " + client.getAccessToken().getTokenValue());
        HttpEntity entity = new HttpEntity("", headers);
        ResponseEntity<Map> response = restTemplate.exchange(userInfoEndpointUri, HttpMethod.GET, entity, Map.class);
        return response.getBody();

    }


    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
