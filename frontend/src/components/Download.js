import jsPDF from "jspdf";
import React from "react";
import ButtonX from "./forms/ButtonX";
import { companyLogo } from "../res/base64Strings";

const calculateXOffset = (pdfDocument, text) => {
  return (
    pdfDocument.internal.pageSize.width / 2 -
    (pdfDocument.getStringUnitWidth(text) *
      pdfDocument.internal.getFontSize()) /
    2
  );
};

const HEADER_FONT_SIZE = 21;
const SUB_HEADER_FONT_SIZE = 16;
const BODY_FONT_SIZE = 10;
const FOOTER_FONT_SIZE = 8;

const Download = (customer, jobSheet) => {
  const generatePDF = () => {
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
    jobSheetPDF.setTextColor("#000000");


    // Add Company Logo
    jobSheetPDF.addImage(companyLogo, 30, 40, 140, 100);

    // Company Details aligned to the right
    jobSheetPDF.setFontSize(SUB_HEADER_FONT_SIZE);
    jobSheetPDF.text("Samarth Technologies", 570, 65, {
      align: "right",
    });

    jobSheetPDF.setFontSize(BODY_FONT_SIZE);
    jobSheetPDF.setTextColor("#707070");
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
    jobSheetPDF.text("samarthtechnologies@gmail.com/", 570, 125, {
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
    jobSheetPDF.setTextColor("#000000");
    jobSheetPDF.text("Sachin U V", 30, 190, {
      align: "left",
    });

    jobSheetPDF.setFontSize(BODY_FONT_SIZE);
    jobSheetPDF.setTextColor("#707070");
    jobSheetPDF.text("Ph: +91-8088023571\nEmail: sachin.uv@gmail.com", 30, 205, {
      align: "left",
    });

    jobSheetPDF.setTextColor("#000000");
    // jobSheetPDF.setFontSize(14);
    jobSheetPDF.setFontSize(BODY_FONT_SIZE);

    jobSheetPDF.text(`Job Sheet number: ${21}`, 430, 180, {
      align: "left",
    });

    // jobSheetPDF.setTextColor("#707070");
    // jobSheetPDF.setFontSize(BODY_FONT_SIZE);
    jobSheetPDF.text(`Created Date: ${"21-01-2021"}`, 430, 200, {
      align: "left",
    });
    jobSheetPDF.text(`Created Time: ${"21:21"}`, 430, 220, {
      align: "left",
    });

    // Horizontal Line Divider
    jobSheetPDF.line(25, 230, 570, 230);

    jobSheetPDF.text("Device Information:", 30, 250, {
      align: "left",
    });

    jobSheetPDF.autoTable({
      head: [['Sl.No', 'Product', 'Brand', 'Model', 'Color', 'Configuration', 'Reported Fault', 'Received Items', 'Remarks']],
      body: [
        ['217933', 'Laptop', 'Dell', 'Inspiron 3544', 'Silver', '8GB RAM, 1TB HDD', 'Display Issues', 'Charger, Adapter', 'Minor Scratches on body'],
        ['797339', 'Keyboard', 'Logiteck', '2K221', 'Black', 'Wireless', 'NA', 'USB, Harddisk', 'NA'],
      ],
      startY: 260,
      margin: {
        right: 30,
        left: 30,
      },
      styles: { textColor: "#000000", lineColor: "#dbdbdb", lineWidth: 1 },
      headStyles: { fillColor: "#a3d9c6", halign: 'center' },
      columnStyles: {}
    })

    jobSheetPDF.setLineWidth(2.0);
    jobSheetPDF.setDrawColor(1, 84, 59);

    // Horizontal Line Divider
    jobSheetPDF.line(25, 400, 570, 400); //TODO: Calculate the y coordinates from table rows

    jobSheetPDF.text(`Estimated Delivery Date:`, 30, 420, {
      align: "left",
    });
    jobSheetPDF.text(`Estimated Cost:`, 270, 420, {
      align: "left",
    });
    jobSheetPDF.text(`Advance Paid:`, 490, 420, {
      align: "left",
    });


    jobSheetPDF.text(`${"07-Dec-2021"}`, 30, 445, {
      align: "left",
    });
    jobSheetPDF.text(`Rs ${2100}`, 270, 445, {
      align: "left",
    });

    jobSheetPDF.text(`Rs ${1000}`, 490, 440, {
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
    jobSheetPDF.setTextColor("#707070");
    var tc1 = jobSheetPDF.splitTextToSize(`1. The Customer must verify the contents of the Job sheet & produce the original Job sheet at the time of taking delivery.`, 500)
    var tc2 = jobSheetPDF.splitTextToSize(`2. We shall not be obliged to undertake repair of products found damaged or already attempted for repair by other repairer.`, 500)
    var tc3 = jobSheetPDF.splitTextToSize(`3. The estimate provided at the time of acceptance are provisional and might vary on detailed inspection. We will proceed further only after customer's approval.`, 540)
    var tc4 = jobSheetPDF.splitTextToSize(`4. In case of product received with damage or repair attempted by other repairer, we are not liable for any damage even under testing before or after repair.`, 540)
    var tc5 = jobSheetPDF.splitTextToSize(`5. The customer should take delivery of the product within 14 days regardless whether the product has been repaired or not.`, 500)
    var tc6 = jobSheetPDF.splitTextToSize(`6. In the event the delivery is taken by the customer within 30 days, we reserve the right to auction the product to recover the charges.`, 500)
    var tc7 = jobSheetPDF.splitTextToSize(`7. The above terms & conditions supersedes all prior communications or advertising related to our services.`, 500)
    var tc8 = jobSheetPDF.splitTextToSize(`8. We are not liable to any memory, setting and data loss during the repair.`, 500)
    var tc9 = jobSheetPDF.splitTextToSize(`9. Spare once replaced with new, old spare will not be given back to the Customer.`, 500)
    var tc10 = jobSheetPDF.splitTextToSize(`10. By accpting the Job sheet, it is deemed that the customer agrees to all the terms & conditions mentioned  in the Job sheet.`, 500)

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
    jobSheetPDF.setTextColor("#000000");
   
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
    jobSheetPDF.line(25, 800, 570, 800);

    jobSheetPDF.setFontSize(FOOTER_FONT_SIZE);
    const footerText =
      "This is a computer generated Job sheet";
    jobSheetPDF.text(footerText, calculateXOffset(jobSheetPDF, footerText), 820);
    jobSheetPDF.output("dataurlnewwindow");

    jobSheetPDF.save("jnaneshwari_devi.pdf");
  };

  return <ButtonX text="Download PDF" onClick={generatePDF}></ButtonX>;
};

export default Download;
