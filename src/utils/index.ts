import { google } from "googleapis";

const sheets = google.sheets("v4");
const auth = new google.auth.GoogleAuth({
  keyFile: "./hello.json", // Replace with the path to your service account credentials JSON file
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

const spreadsheetId = "1GH-yGlVxjr61kQ__10GL5QRRfbwEheDgNBO0dxQx4y0"; // Replace with the actual ID from your Google Sheets document link
const range = "Sheet1"; // Replace with the name of the sheet you want to write to.

async function writeToGoogleSheet(dataToStore: any) {
  const values = [
    [
      dataToStore.id,
      dataToStore.entity,
      dataToStore.amount,
      dataToStore.amount_paid,
      dataToStore.amount_due,
      dataToStore.currency,
      dataToStore.receipt,
      dataToStore.offer_id,
      dataToStore.status,
      dataToStore.attempts,
      dataToStore.notes.join(","), // Convert notes array to a comma-separated string
      dataToStore.created_at,
      dataToStore.mobile,
    ],
  ];

  try {
    const sheetsApi = await sheets.spreadsheets.values.append({
      auth: await auth.getClient(),
      spreadsheetId,
      range,
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

// writeToGoogleSheet(dataToStore);

export { writeToGoogleSheet };
