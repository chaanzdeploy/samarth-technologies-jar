package com.chandanbhat.grahak.model.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {

  private Integer statusCode;

  private String message;

  private T payload;

  @Builder.Default private Long timestamp = Instant.now().toEpochMilli();
}
