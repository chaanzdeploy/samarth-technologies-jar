package com.chandanbhat.grahak.constant.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public enum Gender {
  M("Male"),
  F("Female"),
  O("Other");

  @Getter private final String description;
}
