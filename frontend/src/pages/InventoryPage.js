import React from "react";
import PageHeader from "../components/PageHeader";
import LayersIcon from "@material-ui/icons/Layers";

const InventoryPage = () => {
  return (
    <>
      <PageHeader title="Inventory" icon={<LayersIcon />} />
      <p>Inventory page</p>
    </>
  );
};

export default InventoryPage;
