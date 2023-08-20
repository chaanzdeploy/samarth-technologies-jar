import React from "react";
import ButtonX from "../forms/ButtonX";
import SelectX from "../forms/SelectX";
import { useSnackbar } from "notistack";
import Grid from "@material-ui/core/Grid";
import { Form, useForm } from "../useForm";
import TextFieldX from "../forms/TextFieldX";
import { GENDER_VALUES } from "../../utils/data";
import customerAPIs from "../../apis/customerApis";
import { CustomerContext } from "../../context/CustomerContext";
import {
  CUSTOMER_FIELDS,
  EMAIL_REGEX,
  MOBILE_NUMBER_REGEX,
  NAME_REGEX,
} from "../../utils/constants";

const CustomerForm = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { customer, update, setOpenPopup, fetchUpdatedCustomers } = props;

  const [selectedCustomer, setSelectedCustomer] =
    React.useContext(CustomerContext);

  const validateForm = (fieldValues = values) => {

    let inputErrors = { ...errors };
    if (CUSTOMER_FIELDS.fullName in fieldValues) {
      inputErrors.fullName = fieldValues.fullName
        ? NAME_REGEX.test(fieldValues.fullName)
          ? ""
          : "Invalid characters present in Name"
        : "This field is required";
    }


    if (CUSTOMER_FIELDS.mobileNumber in fieldValues) {
      inputErrors.mobileNumber = fieldValues.mobileNumber
        ? MOBILE_NUMBER_REGEX.test(fieldValues.mobileNumber)
          ? ""
          : "Mobile Number should be 10 Digits"
        : "This field is required";
    }

    if (CUSTOMER_FIELDS.emailId in fieldValues) {
      inputErrors.emailId = (fieldValues.emailId && fieldValues.emailId.length)
        ? EMAIL_REGEX.test(fieldValues.emailId)
          ? ""
          : "Please enter a valid email id"
        : "";
    }

    if (CUSTOMER_FIELDS.gender in fieldValues) {
      inputErrors.gender = (fieldValues.gender) ? "" : "Select gender"
    }

    setErrors({ ...inputErrors });
    if (fieldValues === values)
      return Object.values(inputErrors).every((ele) => ele === "");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        if (!update) {
          // Making API call to add new user
          const customer = await customerAPIs.creatNewCustomer(values);
          setSelectedCustomer({
            ...customer,
          });
        } else {
          // API call to update an existing user
          const { customerId, ...payload } = values;
          await customerAPIs.updateCustomer(customerId, payload);
        }
      } catch (err) {
        enqueueSnackbar("Failed to add the Customer, Please try again", {
          variant: "error",
        });
        enqueueSnackbar(err.message, {
          variant: "error",
        });
      }
      resetForm();
      setOpenPopup(false);
      fetchUpdatedCustomers();
    } else {
      enqueueSnackbar("Form validation failed", {
        variant: "error",
      });
    }
  };

  const { values, errors, setErrors, handleInputChange, resetForm } = useForm(
    customer,
    true,
    validateForm
  );

  return (
    <Form onSubmit={handleFormSubmit}>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={8} sm={9} md={10}>
          <TextFieldX
            name="fullName"
            label="Full Name"
            value={values.fullName}
            onChange={handleInputChange}
            error={errors.fullName}
          />
        </Grid>
        <Grid item xs={4} sm={3} md={2}>
          <SelectX
            size="medium"
            name="gender"
            label="Gender"
            options={GENDER_VALUES}
            value={values.gender}
            onChange={handleInputChange}
            error={errors.gender}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <TextFieldX
            name="mobileNumber"
            label="Mobile No"
            value={values.mobileNumber}
            onChange={handleInputChange}
            error={errors.mobileNumber}
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <TextFieldX
            name="emailId"
            label="Email Id"
            value={values.emailId}
            onChange={handleInputChange}
            error={errors.emailId}
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldX
            name="address"
            label="Address"
            value={values.address}
            onChange={handleInputChange}
            isMultiLine={true}
          />
        </Grid>
        <Grid item>
          <ButtonX text="Reset" color="default" onClick={resetForm} />
        </Grid>
        <Grid item>
          <ButtonX type="submit" text="Submit" />
        </Grid>
      </Grid>
    </Form>
  );
};

export default CustomerForm;
