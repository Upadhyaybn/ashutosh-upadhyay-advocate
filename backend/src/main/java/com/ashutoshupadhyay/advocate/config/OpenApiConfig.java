package com.ashutoshupadhyay.advocate.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI advocateOpenAPI() {

        return new OpenAPI()
                .info(new Info()
                        .title("Ashutosh Upadhyay Advocate API")
                        .description(
                                "REST API for the Ashutosh Upadhyay Advocate website"
                        )
                        .version("v1")
                        .contact(new Contact()
                                .name("Ashutosh Upadhyay Advocate")
                        )
                );
    }
}