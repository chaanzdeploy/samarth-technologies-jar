export const BASE_ROUTE = "/app";
export const DRAWER_WIDTH = 210;
export const MOBILE_NUMBER_REGEX = /^\d{10}$/;
export const NAME_REGEX = /^[a-zA-Z0-9!@#$%^&*()-_=+{}[\]|\\;:'",.<>/?\s]*$/;
export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const CUSTOMER_FIELDS = {
  fullName: "fullName",
  emailId: "emailId",
  mobileNumber: "mobileNumber",
  gender: "gender"
};
// Should be used in JOB SHEET FORM VALIDATION, REVISIT FIELDS
export const JOB_SHEET_FIELDS = {
  serviceType: "serviceType",
  type: "type",
  brand: "brand",
  modelName: "modelName",
  color: "color",
  configuration: "configuration",
  imei1: "imei1",
  imei2: "imei2",
  warrantyStatus: "warrantyStatus",
  warrantyReference: "warrantyReference",
  problemsReported: "problemsReported",
  condition: "condition",
  receivedItems: "receivedItems",
  estimatedCost: "estimatedCost",
  advancePaid: "advancePaid",
  expectedDeliveryDate: "expectedDeliveryDate",
};
export const ROWS_PER_PAGE_OPTIONS = [5, 10, 20];
export const DEFAULT_PAGE_SIZE = 10;
export const NOTIFICATIONS_STACK_SIZE = 3;
