import React from "react";
import PageHeader from "../components/PageHeader";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ListCustomers from "../components/Customer/ListCustomers";
import PeopleOutlineTwoTone from "@material-ui/icons/PeopleOutlineTwoTone";

const CustomersPage = (props) => {
  const { path } = useRouteMatch();

  return (
    <>
      <PageHeader title="Customers" icon={<PeopleOutlineTwoTone />} />

      <Switch>
        <Route exact path={`${path}`}>
          <ListCustomers />
        </Route>
        {/* <Route path={`${path}/create`}>
          <CustomerForm />
        </Route> */}
      </Switch>
    </>
  );
};

export default CustomersPage;
