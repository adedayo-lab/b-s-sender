import sendBulkSms from "./sendSMS";
import { isValidPhoneNumber } from "../utils/validator";
import { delay } from "../utils/delaySeq";

const pN = ["2348168070088", "+2349083494644", "08012345678"];  // Phone numbers
const msg = "This is just a test SMS using Termii";              // Message
const DELAY_MS = 5000;                                           // 5-second delay

const sendBatchSMS = async () => {
  const validNumbers = pN.filter(isValidPhoneNumber);
  const invalidNumbers = pN.filter(num => !isValidPhoneNumber(num));

  if (invalidNumbers.length > 0) {
    console.log("Invalid phone numbers:");
    console.log(invalidNumbers.join("\n"));
  }

  for (const number of validNumbers) {
    try {
      // 🛠 Corrected function call to pass separate arguments
      const success = await sendBulkSms([number], msg);  
      if (!success) {
        console.log(`Failed to send SMS to ${number}`);
      } else {
        console.log(`SMS successfully sent to ${number}`);
      }
    } catch (error) {
      console.error(`Error sending SMS to ${number}:`, error);
    }
    await delay(DELAY_MS);  // 🛠 Maintain delay between requests
  }

  console.log("\n--- Summary ---");
  console.log(`Total valid numbers: ${validNumbers.length}`);
  console.log(`Total invalid numbers: ${invalidNumbers.length}`);
};

sendBatchSMS();
