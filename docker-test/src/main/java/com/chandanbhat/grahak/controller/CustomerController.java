package com.chandanbhat.grahak.controller;

import com.chandanbhat.grahak.model.request.CreateCustomerRequest;
import com.chandanbhat.grahak.model.response.ApiResponse;
import com.chandanbhat.grahak.model.response.CustomerResponse;
import com.chandanbhat.grahak.service.CustomerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
public class CustomerController {

  private static final String LAYER_PREFIX = "Controller";
  private static final String CREATE_CUSTOMER_API_IDENTIFIER = "api.customer.create";
  private static final String GET_CUSTOMER_API_IDENTIFIER = "api.customer.get";
  private static final String DELETE_CUSTOMER_API_IDENTIFIER = "api.customer.delete";

  private final CustomerService customerService;

  @PostMapping("/api/v1/customers")
  public ResponseEntity<ApiResponse<CustomerResponse>> createCustomer(
      @RequestBody @Valid @NotNull(message = "CreateCustomerRequest cannot be null")
          CreateCustomerRequest createCustomerRequest) {

    log.info(
        "{} | Received {} request with createCustomerRequest: {}",
        LAYER_PREFIX,
        CREATE_CUSTOMER_API_IDENTIFIER,
        createCustomerRequest);

    CustomerResponse createCustomerResponse = customerService.createCustomer(createCustomerRequest);
    ApiResponse<CustomerResponse> apiResponse =
        ApiResponse.<CustomerResponse>builder()
            .statusCode(HttpStatus.CREATED.value())
            .message(String.format("Customer %s created", createCustomerResponse.getId()))
            .payload(createCustomerResponse)
            .build();
    return ResponseEntity.status(HttpStatus.CREATED).body(apiResponse);
  }

  @GetMapping("/api/v1/customers/{customerId}")
  public ResponseEntity<ApiResponse<CustomerResponse>> getCustomer(
      @PathVariable("customerId") @NotBlank(message = "CustomerId cannot be blank")
          String customerId) {

    log.info(
        "{} | Received {} request with customerId: {}",
        LAYER_PREFIX,
        GET_CUSTOMER_API_IDENTIFIER,
        customerId);

    CustomerResponse customerResponse = customerService.getCustomer(customerId);
    ApiResponse<CustomerResponse> apiResponse =
        ApiResponse.<CustomerResponse>builder()
            .statusCode(HttpStatus.OK.value())
            .payload(customerResponse)
            .message(String.format("Customer %s fetched successfully", customerId))
            .build();
    return ResponseEntity.ok(apiResponse);
  }

  @DeleteMapping("/api/v1/customers/{customerId}")
  public ResponseEntity<ApiResponse<Boolean>> deleteCustomer(
      @PathVariable("customerId") @NotBlank(message = "CustomerId cannot be blank")
          String customerId) {

    log.info(
        "{} | Received {} request with customerId: {}",
        LAYER_PREFIX,
        DELETE_CUSTOMER_API_IDENTIFIER,
        customerId);

    Boolean customerDeleted = customerService.deleteCustomer(customerId);
    ApiResponse<Boolean> apiResponse =
        ApiResponse.<Boolean>builder()
            .statusCode(HttpStatus.OK.value())
            .message(String.format("Customer %s deleted: %s", customerId, customerDeleted))
            .payload(customerDeleted)
            .build();
    return ResponseEntity.ok(apiResponse);
  }
}
