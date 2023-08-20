import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TextFieldX from "../forms/TextFieldX";
import Divider from "@material-ui/core/Divider";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TableContainer from "@material-ui/core/TableContainer";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { BLACK, LIGHT_BLUE } from "../../utils/colors";

const useStyles = makeStyles((theme) => ({
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
  formContent: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    padding: theme.spacing(2),
  },
  formTitle: {
    fontWeight: 600,
  },
}));


const ViewJobSheet = (props) => {
  const classes = useStyles();
  const { jobSheet } = props;

  return (
    <Paper>
      <Grid
        className={classes.formContent}
        container
        spacing={2}
        justifyContent="center"
        // alignItems="stretch" // revisit this property
        direction="column"
      >
        <Grid container item spacing={2} xs={12}>
          <Grid item xs={12}>
            <Typography className={classes.formTitle} variant="h6" align="center">
              View JobSheet
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>

        <Grid container item spacing={2} xs={12}>
          <Grid item xs={6} md={3}>
            <TextFieldX
              size="small"
              name="serviceType"
              value={jobSheet.serviceType}
              label="Service Type"
            />
          </Grid>
        </Grid>

        <Grid container item spacing={2} xs={12}>
          <Grid item xs={12}>
            <Typography className={classes.formTitle} variant="subtitle1">
              Product Details
            </Typography>
          </Grid>
        </Grid>

        <Grid container item spacing={2} alignItems="center" xs={12}>
          <Grid item xs={12} sm={3}>
            <TextFieldX
              fullWidth
              size="small"
              name="type"
              label="Product Type"
              value={jobSheet.product.type}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextFieldX
              fullWidth
              size="small"
              name="brand"
              label="Brand"
              value={jobSheet.product.brand}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextFieldX
              fullWidth
              size="small"
              name="modelName"
              label="Model Name"
              value={jobSheet.product.modelName}
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <TextFieldX
              fullWidth
              size="small"
              name="color"
              label="Color"
              value={jobSheet.product.color}
            />
          </Grid>

          <Grid item xs={12} sm={5}>
            <TextFieldX
              fullWidth
              size="small"
              name="configuration"
              label="Product Configuration"
              value={jobSheet.product.configuration}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextFieldX
              fullWidth
              size="small"
              name="imei1"
              label="IMEI No. 1"
              value={jobSheet.product.imei1}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextFieldX
              fullWidth
              size="small"
              name="imei2"
              label="IMEI No. 2"
              value={jobSheet.product.imei2}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextFieldX
              fullWidth
              size="small"
              name="warrantyStatus"
              label="Warranty Status"
              value={jobSheet.product.warrantyStatus}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextFieldX
              fullWidth
              size="small"
              name="warrantyReference"
              label="Warranty Reference"
              value={jobSheet.product.warrantyReference}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextFieldX
              fullWidth
              size="small"
              name="problemsReported"
              value={jobSheet.product.problemsReported}
              label="Problems Reported By Customer"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextFieldX
              fullWidth
              size="small"
              name="condition"
              value={jobSheet.product.condition}
              label="Product Condition"
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextFieldX
              fullWidth
              size="small"
              name="estimatedCost"
              value={jobSheet.estimatedCost}
              label="Estimated Cost"
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <TextFieldX
              fullWidth
              size="small"
              name="advancePaid"
              value={jobSheet.advancePaid}
              label="Advance Paid"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextFieldX
              fullWidth
              size="small"
              name="assignedOperator"
              value={jobSheet.assignedOperator}
              label="Assigned Operator"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextFieldX
              fullWidth
              size="small"
              name="remarks"
              label="Remarks"
              value={jobSheet.remarks}
              placeholder="Remarks if any"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextFieldX
              fullWidth
              size="small"
              name="expectedDeliveryDate"
              label="Expected Date"
              type="date"
              defaultValue={Date.now().toString()}
              value={new Date(jobSheet.expectedDeliveryDate).toISOString().split("T")[0]}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={jobSheet.notifyCustomer}
                  name="notifyCustomer"
                  color="primary"
                />
              }
              label="Notify Customer"
            />
          </Grid>
        </Grid>

        {/* <Divider /> */}

        <Grid container item spacing={2}>
          <Grid item xs={12}>
            <Typography className={classes.formTitle} variant="subtitle1">
              Received Items
            </Typography>
          </Grid>
        </Grid>
        <Grid container item spacing={2}>
          <Grid item xs={12}>
            <TableContainer className={classes.table}>
              <Table>
                <TableHead className={classes.tableHeader}>
                  <TableRow>
                    <TableCell width="10%">Sl No</TableCell>
                    <TableCell width="50%">Item Name</TableCell>
                    <TableCell width="40%">Reference Number</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {jobSheet.receivedItems.map((item, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.referenceNumber}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>

      </Grid>
    </Paper>
  );
};

export default ViewJobSheet;
