import React from "react";

export const CustomerContext = React.createContext();

const defaultCustomer = {
  customerId: "",
  gender: "",
  address: "",
  emailId: "",
  fullName: "",
  mobileNumber: "",
};

export const CustomerProvider = (props) => {
  const [selectedCustomer, setSelectedCustomer] =
    React.useState(defaultCustomer);

  return (
    <CustomerContext.Provider value={[selectedCustomer, setSelectedCustomer]}>
      {props.children}
    </CustomerContext.Provider>
  );
};
