package com.chandanbhat.grahak.exception;

public class InternalServerErrorException extends RuntimeException {

  public InternalServerErrorException(String message, Throwable err) {
    super(message, err);
  }
}
