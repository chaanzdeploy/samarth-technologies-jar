import React from "react";
import PageHeader from "../components/PageHeader";
import LaptopMac from "@material-ui/icons/LaptopMac";
import ListServices from "../components/Service/ListServices";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import MultiStepJobSheet from "../components/Service/MultiStepJobSheet";
import { CustomerProvider } from "../context/CustomerContext";
import LoadServiceJobSheet from "../components/Service/LoadServiceJobSheet";

const JOB_SHEET_DEFAULT_VALUES = {
  serviceType: "",
  type: null,
  brand: null,
  modelName: null,
  color: null,
  configuration: "",
  imei1: "",
  imei2: "",
  warrantyStatus: "",
  warrantyReference: "",
  problemsReported: "",
  condition: "",
  receivedItems: [],
  estimatedCost: "",
  advancePaid: "",
  expectedDeliveryDate: new Date().toISOString().split("T")[0],
  assignedOperator: "",
  remarks: "",
  notifyCustomer: true,
};

const CUSTOMER_DEFAULT_VALUES = {
  customerId: "",
  fullName: "",
  mobileNumber: "",
  emailId: "",
  gender: "",
  address: "",
};

const ServicesPage = () => {
  const { path } = useRouteMatch();

  return (
    <>
      <PageHeader title="Services" icon={<LaptopMac />} />
      <Switch>
        <Route exact path={`${path}`}>
          <ListServices />
        </Route>
    
        <Route exact path={`${path}/jobsheet`}>
          <CustomerProvider>
            <MultiStepJobSheet
              newCustomer={CUSTOMER_DEFAULT_VALUES}
              jobSheet={JOB_SHEET_DEFAULT_VALUES}
            />
          </CustomerProvider>
        </Route>

        <Route exact path={`${path}/jobsheet/:jobSheetId/`}>
          <LoadServiceJobSheet/>
        </Route>
        
        {/* <Route path={`${path}/download`}>
          <Download></Download>
        </Route> */}
      </Switch>
    </>
  );
};

export default ServicesPage;
