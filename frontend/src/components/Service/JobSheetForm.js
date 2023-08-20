import React from "react";
import { Form } from "../useForm";
import SelectX from "../forms/SelectX";
import ButtonX from "../forms/ButtonX";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TextFieldX from "../forms/TextFieldX";
import Divider from "@material-ui/core/Divider";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import AddIcon from "@material-ui/icons/AddCircle";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import TableContainer from "@material-ui/core/TableContainer";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { BLACK, LIGHTER_BLUE, LIGHT_BLUE } from "../../utils/colors";
import { BRAND, COLORS, SERVICE_TYPE_OPTIONS, WARRANTY_STATUS_VALUES } from "../../utils/data";

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
    margin: theme.spacing(2),
    marginTop: theme.spacing(4),
    padding: theme.spacing(1),
  },
  formTitle: {
    margin: theme.spacing(1),
    fontWeight: 600,
  },
}));



const JobSheetForm = (props) => {
  const classes = useStyles();

  const { removeFromReceivedItems } = props;
  const { values, handleInputChange, errors, setErrors, resetForm } =
    props.form;
  const [itemName, setItemName] = React.useState("");
  const [itemReferenceNumber, setItemReferenceNumber] = React.useState("");

  const handleAddItem = () => {
    const e = {
      target: {
        name: "receivedItems",
        value: [
          ...values.receivedItems,
          {
            name: itemName,
            referenceNumber: itemReferenceNumber,
          },
        ],
      },
    };
    handleInputChange(e);
    setItemName("");
    setItemReferenceNumber("");
    // UX Enhancement: Get focus back to item name input
  };

  return (
    <Paper className={classes.formContent} elevation={2}>
      <Form onSubmit={() => {}}>
        <Grid
          container
          spacing={1}
          justifyContent="center"
          // alignItems="stretch" // revisit this property
          direction="column"
        >
          <Grid container item spacing={2}>
            <Grid item xs={12}>
              <Typography className={classes.formTitle} variant="h6">
                Create JobSheet
              </Typography>
              <Divider />
            </Grid>
          </Grid>
          <Grid container item spacing={2}>
            <Grid item xs={6} md={3}>
              <SelectX
                size="small"
                name="serviceType"
                label="Service Type"
                value={values.serviceType}
                onChange={handleInputChange}
                options={SERVICE_TYPE_OPTIONS}
              />
            </Grid>
          </Grid>

          <Grid container item spacing={2}>
            <Grid item xs={12}>
              <Typography className={classes.formTitle} variant="subtitle1">
                Product Details
              </Typography>
            </Grid>
          </Grid>
          <Grid container item spacing={2} alignItems="center">
            <Grid item xs={12} sm={3}>
              <Autocomplete
                size="small"
                options={[]}
                freeSolo
                value={values.type}
                onInputChange={(event, newValue) => {
                  handleInputChange({
                    target: { name: "type", value: newValue },
                  });
                }}
                renderInput={(params) => (
                  <TextFieldX
                    {...params}
                    name="type"
                    label="Product Type"
                    placeholder="Select the Product Type"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <Autocomplete
                size="small"
                options={BRAND}
                freeSolo
                onChange={(event, newValue) => {
                  handleInputChange({
                    target: { name: "brand", value: newValue },
                  });
                }}
                renderInput={(params) => (
                  <TextFieldX
                    {...params}
                    name="brand"
                    label="Brand"
                    placeholder="Select the Product Brand"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Autocomplete
                size="small"
                options={[]}
                freeSolo
                value={values.modelName}
                onInputChange={(event, newValue) => {
                  handleInputChange({
                    target: { name: "modelName", value: newValue },
                  });
                }}
                renderInput={(params) => (
                  <TextFieldX
                    {...params}
                    name="modelName"
                    label="Model Name"
                    placeholder="Select the Model Name"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={2}>
              <Autocomplete
                size="small"
                options={COLORS}
                freeSolo
                value={values.color}
                onInputChange={(event, newValue) => {
                  handleInputChange({
                    target: { name: "color", value: newValue },
                  });
                }}
                renderInput={(params) => (
                  <TextFieldX
                    {...params}
                    name="color"
                    label="Color"
                    placeholder="Select Color"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={5}>
              <TextFieldX
                size="small"
                name="configuration"
                onChange={handleInputChange}
                value={values.configuration}
                label="Product Configuration"
                placeholder="i5 Processor, 8GB RAM etc"
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextFieldX
                size="small"
                name="imei1"
                label="IMEI No. 1"
                value={values.imei1}
                onChange={handleInputChange}
                placeholder="IMEI No / Sl No"
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextFieldX
                size="small"
                name="imei2"
                label="IMEI No. 2"
                value={values.imei2}
                onChange={handleInputChange}
                placeholder="IMEI No / Sl No"
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <SelectX
                size="small"
                // disabled={readOnly}
                name="warrantyStatus"
                label="Warranty Status"
                onChange={handleInputChange}
                value={values.warrantyStatus}
                options={WARRANTY_STATUS_VALUES}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextFieldX
                size="small"
                name="warrantyReference"
                label="Warranty Reference"
                onChange={handleInputChange}
                value={values.warrantyReference}
                disabled={
                  values.warrantyStatus !== WARRANTY_STATUS_VALUES[0].title
                }
                placeholder="Applicable if Warranty is Active"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextFieldX
                size="small"
                name="problemsReported"
                onChange={handleInputChange}
                value={values.problemsReported}
                label="Problems Reported By Customer"
                placeholder="Briefly mention the Problems reported"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextFieldX
                size="small"
                name="condition"
                value={values.condition}
                label="Product Condition"
                onChange={handleInputChange}
                placeholder="Scratches, Missing screws, Water Damages etc."
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextFieldX
                size="small"
                // type="number"
                name="estimatedCost"
                value={values.estimatedCost}
                label="Estimated Cost"
                onChange={handleInputChange}
                placeholder="Cost in Rupees"
                // inputProps={{ inputMode: "numeric" }}
              />
            </Grid>

            <Grid item xs={12} sm={2}>
              <TextFieldX
                size="small"
                // type="number"
                name="advancePaid"
                value={values.advancePaid}
                label="Advance Paid"
                onChange={handleInputChange}
                placeholder="In Rupees"
                // inputProps={{ inputMode: "numeric" }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextFieldX
                size="small"
                name="assignedOperator"
                value={values.assignedOperator}
                label="Assigned Operator"
                onChange={handleInputChange}
                placeholder="Operator Assigned"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldX
                size="small"
                name="remarks"
                label="Remarks"
                value={values.remarks}
                onChange={handleInputChange}
                placeholder="Remarks if any"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextFieldX
                size="small"
                name="expectedDeliveryDate"
                label="Expected Date"
                type="date"
                defaultValue={Date.now().toString()}
                value={values.expectedDeliveryDate}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.notifyCustomer}
                    onChange={(e) =>
                      handleInputChange({
                        target: {
                          name: e.target.name,
                          value: e.target.checked,
                        },
                      })
                    }
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
                      <TableCell width="45%">Item Name</TableCell>
                      <TableCell width="40%">Reference Number</TableCell>
                      <TableCell width="5%"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {values.receivedItems.map((item, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.referenceNumber}</TableCell>
                          <TableCell>
                            <DeleteIcon
                              color="error"
                              onClick={() => removeFromReceivedItems(index)}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            container
            component={Paper}
            alignItems="center"
            justifyContent="space-evenly"
            style={{ backgroundColor: LIGHTER_BLUE }}
          >
            <Grid item xs={6}>
              <TextFieldX
                size="small"
                name="itemName"
                value={itemName}
                variant="standard"
                placeholder="Item Name"
                onChange={(event) => setItemName(event.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextFieldX
                size="small"
                variant="standard"
                name="itemReferenceNumber"
                value={itemReferenceNumber}
                placeholder="Item Reference Number"
                onChange={(event) => setItemReferenceNumber(event.target.value)}
              />
            </Grid>
            <Grid item xs="auto">
              <ButtonX
                fullWidth
                size="small"
                text="Add"
                onClick={handleAddItem}
                endIcon={<AddIcon />}
              />
            </Grid>
          </Grid>
        </Grid>
      </Form>
    </Paper>
  );
};

export default JobSheetForm;
