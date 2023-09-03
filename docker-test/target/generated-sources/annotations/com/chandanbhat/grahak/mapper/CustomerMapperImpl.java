package com.chandanbhat.grahak.mapper;

import com.chandanbhat.grahak.model.entity.Customer;
import com.chandanbhat.grahak.model.request.CreateCustomerRequest;
import com.chandanbhat.grahak.model.response.CustomerResponse;
import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-09-04T00:21:28+0530",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 11.0.15 (Amazon.com Inc.)"
)
public class CustomerMapperImpl implements CustomerMapper {

    @Override
    public Customer mapRequestToEntity(CreateCustomerRequest customerRequest) {
        if ( customerRequest == null ) {
            return null;
        }

        Customer.CustomerBuilder customer = Customer.builder();

        customer.name( customerRequest.getName() );
        customer.age( customerRequest.getAge() );
        customer.gender( customerRequest.getGender() );
        customer.mobile( customerRequest.getMobile() );

        return customer.build();
    }

    @Override
    public CustomerResponse mapEntityToResponse(Customer customer) {
        if ( customer == null ) {
            return null;
        }

        CustomerResponse.CustomerResponseBuilder customerResponse = CustomerResponse.builder();

        customerResponse.id( customer.getId() );
        customerResponse.name( customer.getName() );
        customerResponse.age( customer.getAge() );
        customerResponse.gender( customer.getGender() );
        customerResponse.mobile( customer.getMobile() );

        return customerResponse.build();
    }
}
