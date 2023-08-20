import React from "react";
import PageHeader from "../components/PageHeader";
import DashboardIcon from "@material-ui/icons/Dashboard";

const DashboardPage = () => {
  return (
    <>
      <PageHeader title="Dashboard" icon={<DashboardIcon />} />
      <p>Dashboard page</p>
    </>
  );
};

export default DashboardPage;
