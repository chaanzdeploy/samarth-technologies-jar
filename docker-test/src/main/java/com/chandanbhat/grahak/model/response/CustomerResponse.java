package com.chandanbhat.grahak.model.response;

import com.chandanbhat.grahak.constant.enums.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomerResponse {

  private String id;

  private String name;

  private Integer age;

  private Gender gender;

  private String mobile;
}
