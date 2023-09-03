package com.chandanbhat.grahak.model.entity;

import com.chandanbhat.grahak.constant.enums.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.FieldType;
import org.springframework.data.mongodb.core.mapping.MongoId;

import static com.chandanbhat.grahak.constant.Constant.CUSTOMER_COLLECTION_NAME;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(CUSTOMER_COLLECTION_NAME)
public class Customer {

  @MongoId(value = FieldType.OBJECT_ID)
  private String id;

  private String name;

  private Integer age;

  private Gender gender;

  private String mobile;
}
