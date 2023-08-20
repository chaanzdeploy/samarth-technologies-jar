import EditIcon from "@material-ui/icons/Edit";
// import LayersIcon from "@material-ui/icons/Layers";
import IconButton from "@material-ui/core/IconButton";
// import DashboardIcon from "@material-ui/icons/Dashboard";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import PeopleOutlineTwoTone from "@material-ui/icons/PeopleOutlineTwoTone";

const iconStyles = { color: "#ffffff" };
export const TABS = [
  {
    name: "services",
    path: "/services",
    text: "Services",
    icon: <LaptopMacIcon style={iconStyles} />,
  },
  {
    name: "customers",
    path: "/customers",
    text: "Customers",
    icon: <PeopleOutlineTwoTone style={iconStyles} />,
  },
  // {
  //   name: "inventory",
  //   path: "/inventory",
  //   text: "Inventory",
  //   icon: <LayersIcon style={iconStyles} />,
  // },
  // {
  //   name: "dashboard",
  //   path: "/dashboard",
  //   text: "Dashboard",
  //   icon: <DashboardIcon style={iconStyles} />,
  // },
];

export const GENDER_VALUES = [
  { id: "male", title: "Male", value: "Male" },
  { id: "female", title: "Female", value: "Female" },
  { id: "other", title: "Other", value: "Other" },
];

export const WARRANTY_STATUS_VALUES = [
  { id: "warranty", title: "Warranty", value: "Warranty" },
  { id: "nonWarranty", title: "Non Warranty", value: "Non Warranty" },
  { id: "amc", title: "AMC", value: "AMC" },
  { id: "return", title: "Return", value: "AMC" },
];

export const CUSTOMERS_COLUMNS_CONFIG = [
  {
    field: "fullName",
    headerName: "Full Name",
    headerClassName: "table-header",
    width: 260, //flex property is another alternative
    disableColumnMenu: true,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "mobileNumber",
    headerName: "Mobile",
    headerClassName: "table-header",
    width: 180,
    disableColumnMenu: true,
    sortable: false,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "emailId",
    headerName: "Email Id",
    headerClassName: "table-header",
    width: 270,
    disableColumnMenu: true,
    sortable: false,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "address",
    headerName: "Address",
    headerClassName: "table-header",
    width: 420,
    disableColumnMenu: true,
    sortable: false,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "edit",
    headerName: "Edit",
    width: 80,
    sortable: false,
    align: "center",
    headerAlign: "center",
    disableColumnMenu: true,
    headerClassName: "table-header",
    disableClickEventBubbling: true,
    renderCell: (params) => {
      return (
        <IconButton
          // onClick={() => editCustomerDetails(params.row)}
          color="primary"
          component="span"
        >
          <EditIcon />
        </IconButton>
      );
    },
  },
];

export const SERVICES_COLUMNS_CONFIG = [
  {
    field: "jobSheetId",
    headerName: "Jobsheet ID",
    headerClassName: "table-header",
    width: 240,
    disableColumnMenu: true,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "serviceType",
    headerName: "Service Type",
    headerClassName: "table-header",
    width: 130,
    disableColumnMenu: true,
    sortable: false,
    headerAlign: "left",
    align: "left",
  },

  {
    field: "estimatedCost",
    headerName: "Estimated Cost (Rs)",
    headerClassName: "table-header",
    width: 175,
    disableColumnMenu: true,
    sortable: false,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "assignedOperator",
    headerName: "Operator",
    headerClassName: "table-header",
    width: 170,
    disableColumnMenu: true,
    sortable: false,
    headerAlign: "left",
    align: "left",
  },
  {
    field: "createdDate",
    headerName: "Created Date",
    headerClassName: "table-header",
    width: 150,
    disableColumnMenu: true,
    sortable: false,
    headerAlign: "left",
    align: "left",
    valueFormatter: (params) => {
      let createdDate = new Date(params.value);
      return `${String(createdDate.getDate()).padStart(2, '0')}/${String(createdDate.getMonth() + 1).padStart(2, '0')}/${createdDate.getFullYear()}`;
    },
  },
  {
    field: "expectedDeliveryDate",
    headerName: "Expected Date",
    headerClassName: "table-header",
    width: 160,
    disableColumnMenu: true,
    sortable: false,
    headerAlign: "left",
    align: "left",
    valueFormatter: (params) => {
      let deliveryDate = new Date(params.value);
      return `${String(deliveryDate.getDate()).padStart(2, '0')}/${String(deliveryDate.getMonth() + 1).padStart(2, '0')}/${deliveryDate.getFullYear()}`;
    }
  },
  {
    field: "view",
    headerName: "View",
    width: 100,
    sortable: false,
    align: "center",
    headerAlign: "center",
    disableColumnMenu: true,
    headerClassName: "table-header",
    disableClickEventBubbling: true,
    renderCell: (params) => {
      return (
        <IconButton color="primary" component="span">
          <VisibilityIcon />
        </IconButton>
      );
    },
  },
  {
    field: "download",
    headerName: "Download",
    width: 100,
    sortable: false,
    align: "center",
    headerAlign: "center",
    disableColumnMenu: true,
    headerClassName: "table-header",
    disableClickEventBubbling: true,
    renderCell: (params) => {
      return (
        <IconButton color="primary" component="span">
          <CloudDownloadIcon />
        </IconButton>
      );
    },
  },
  // {
  //   field: "edit",
  //   headerName: "Edit",
  //   width: 70,
  //   sortable: false,
  //   align: "center",
  //   headerAlign: "center",
  //   disableColumnMenu: true,
  //   headerClassName: "table-header",
  //   disableClickEventBubbling: true,
  //   hidden: true,
  //   renderCell: (params) => {
  //     return (
  //       <IconButton color="primary" component="span">
  //         <EditIcon />
  //       </IconButton>
  //     );
  //   },
  // },
];

export const JOBSHEET_FORM_STEPS = [
  "Customer Details",
  "Service Details",
  "Product Details",
];

export const CUSTOMER_SEARCH_TYPE_VALUES = [
  {
    id: "fullName",
    title: "Name",
    value: "fullName",
  },
  {
    id: "emailId",
    title: "Email",
    value: "emailId",
  },
  {
    id: "mobileNumber",
    title: "Mobile Number",
    value: "mobileNumber",
  },
];

export const SERVICE_TYPE_OPTIONS = [
  {
    id: "carryIn",
    title: "Carry In",
    value: "Carry In",
  },
  {
    id: "pickUp",
    title: "Pick Up",
    value: "Pick Up",
  },
  {
    id: "onSite",
    title: "On Site",
    value: "On Site",
  },
];

export const DEFAULT_CUSTOMER_FORM_VALUES = {
  fullName: "",
  mobileNumber: "",
  emailId: "",
  gender: "",
  address: "",
};

export const COLORS = [
  "Black",
  "White",
  "Silver",
  "Grey",
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Brown",
  "Orange",
  "Pink",
  "Peach",
  "Purple"
]

export const BRAND = [
  "Acer",
  "Apple",
  "Asus",
  "Compaq",
  "Dell",
  "Google",
  "HP",
  "Lenovo",
  "Microsoft",
  "MI",
  "Samsung",
  "Sony",
  "Toshibha",
]
