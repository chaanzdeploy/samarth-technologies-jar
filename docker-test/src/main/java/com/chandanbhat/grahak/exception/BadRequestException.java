package com.chandanbhat.grahak.exception;

public class BadRequestException extends RuntimeException {

  public BadRequestException(String message, Throwable err) {
    super(message, err);
  }

  public BadRequestException(String message) {
    super(message);
  }
}
