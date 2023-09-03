package com.chandanbhat.grahak.service;

import com.chandanbhat.grahak.model.request.CreateCustomerRequest;
import com.chandanbhat.grahak.model.response.CustomerResponse;

public interface CustomerService {

  CustomerResponse createCustomer(CreateCustomerRequest createCustomerRequest);

  CustomerResponse getCustomer(String customerId);

  Boolean deleteCustomer(String customerId);
}
