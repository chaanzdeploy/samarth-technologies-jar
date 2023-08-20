import React from "react";
import { useSnackbar } from "notistack";
import Paper from "@material-ui/core/Paper";
import { useParams } from "react-router-dom";
import jobSheetApis from "../../apis/jobSheetApis";
import ViewJobSheet from "./ViewJobSheet";

// Move to constants and reuse even in service page
const JOB_SHEET_DEFAULT_VALUES = {
    serviceType: "",
    product: {
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
    },
    
    receivedItems: [],
    estimatedCost: "",
    advancePaid: "",
    expectedDeliveryDate: new Date().toISOString().split("T")[0],
    assignedOperator: "",
    remarks: "",
    notifyCustomer: true,
  };

const LoadServiceJobSheet = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { jobSheetId } = useParams();

  const [loading, setLoading] = React.useState(true);
  const [serviceJobSheet, setServiceJobSheet] = React.useState(JOB_SHEET_DEFAULT_VALUES);


  React.useEffect(() => {
    async function getServiceJobSheet() {
        setLoading(true);
        try {
            const serviceJobSheet = await jobSheetApis.getServiceJobSheet(jobSheetId);
            setServiceJobSheet(serviceJobSheet);
        } catch (err) {
            enqueueSnackbar(`Error fetching service jobsheet with id ${jobSheetId}`, { variant: "error" });
        }
        setLoading(false);
    }
    getServiceJobSheet();
  }, []);


  return (
    <Paper>
        <ViewJobSheet jobSheet={serviceJobSheet} />
    </Paper>
  );
};

export default LoadServiceJobSheet;
