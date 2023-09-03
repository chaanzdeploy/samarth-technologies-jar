package com.chandanbhat.grahak.service.impl;

import com.chandanbhat.grahak.exception.BadRequestException;
import com.chandanbhat.grahak.mapper.CustomerMapper;
import com.chandanbhat.grahak.model.entity.Customer;
import com.chandanbhat.grahak.model.request.CreateCustomerRequest;
import com.chandanbhat.grahak.model.response.CustomerResponse;
import com.chandanbhat.grahak.repository.CustomerRepository;
import com.chandanbhat.grahak.service.CustomerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

  private static final String LAYER_PREFIX = "Service";

  private final CustomerRepository customerRepository;

  @Override
  public CustomerResponse createCustomer(CreateCustomerRequest createCustomerRequest) {
    log.debug(
        "{} | Received request to create customer with createCustomerRequest: {}",
        LAYER_PREFIX,
        createCustomerRequest);

    Customer customer = CustomerMapper.INSTANCE.mapRequestToEntity(createCustomerRequest);

    Customer updatedCustomer = customerRepository.saveCustomer(customer);
    log.debug("{} | Customer created successfully: {}", LAYER_PREFIX, updatedCustomer);

    return CustomerMapper.INSTANCE.mapEntityToResponse(updatedCustomer);
  }

  @Override
  public CustomerResponse getCustomer(String customerId) {
    log.debug(
        "{} | Received request to get customer with customerId: {}", LAYER_PREFIX, customerId);

    Optional<Customer> customer = customerRepository.getCustomer(customerId);
    if (customer.isEmpty()) {
      log.error("Customer with id {} not found", customerId);
      throw new BadRequestException(String.format("Customer %s not found", customerId));
    }
    log.debug("{} | Customer fetched successfully: {}", LAYER_PREFIX, customer);

    return CustomerMapper.INSTANCE.mapEntityToResponse(customer.get());
  }

  @Override
  public Boolean deleteCustomer(String customerId) {
    log.debug(
        "{} | Received request to delete customer with customerId: {}", LAYER_PREFIX, customerId);

    Boolean customerDeleted = customerRepository.deleteCustomer(customerId);
    log.debug("{} | Customer {} deleted: {}", LAYER_PREFIX, customerId, customerDeleted);
    return customerDeleted;
  }
}
