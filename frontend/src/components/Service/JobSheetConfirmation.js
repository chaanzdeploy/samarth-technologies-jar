import React from "react";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import Divider from "@material-ui/core/Divider";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { makeStyles } from "@material-ui/core/styles";
import { BLACK, LIGHT_BLUE } from "../../utils/colors";
import TableContainer from "@material-ui/core/TableContainer";

const useStyles = makeStyles((theme) => ({
  cardHeading: {
    textAlign: "center",
    marginBottom: theme.spacing(2),
  },
  tableHeader: {
    "& .MuiTableCell-head": {
      color: BLACK,
      backgroundColor: LIGHT_BLUE,
    },
  },
  table: {
    borderColor: LIGHT_BLUE,
    borderStyle: "solid",
    borderWidth: "1px",
  },
  headerCell: {
    textAlign: "center",
  },
}));

const JobSheetConfirmation = (props) => {
  const classes = useStyles();
  const { customer, jobSheet } = props;

  return (
    <Grid
      container
      direction="row"
      spacing={2}
      // alignItems="flex-start"
      justifyContent="flex-start"
    >
      <Grid container direction="column" item md={6} xs={12} spacing={1}>
        <Grid item>
          <TableContainer className={classes.table}>
            <Table>
              <TableHead className={classes.tableHeader}>
                <TableRow>
                  <TableCell colSpan={2} className={classes.headerCell}>
                    Customer Details
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Customer ID</TableCell>
                  <TableCell>{customer.customerId}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Full Name</TableCell>
                  <TableCell>{customer.fullName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Email ID</TableCell>
                  <TableCell>{customer.emailId}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Mobile Number</TableCell>
                  <TableCell>{customer.mobileNumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Gender</TableCell>
                  <TableCell>{customer.gender}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Address</TableCell>
                  <TableCell>{customer.address}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item>
          <TableContainer className={classes.table}>
            <Table>
              <TableHead className={classes.tableHeader}>
                <TableRow>
                  <TableCell colSpan={2} className={classes.headerCell}>
                    Received Items
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobSheet.receivedItems.map(({ name, referenceNumber }) => (
                  <TableRow>
                    <TableCell>{name}</TableCell>
                    <TableCell>{referenceNumber}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <TableContainer className={classes.table}>
          <Table>
            <TableHead className={classes.tableHeader}>
              <TableRow>
                <TableCell colSpan={2} className={classes.headerCell}>
                  Service Details
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Service Type</TableCell>
                <TableCell>{jobSheet.serviceType}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Product Type</TableCell>
                <TableCell>{jobSheet.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{jobSheet.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Model Name</TableCell>
                <TableCell>{jobSheet.modelName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Color</TableCell>
                <TableCell>{jobSheet.color}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Product Configuration</TableCell>
                <TableCell>{jobSheet.configuration}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>IMEI Number</TableCell>
                <TableCell>{jobSheet.imei1}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>{jobSheet.imei2}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Warranty</TableCell>
                <TableCell>
                  {jobSheet.warrantyStatus}{" "}
                  {jobSheet.warrantyReference ? jobSheet.warrantyReference : ""}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Problems Reported</TableCell>
                <TableCell>{jobSheet.problemsReported}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Product Condition</TableCell>
                <TableCell>{jobSheet.condition}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Estimated Cost</TableCell>
                <TableCell>{jobSheet.estimatedCost}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Advance Paid</TableCell>
                <TableCell>{jobSheet.advancePaid}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Operator Assigned</TableCell>
                <TableCell>{jobSheet.assignedOperator}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Remarks</TableCell>
                <TableCell>{jobSheet.remarks}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Expected Delivery Date</TableCell>
                <TableCell>{jobSheet.expectedDeliveryDate}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Notify Customer</TableCell>
                <TableCell>{`${jobSheet.notifyCustomer}`}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Divider />
    </Grid>
  );
};

export default JobSheetConfirmation;
