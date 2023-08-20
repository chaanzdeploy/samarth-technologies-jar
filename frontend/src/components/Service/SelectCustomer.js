import React from "react";
import SelectX from "../forms/SelectX";
import ButtonX from "../forms/ButtonX";
import { useSnackbar } from "notistack";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Alert from "@material-ui/lab/Alert";
import Paper from "@material-ui/core/Paper";
import TextFieldX from "../forms/TextFieldX";
import Avatar from "@material-ui/core/Avatar";
import SendIcon from "@material-ui/icons/Send";
import Search from "@material-ui/icons/Search";
import ListItem from "@material-ui/core/ListItem";
import customerAPIs from "../../apis/customerApis";
import { makeStyles } from "@material-ui/core/styles";
import ListItemText from "@material-ui/core/ListItemText";
import InputAdornment from "@material-ui/core/InputAdornment";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { CUSTOMER_SEARCH_TYPE_VALUES } from "../../utils/data";
import { CustomerContext } from "../../context/CustomerContext";
import { LIGHTER_BLUE, MODERATE_BLUE } from "../../utils/colors";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

const getInitialsFromFullName = (fullName) => {
  return fullName.match(/\b(\w)/g).join("");
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3),
    padding: theme.spacing(2),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  listItem: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  avatar: {
    color: LIGHTER_BLUE,
    backgroundColor: MODERATE_BLUE,
  },
}));

export default function SelectCustomer(props) {
  const classes = useStyles();
  const { handleNext } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [searchType, setSearchType] = React.useState(
    CUSTOMER_SEARCH_TYPE_VALUES[0].id
  );
  const [searchTerm, setSearchTerm] = React.useState("");
  const [customersList, setCustomersList] = React.useState([]);
  const [isSearchResultEmpty, setIsSearchResultEmpty] = React.useState(false);
  const [selectedCustomer, setSelectedCustomer] =
    React.useContext(CustomerContext);

  const handleSearch = async () => {
    if (searchTerm === null || searchTerm === "") {
      enqueueSnackbar("Please enter a valid search string", {
        variant: "warning",
      });
    } else {
      try {
        const customers = await customerAPIs.searchCustomers(
          searchType,
          searchTerm
        );
        customers.length === 0
          ? setIsSearchResultEmpty(true)
          : setIsSearchResultEmpty(false);
        setCustomersList(customers);
      } catch (err) {
        enqueueSnackbar("Error fetching customes list", { variant: "error" });
        setCustomersList([]);
      }
    }
  };

  const handleCustomerSelect = (index) => {
    setSelectedCustomer(customersList[index]);
    handleNext();
  };

  return (
    <Paper className={classes.root} elevation={2}>
      <Grid
        container
        spacing={2}
        alignItems="center"
        component={Paper}
        elevation={3}
      >
        <Grid item>
          <SelectX
            name="searchType"
            value={searchType}
            label="Search Type"
            customStyle={{ width: 180 }}
            onChange={(event) => setSearchType(event.target.value)}
            options={CUSTOMER_SEARCH_TYPE_VALUES}
          />
        </Grid>
        <Grid item xs={9}>
          <TextFieldX
            fullWidth
            size="small"
            value={searchTerm}
            label="Search Customer"
            placeholder={`Search Customer by ${searchType}`}
            onChange={(event) => setSearchTerm(event.target.value)}
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
          <ButtonX text="Search" style={{ margin: 0 }} onClick={handleSearch} />
        </Grid>
      </Grid>
      {isSearchResultEmpty && (
        <Alert severity="warning" style={{ marginTop: 20 }}>
          No Customers found for the Search Request!
        </Alert>
      )}
      <List>
        {customersList.map((customer, index) => (
          <ListItem
            key={customer.customerId}
            className={classes.listItem}
            component={Paper}
            elevation={2}
          >
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                {getInitialsFromFullName(customer.fullName)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={customer.fullName}
              secondary={`${customer.emailId} | ${customer.mobileNumber}`}
            />
            <ListItemSecondaryAction>
              <ButtonX
                text="Select Customer"
                variant="outlined"
                onClick={() => handleCustomerSelect(index)}
                endIcon={<SendIcon />}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
