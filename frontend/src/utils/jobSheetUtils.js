import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { companyLogo } from "../res/base64Strings";
import customerAPIs from "../apis/customerApis";

// Font Sizes
const HEADER_FONT_SIZE = 21;
const SUB_HEADER_FONT_SIZE = 16;
const BODY_FONT_SIZE = 10;
const FOOTER_FONT_SIZE = 8;

// Colors
const BLACK = "#000000";
const GRAY = "#707070";
const SILVER = "#dbdbdb";
const DARK_GREEN = "#a3d9c6";


const calculateXOffset = (pdfDocument, text) => {
    return (
        pdfDocument.internal.pageSize.width / 2 -
        (pdfDocument.getStringUnitWidth(text) *
            pdfDocument.internal.getFontSize()) /
        2
    );
};

export const generateJobSheetPDF = async (customerId, jobSheet, enqueueSnackbar) => {

    var customer = null;

    try {
        customer = await customerAPIs.getCustomer(customerId);
    } catch (err) {
        enqueueSnackbar(`Error fetching customer: ${customerId}`, { variant: "error" });
    }

    var jobSheetPDF = new jsPDF("p", "pt", "a4");

    // Set the Draw Color to Darkish Green
    jobSheetPDF.setDrawColor(1, 84, 59);

    // Page Border
    jobSheetPDF.rect(
        15,
        15,
        jobSheetPDF.internal.pageSize.width - 30,
        jobSheetPDF.internal.pageSize.height - 30,
        "S"
    );

    jobSheetPDF.setLineWidth(2.0);

    // Page Header at Center
    jobSheetPDF.setFontSize(HEADER_FONT_SIZE);
    jobSheetPDF.setTextColor(1, 84, 59)
    const jobSheetHeader = "Job Sheet";
    jobSheetPDF.text(
        jobSheetHeader,
        calculateXOffset(jobSheetPDF, jobSheetHeader),
        40
    );
    jobSheetPDF.setTextColor(BLACK);


    // Add Company Logo
    jobSheetPDF.addImage(companyLogo, 30, 40, 140, 100);

    // Company Details aligned to the right
    jobSheetPDF.setFontSize(SUB_HEADER_FONT_SIZE);
    jobSheetPDF.text("Samarth Technologies", 570, 65, {
        align: "right",
    });

    jobSheetPDF.setFontSize(BODY_FONT_SIZE);
    jobSheetPDF.setTextColor(GRAY);
    jobSheetPDF.text(
        "No.197 1st Floor Kenchanpura Cross\n Bengaluru, Karnataka 560056",
        570,
        85,
        {
            align: "right",
        }
    );
    jobSheetPDF.text("+91-99168 08544", 570, 110, {
        align: "right",
    });
    jobSheetPDF.text("service@samarthtechnologies.in", 570, 125, {
        align: "right",
    });
    jobSheetPDF.text("www.samarthtechnologies.in/", 570, 140, {
        align: "right",
    });

    // Horizontal Line Divider
    jobSheetPDF.line(25, 155, 570, 155);

    // Client Details Section
    jobSheetPDF.text("Customer Information:", 30, 170, {
        align: "left",
    });

    jobSheetPDF.setFontSize(14);
    jobSheetPDF.setTextColor(BLACK);
    jobSheetPDF.text(`${customer.fullName}`, 30, 190, {
        align: "left",
    });

    jobSheetPDF.setFontSize(BODY_FONT_SIZE);
    jobSheetPDF.setTextColor(GRAY);
    jobSheetPDF.text(`Ph: +91-${customer.mobileNumber}\nEmail: ${customer.emailId}`, 30, 205, {
        align: "left",
    });

    jobSheetPDF.setTextColor(BLACK);
    jobSheetPDF.setFontSize(BODY_FONT_SIZE);

    jobSheetPDF.text(`Job Sheet Id: ${jobSheet.jobSheetId}`, 560, 180, {
        align: "right",
    });

    const date = new Date(jobSheet.createdDate);
    const dateString = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
    jobSheetPDF.text(`Created Date: ${dateString}`, 560, 200, {
        align: "right",
    });
    const timeString = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    jobSheetPDF.text(`Created Time: ${timeString}`, 560, 220, {
        align: "right",
    });

    // Horizontal Line Divider
    jobSheetPDF.line(25, 230, 570, 230);

    jobSheetPDF.text("Device Information:", 30, 250, {
        align: "left",
    });

    var receivedItemsText = "";
    jobSheet.receivedItems.forEach((receivedItem) => {
        receivedItemsText += `${receivedItem.name}, `
    })

    jobSheetPDF.autoTable({
        head: [['Product', 'Brand', 'Model', 'Color', 'Configuration', 'Reported Fault', 'Received Items', 'Remarks']],
        body: [
            [jobSheet.product.type, jobSheet.product.brand, jobSheet.product.modelName, jobSheet.product.color, jobSheet.product.configuration, jobSheet.product.problemsReported, receivedItemsText, jobSheet.remarks],
        ],
        startY: 280,
        margin: {
            right: 30,
            left: 30,
        },
        styles: { textColor: BLACK, lineColor: SILVER, lineWidth: 1 },
        headStyles: { fillColor: DARK_GREEN, halign: 'center' },
    })

    jobSheetPDF.setLineWidth(2.0);
    jobSheetPDF.setDrawColor(1, 84, 59);

    // Horizontal Line Divider
    jobSheetPDF.line(25, 400, 570, 400); //TODO: Calculate the y coordinates from table rows

    jobSheetPDF.text(`Estimated Delivery Date:`, 30, 425, {
        align: "left",
    });
    jobSheetPDF.text(`Estimated Cost:`, 270, 425, {
        align: "left",
    });
    jobSheetPDF.text(`Advance Paid:`, 490, 425, {
        align: "left",
    });


    const expectedDeliveryDate = new Date(jobSheet.expectedDeliveryDate);
    const expectedDeliveryDateStr = `${String(expectedDeliveryDate.getDate()).padStart(2, '0')}/${String(expectedDeliveryDate.getMonth() + 1).padStart(2, '0')}/${expectedDeliveryDate.getFullYear()}`;
    jobSheetPDF.text(`${expectedDeliveryDateStr}`, 30, 450, {
        align: "left",
    });
    jobSheetPDF.text(`Rs ${jobSheet.estimatedCost}`, 270, 450, {
        align: "left",
    });

    jobSheetPDF.text(`Rs ${jobSheet.advancePaid}`, 490, 450, {
        align: "left",
    });

    // Horizontal Line Divider
    jobSheetPDF.line(25, 470, 570, 470); //TODO: Calculate the y coordinates from table rows

    jobSheetPDF.text(`Minimum Service Charge: ${300} Rs`, 30, 490, {
        align: "left",
    });

    jobSheetPDF.text(`Terms & Conditions:`, 30, 510, {
        align: "left",
    });

    jobSheetPDF.setFontSize(BODY_FONT_SIZE - 1)
    jobSheetPDF.setTextColor(GRAY);
    const tc1 = jobSheetPDF.splitTextToSize(`1. The Customer must verify the contents of the Job sheet & produce the original Job sheet at the time of taking delivery.`, 500)
    const tc2 = jobSheetPDF.splitTextToSize(`2. We shall not be obliged to undertake repair of products found damaged or already attempted for repair by other repairer.`, 500)
    const tc3 = jobSheetPDF.splitTextToSize(`3. The estimate provided at the time of acceptance are provisional and might vary on detailed inspection. We will proceed further only after customer's approval.`, 540)
    const tc4 = jobSheetPDF.splitTextToSize(`4. In case of product received with damage or repair attempted by other repairer, we are not liable for any damage even under testing before or after repair.`, 540)
    const tc5 = jobSheetPDF.splitTextToSize(`5. The customer should take delivery of the product within 14 days regardless whether the product has been repaired or not.`, 500)
    const tc6 = jobSheetPDF.splitTextToSize(`6. In the event the delivery is taken by the customer within 30 days, we reserve the right to auction the product to recover the charges.`, 500)
    const tc7 = jobSheetPDF.splitTextToSize(`7. The above terms & conditions supersedes all prior communications or advertising related to our services.`, 500)
    const tc8 = jobSheetPDF.splitTextToSize(`8. We are not liable to any memory, setting and data loss during the repair.`, 500)
    const tc9 = jobSheetPDF.splitTextToSize(`9. Spare once replaced with new, old spare will not be given back to the Customer.`, 500)
    const tc10 = jobSheetPDF.splitTextToSize(`10. By accpting the Job sheet, it is deemed that the customer agrees to all the terms & conditions mentioned  in the Job sheet.`, 500)

    jobSheetPDF.text(tc1, 30, 530, {
        align: "left",
    });
    jobSheetPDF.text(tc2, 30, 545, {
        align: "left",
    });
    jobSheetPDF.text(tc3, 30, 560, {
        align: "left",
    });
    jobSheetPDF.text(tc4, 30, 585, {
        align: "left",
    });
    jobSheetPDF.text(tc5, 30, 610, {
        align: "left",
    });
    jobSheetPDF.text(tc6, 30, 625, {
        align: "left",
    });
    jobSheetPDF.text(tc7, 30, 650, {
        align: "left",
    });
    jobSheetPDF.text(tc8, 30, 665, {
        align: "left",
    });
    jobSheetPDF.text(tc9, 30, 680, {
        align: "left",
    });
    jobSheetPDF.text(tc10, 30, 695, {
        align: "left",
    });
    jobSheetPDF.setTextColor(BLACK);

    // Horizontal Line Divider
    jobSheetPDF.line(25, 750, 570, 750); //TODO: Calculate the y coordinates from table rows

    jobSheetPDF.text(`Date: _______________`, 30, 770, {
        align: 'left'
    });
    jobSheetPDF.text(`Customer Signature: __________________`, 565, 770, {
        align: 'right'
    })

    jobSheetPDF.text(`Desk Executive Signature: __________________`, 565, 790, {
        align: 'right'
    })

    // Horizontal Line Divider
    jobSheetPDF.line(25, 805, 570, 805);

    jobSheetPDF.setFontSize(FOOTER_FONT_SIZE);
    const footerText =
        "This is a computer generated Job sheet";
    jobSheetPDF.text(footerText, calculateXOffset(jobSheetPDF, footerText), 820);


    jobSheetPDF.output("dataurlnewwindow");

    jobSheetPDF.save(`st-${jobSheet.jobSheetId}.pdf`);
};