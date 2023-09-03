package com.chandanbhat.grahak.condition;

import org.springframework.context.annotation.Condition;
import org.springframework.context.annotation.ConditionContext;
import org.springframework.core.type.AnnotatedTypeMetadata;

public class DboxEnabledCondition implements Condition {

  @Override
  public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
    String dboxEnabled = context.getEnvironment().getProperty("dbox.enabled");

    return Boolean.parseBoolean(dboxEnabled);
  }
}
