import { google } from "googleapis";

const sheets = google.sheets("v4");
const auth = new google.auth.GoogleAuth({
  keyFile: "./hello.json", // Replace with the path to your service account credentials JSON file
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

const spreadsheetId = "1GH-yGlVxjr61kQ__10GL5QRRfbwEheDgNBO0dxQx4y0"; // Replace with the actual ID from your Google Sheets document link
const range = "Sheet1"; // Replace with the name of the sheet you want to write to.

async function findLastRowWithData() {
  try {
    //@ts-ignore
    const response = await sheets?.spreadsheets.values.get({
      auth: await auth.getClient(),
      spreadsheetId,
      range: range,
    });

    const numRows = response.data.values ? response.data.values.length : 0;
    return numRows; // Return the last row with data
  } catch (error) {
    console.error("Error:", error);
    return -1; // Return -1 to indicate an error
  }
}

async function writeToGoogleSheet(dataToStore) {
  // Ensure that the values are ordered correctly to match the headers in your Google Sheet.
  const values = [[dataToStore.mobile, dataToStore.tickets.join(",")]];

  // Find the last row with data dynamically
  const lastRowWithData = await findLastRowWithData();

  if (lastRowWithData === -1) {
    console.error("Error finding the last row with data.");
    return;
  }

  // Calculate the range to append data immediately below the last row with data
  const updatedRange = `Sheet1!A${lastRowWithData + 1}`;

  try {
    const sheetsApi = await sheets.spreadsheets.values.update({
      // @ts-ignore
      auth: await auth.getClient(),
      spreadsheetId,
      range: updatedRange,
      valueInputOption: "RAW",
      resource: {
        values,
      },
    });

    console.log("Row added successfully.");
  } catch (error) {
    console.error("Error:", error);
  }
}

// Example data to store
const dataToStore = {
  id: "order_Mmt8covrFqRbtZ",
  entity: "order",
  amount: 50000,
  amount_paid: 0,
  amount_due: 50000,
  currency: "INR",
  receipt: "-NLJDR0CT",
  offer_id: null,
  status: "created",
  attempts: 0,
  notes: [],
  created_at: 1697024807,
  mobile: 8766203976,
};

// Uncomment the line below to execute the function.
// writeToGoogleSheet(dataToStore);

export { writeToGoogleSheet };
