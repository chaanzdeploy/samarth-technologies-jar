import React from "react";
import Popup from "../Popup";
import ButtonX from "../forms/ButtonX";
import { useSnackbar } from "notistack";
import Grid from "@material-ui/core/Grid";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@material-ui/core/Paper";
import TextFieldX from "../forms/TextFieldX";
import Search from "@material-ui/icons/Search";
import { LIGHT_BLUE } from "../../utils/colors";
import customerAPIs from "../../apis/customerApis";
import CustomerForm from "../Customer/CustomerForm";
import PersonAdd from "@material-ui/icons/PersonAdd";
import { makeStyles } from "@material-ui/core/styles";
import CustomLoadingOverlay from "../CustomLoadingOverlay";
import InputAdornment from "@material-ui/core/InputAdornment";
import { CustomerProvider } from "../../context/CustomerContext";
import {
  ROWS_PER_PAGE_OPTIONS,
  DEFAULT_PAGE_SIZE,
} from "../../utils/constants";
import {
  CUSTOMERS_COLUMNS_CONFIG,
  DEFAULT_CUSTOMER_FORM_VALUES,
} from "../../utils/data";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
    "& .table-header": {
      backgroundColor: LIGHT_BLUE,
    },
    "& .MuiGrid-root": {
      marginBottom: theme.spacing(0),
    }, // reconsider removing this
  },
}));

const ListCustomers = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [data, setData] = React.useState([]);
  const [rows, setRows] = React.useState(data);
  const [loading, setLoading] = React.useState(true);
  const [pageSize, setPageSize] = React.useState(DEFAULT_PAGE_SIZE);

  const [openPopup, setOpenPopup] = React.useState(false);
  const [update, setUpdate] = React.useState(false);
  const [selectedCustomerRow, setSelectedCustomerRow] = React.useState({});

  async function getCustomers() {
    setLoading(true);
    try {
      const allCustomers = await customerAPIs.getAllCustomers();
      setData(allCustomers);
    } catch (err) {
      enqueueSnackbar("Error fetching customers list", { variant: "error" });
    }
    setLoading(false);
  }

  React.useEffect(() => {
    getCustomers();
  }, []);

  React.useEffect(() => {
    setRows(data);
  }, [data]);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();

    if (searchValue === "") {
      setRows(data);
    } else {
      const filteredData = data.filter(
        (item) =>
          item.fullName.toLowerCase().includes(searchValue) ||
          item.mobileNumber.toLowerCase().includes(searchValue) ||
          item.emailId.toLowerCase().includes(searchValue)
      );
      setRows(filteredData);
    }
  };

  const onEditCellClick = (params) => {
    if (params.colDef.field !== "edit") {
      return;
    }
    const customerRow = params.row;
    setSelectedCustomerRow(customerRow);
    setUpdate(true);
    setOpenPopup(true);
  };

  const handleAddNewCustomer = () => {
    setUpdate(false);
    setOpenPopup(true);
  };

  return (
    <>
      <Paper className={classes.root}>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item xs={6}>
            <TextFieldX
              // Revisit this to replace it with fullWidth
              style={{ width: "100%" }}
              label="Search Customers"
              size="small"
              onChange={handleSearch}
              placeholder="Search by Name, Mobile or Email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item>
            <ButtonX
              text="Add New"
              variant="outlined"
              startIcon={<PersonAdd />}
              onClick={handleAddNewCustomer}
            />
          </Grid>
        </Grid>
        <div style={{ flexGrow: 1, height: "60vh" }}>
          <DataGrid
            // autoHeight // Uncomment this for scrollable page with grid height based on no of rows
            rows={rows}
            columns={CUSTOMERS_COLUMNS_CONFIG}
            pageSize={pageSize}
            pagination
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
            loading={loading}
            components={{
              LoadingOverlay: CustomLoadingOverlay,
            }}
            disableDensitySelector
            disableSelectionOnClick
            hideFooterSelectedRowCount
            onCellClick={onEditCellClick}
            getRowId={(row) => row.customerId}
          />
        </div>
      </Paper>

      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Customer Form"
      >
        <CustomerProvider>
          <CustomerForm
            update={update}
            setOpenPopup={setOpenPopup}
            fetchUpdatedCustomers={getCustomers}
            customer={
              update ? selectedCustomerRow : DEFAULT_CUSTOMER_FORM_VALUES
            }
          />
        </CustomerProvider>
      </Popup>
    </>
  );
};

export default ListCustomers;
