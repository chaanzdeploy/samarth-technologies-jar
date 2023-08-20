import React from "react";
import Popup from "../Popup";
import StepIcon from "../StepIcon";
import PropTypes from "prop-types";
import { useForm } from "../useForm";
import ButtonX from "../forms/ButtonX";
import { useSnackbar } from "notistack";
import Step from "@material-ui/core/Step";
import { useHistory } from "react-router";
import JobSheetForm from "./JobSheetForm";
import SelectCustomer from "./SelectCustomer";
import SendIcon from "@material-ui/icons/Send";
import Stepper from "@material-ui/core/Stepper";
import jobSheetApis from "../../apis/jobSheetApis";
import CustomerForm from "../Customer/CustomerForm";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import JobSheetConfirmation from "./JobSheetConfirmation";
import StepConnector from "@material-ui/core/StepConnector";
import { CustomerContext } from "../../context/CustomerContext";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  JOBSHEET_FORM_STEPS,
  DEFAULT_CUSTOMER_FORM_VALUES,
} from "../../utils/data";

const Connector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  active: {
    "& $line": {
      borderColor: "#784af4",
    },
  },
  completed: {
    "& $line": {
      borderColor: "#784af4",
    },
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

StepIcon.propTypes = {
  // Whether this step is active.
  active: PropTypes.bool,
  // Mark the step as completed. Is passed to child components.
  completed: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& .MuiStepper-root": {
      padding: theme.spacing(1),
    },
    "& .MuiStepLabel-label.MuiStepLabel-alternativeLabel": {
      marginTop: theme.spacing(0.5),
    },
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default function MultiStepJobSheet(props) {
  const classes = useStyles();
  const history = useHistory();
  const steps = JOBSHEET_FORM_STEPS;
  const { enqueueSnackbar } = useSnackbar();

  const { newCustomer, jobSheet } = props;

  // State & Context Variables
  const [activeStep, setActiveStep] = React.useState(0);
  const [openCustomerPopup, setOpenCustomerPopup] = React.useState(false);
  const [selectedCustomer, setSelectedCustomer] =
    React.useContext(CustomerContext);

  const validateForm = () => {};

  // Form Management
  const { values, errors, setErrors, handleInputChange, resetForm } = useForm(
    { ...jobSheet },
    true,
    validateForm
  );

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleNewCustomerSelect = () => {
    setSelectedCustomer(newCustomer);
    setOpenCustomerPopup(true);
    // handleNext();
  };

  const removeFromReceivedItems = (itemIndex) => {
    values.receivedItems.splice(itemIndex, 1);
    if (itemIndex > -1) {
      const e = {
        target: {
          name: "receivedItems",
          value: [...values.receivedItems],
        },
      };
      handleInputChange(e);
    }
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <SelectCustomer handleNext={handleNext} />;
      case 1:
        return (
          <JobSheetForm
            // customer={selectedCustomer}
            form={{ values, handleInputChange, errors, setErrors, resetForm }}
            removeFromReceivedItems={removeFromReceivedItems}
          />
        );
      case 2:
        return (
          <JobSheetConfirmation customer={selectedCustomer} jobSheet={values} />
        );
      default:
        return "Unknown step";
    }
  }

  const constructJobSheetPayload = (customerId, jobSheet) => {
    return {
      ...jobSheet,
      // Converting the date string to epoch milliseconds
      expectedDeliveryDate: Date.parse(jobSheet.expectedDeliveryDate),
      customerId: customerId,
    };
  };

  const submitJobSheetForm = async () => {
    console.log("Submitting JobSheet Form");

    // Check for the customer ID and update job sheet accordingly
    if (selectedCustomer.customerId === null || selectedCustomer.customerId === undefined) {
      console.error(`Customer ID for the job sheet not present`);
      enqueueSnackbar("Customer ID for job sheet not present", {
        variant: "error",
      });
    } else {
      // API call to save job sheet to DB
      try {
        const serviceJobSheet = constructJobSheetPayload(
          selectedCustomer.customerId,
          values
        );
        const { jobSheetId } = await jobSheetApis.createNewJobSheet(serviceJobSheet);
        enqueueSnackbar(`JobSheet with Id ${jobSheetId} successfully created`, {
          variant: "success",
        });
        history.push("/services");
      } catch (err) {
        console.log(err);
        enqueueSnackbar("Error creating JobSheet", { variant: "error" });
      }
    }
  };

  return (
    <>
      <div className={classes.root}>
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<Connector />}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={StepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&apos;re finished
              </Typography>
              <ButtonX text="Reset" onClick={handleReset} />
            </div>
          ) : (
            <div>
              <div className={classes.instructions}>
                {getStepContent(activeStep)}
              </div>
              <div>
                <ButtonX
                  text="Back"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  color="default"
                ></ButtonX>
                <ButtonX
                  text={
                    activeStep === steps.length - 1
                      ? "Finish"
                      : activeStep === 0
                      ? "Continue with New Customer"
                      : "Next"
                  }
                  onClick={
                    activeStep === steps.length - 1
                      ? submitJobSheetForm
                      : activeStep === 0
                      ? handleNewCustomerSelect
                      : handleNext
                  }
                  endIcon={<SendIcon />}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <Popup
        openPopup={openCustomerPopup}
        setOpenPopup={setOpenCustomerPopup}
        title="Customer Form"
      >
        <CustomerForm
          update={false}
          setOpenPopup={setOpenCustomerPopup}
          fetchUpdatedCustomers={handleNext}
          customer={DEFAULT_CUSTOMER_FORM_VALUES}
        />
      </Popup>
    </>
  );
}

/*
  const validateForm = (fieldValues = values) => {
    let inputErrors = { ...errors };
    if (JOB_SHEET_FIELDS.serviceType in fieldValues)
      inputErrors.serviceType = fieldValues.serviceType
        ? ""
        : "This field is required";

    if (JOB_SHEET_FIELDS.type in fieldValues)
      inputErrors.type = fieldValues.type
        ? ""
        : "This field is required";

    if (JOB_SHEET_FIELDS.mobileNumber in fieldValues)
      inputErrors.mobileNumber = fieldValues.mobileNumber
        ? MOBILE_NUMBER_REGEX.test(fieldValues.mobileNumber)
          ? ""
          : "Mobile Number should be 10 Digits"
        : "This field is required";

    if (JOB_SHEET_FIELDS.emailId in fieldValues)
      inputErrors.emailId = fieldValues.emailId
        ? EMAIL_REGEX.test(fieldValues.emailId)
          ? ""
          : "Please enter a valid email id"
        : "This field is required";

    setErrors({ ...inputErrors });
    if (fieldValues === values)
      return Object.values(inputErrors).every((ele) => ele === "");
  };

*/
