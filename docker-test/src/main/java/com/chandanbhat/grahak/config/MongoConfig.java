package com.chandanbhat.grahak.config;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;
import org.springframework.data.mongodb.core.MongoTemplate;

@Slf4j
@Configuration
public class MongoConfig extends AbstractMongoClientConfiguration {

  @Override
  protected String getDatabaseName() {
    return "grahak";
  }

  @Bean
  @Override
  public MongoClient mongoClient() {
    String mongoURI =
        "mongodb+srv://grahak-service:gr%40%23%40k@cluster0.kgcogwl.mongodb.net/?retryWrites=true&w=majority";
    log.info("Initializing MongoClient Bean with MongoDB URI: {}", mongoURI);
    return MongoClients.create(mongoURI);
  }

  @Bean
  public MongoTemplate mongoTemplate() {
    String databaseName = getDatabaseName();
    log.info("Initializing MongoTemplate Bean with Database name: {}", databaseName);
    return new MongoTemplate(mongoClient(), databaseName);
  }

  @Override
  public boolean autoIndexCreation() {
    return true;
  }
}
