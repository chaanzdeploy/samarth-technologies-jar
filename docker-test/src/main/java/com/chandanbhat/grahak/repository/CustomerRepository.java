package com.chandanbhat.grahak.repository;

import com.chandanbhat.grahak.model.entity.Customer;

import java.util.Optional;

public interface CustomerRepository {

  String LAYER_PREFIX = "Repository";

  Customer saveCustomer(Customer customer);

  Optional<Customer> getCustomer(String customerId);

  Boolean deleteCustomer(String customerId);
}
