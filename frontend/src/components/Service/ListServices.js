import React from "react";
import ButtonX from "../forms/ButtonX";
import { useSnackbar } from "notistack";
import Grid from "@material-ui/core/Grid";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@material-ui/core/Paper";
import TextFieldX from "../forms/TextFieldX";
import { makeStyles } from "@material-ui/core";
import Search from "@material-ui/icons/Search";
import { LIGHT_BLUE } from "../../utils/colors";
import jobSheetApis from "../../apis/jobSheetApis";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import { SERVICES_COLUMNS_CONFIG } from "../../utils/data";
import CustomLoadingOverlay from "../CustomLoadingOverlay";
import InputAdornment from "@material-ui/core/InputAdornment";
import { generateJobSheetPDF } from "../../utils/jobSheetUtils";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { DEFAULT_PAGE_SIZE, ROWS_PER_PAGE_OPTIONS } from "../../utils/constants";


const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
    "& .table-header": {
      backgroundColor: LIGHT_BLUE,
    },
    // "& .MuiGrid-root": {
    //   marginBottom: theme.spacing(0),
    // },
    // reconsider removing this
  },
}));


const ListServices = (props) => {
  const classes = useStyles();
  const { path, url } = useRouteMatch();
  const { enqueueSnackbar } = useSnackbar();

  const [data, setData] = React.useState([]);
  const [rows, setRows] = React.useState([]);

  const [pageSize, setPageSize] = React.useState(DEFAULT_PAGE_SIZE);
  const [loading, setLoading] = React.useState(true);
  const [serviceRow, setSelectedServiceRow] = React.useState({});

  const history = useHistory();

  React.useEffect(() => {
    async function getServices() {
      setLoading(true);
      try {
        const allServices = await jobSheetApis.getServices();
        setData(allServices);
      } catch (err) {
        enqueueSnackbar("Error fetching services list", { variant: "error" });
      }
      setLoading(false);
    }
    getServices();
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
          item.jobSheetId.toLowerCase().includes(searchValue) ||
          item.assignedOperator.toLowerCase().includes(searchValue)
      );
      setRows(filteredData);
    }
  };

  const onViewCellClick = async (params) => {

    const selectedJobSheet = params.row;

    if (params.colDef.field === "view") {
      // setSelectedServiceRow(selectedJobSheet.jobSheetId);
      // setUpdate(true);
      // setOpenPopup(true);
      history.push(`${path}/jobsheet/${selectedJobSheet.jobSheetId}`);
    } else if (params.colDef.field === "download") {
      // setSelectedServiceRow(selectedJobSheet.jobSheetId);
      await generateJobSheetPDF(selectedJobSheet.customerId, selectedJobSheet, enqueueSnackbar);
      // setUpdate(true);
      // setOpenPopup(true);
    } else {
      return;
    }
  };

  return (
    <Paper className={classes.root}>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item xs={6}>
          <TextFieldX
            fullWidth
            label="Search Services"
            size="small"
            onChange={handleSearch}
            placeholder="Search by JobSheet Number"
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
            text="New Jobsheet"
            variant="outlined"
            startIcon={<NoteAddIcon />}
            component={Link}
            to={`${url}/jobsheet`}
          />
        </Grid>
      </Grid>
      <div style={{ flexGrow: 1, height: "60vh" }}>
        <DataGrid
          // autoHeight // Uncomment this for scrollable page with grid height based on no of rows
          rows={rows}
          columns={SERVICES_COLUMNS_CONFIG}
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
          onCellClick={onViewCellClick}
          getRowId={row => row.jobSheetId}
        />
      </div>
    </Paper>
  );
};

export default ListServices;
