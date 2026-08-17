package com.ashutoshupadhyay.advocate.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    public static final String SECURITY_SCHEME_NAME =
            "bearerAuth";

    @Bean
    public OpenAPI advocateOpenAPI() {

        return new OpenAPI()
                .info(
                        new Info()
                                .title(
                                        "Ashutosh Upadhyay Advocate API"
                                )
                                .description(
                                        "REST API for the Ashutosh Upadhyay Advocate website"
                                )
                                .version("v1")
                                .contact(
                                        new Contact()
                                                .name(
                                                        "Ashutosh Upadhyay Advocate"
                                                )
                                )
                )
                .components(
                        new Components()
                                .addSecuritySchemes(
                                        SECURITY_SCHEME_NAME,
                                        new SecurityScheme()
                                                .type(
                                                        SecurityScheme.Type.HTTP
                                                )
                                                .scheme("bearer")
                                                .bearerFormat("JWT")
                                )
                );
    }
}