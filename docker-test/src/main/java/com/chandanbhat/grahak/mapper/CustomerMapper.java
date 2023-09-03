package com.chandanbhat.grahak.mapper;

import com.chandanbhat.grahak.model.entity.Customer;
import com.chandanbhat.grahak.model.request.CreateCustomerRequest;
import com.chandanbhat.grahak.model.response.CustomerResponse;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CustomerMapper {

  CustomerMapper INSTANCE = Mappers.getMapper(CustomerMapper.class);

  Customer mapRequestToEntity(CreateCustomerRequest customerRequest);

  CustomerResponse mapEntityToResponse(Customer customer);
}
