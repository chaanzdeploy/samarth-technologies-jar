package com.chandanbhat.grahak.repository.impl;

import com.chandanbhat.grahak.condition.DboxDisabledCondition;
import com.chandanbhat.grahak.exception.BadRequestException;
import com.chandanbhat.grahak.exception.InternalServerErrorException;
import com.chandanbhat.grahak.model.entity.Customer;
import com.chandanbhat.grahak.repository.CustomerRepository;
import com.mongodb.DuplicateKeyException;
import com.mongodb.client.result.DeleteResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Conditional;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import static com.chandanbhat.grahak.constant.Constant.CUSTOMER_COLLECTION_NAME;

@Slf4j
@Repository
@RequiredArgsConstructor
@Conditional(DboxDisabledCondition.class)
public class CustomerMongoRepository implements CustomerRepository {

  private final MongoTemplate mongoTemplate;

  @Override
  public Customer saveCustomer(Customer customer) {
    log.info("{} | Received request to save customer to db: {}", LAYER_PREFIX, customer);

    try {
      return mongoTemplate.save(customer, CUSTOMER_COLLECTION_NAME);
    } catch (DuplicateKeyException e) {
      log.error(
          "{} | Customer with id {} already exists in the DB", LAYER_PREFIX, customer.getId(), e);
      throw new BadRequestException(
          String.format("Customer %s already exists", customer.getId()), e);
    } catch (Exception e) {
      log.error(
          "{} | Unknown exception while saving customer {} to DB",
          LAYER_PREFIX,
          customer.getId(),
          e);
      throw new InternalServerErrorException("Unknown Exception", e);
    }
  }

  @Override
  public Optional<Customer> getCustomer(String customerId) {
    log.info("{} | Received request to get customer {} from DB", LAYER_PREFIX, customerId);

    try {
      Customer customer =
          mongoTemplate.findById(customerId, Customer.class, CUSTOMER_COLLECTION_NAME);
      return Optional.ofNullable(customer);
    } catch (Exception e) {
      log.error(
          "{} | Unknown exception while fetching customer {} from DB", LAYER_PREFIX, customerId, e);
      throw new InternalServerErrorException("Unknown Exception", e);
    }
  }

  @Override
  public Boolean deleteCustomer(String customerId) {
    log.info("{} | Received request to delete customer {} from DB", LAYER_PREFIX, customerId);

    Query query = Query.query(Criteria.where("_id").is(customerId));

    try {
      DeleteResult deleteResult =
          mongoTemplate.remove(query, Customer.class, CUSTOMER_COLLECTION_NAME);
      if (deleteResult.getDeletedCount() == 0) {
        log.error(
            "{} | Delete count is 0. Delete customer {} request failed", LAYER_PREFIX, customerId);
        return false;
      } else {
        return true;
      }
    } catch (Exception e) {
      log.error(
          "{} | Unknown exception while deleting customer {} from DB", LAYER_PREFIX, customerId);
      throw new InternalServerErrorException("Unknown Exception", e);
    }
  }
}
