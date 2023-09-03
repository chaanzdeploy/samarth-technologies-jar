package com.chandanbhat.grahak.model.request;

import com.chandanbhat.grahak.constant.enums.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateCustomerRequest {

  @NotBlank(message = "Name cannot be blank")
  private String name;

  @NotNull(message = "Age cannot be null")
  @Positive(message = "Age should be a positive value")
  private Integer age;

  @NotNull(message = "Gender cannot be null or invalid")
  private Gender gender;

  @NotBlank(message = "Mobile Number cannot be blank")
  private String mobile;
}
