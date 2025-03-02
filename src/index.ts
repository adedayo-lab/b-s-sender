import sendSMS from "./sendSMS";
import { isValidPhoneNumber, formatPhoneNumber } from '../utils/validator';
import { delay } from '../utils/delaySeq';

const pN = ["2348168070088", "+2349083494644", "08012345678"];  // Phone numbers
const msg = "This is just a test SMS using Termii";              // Message
const DELAY_MS = 5000;                                          // 5-second delay

const sendBatchSMS = async () => {
  const validNumbers = pN.filter(isValidPhoneNumber).map(formatPhoneNumber);  // ✅ Format valid numbers
  const invalidNumbers = pN.filter(num => !isValidPhoneNumber(num));
  const failedNumbers: string[] = [];   // ✅ To track failed sends
  const successfulNumbers: string[] = [];  // ✅ To track successful sends

  if (invalidNumbers.length > 0) {
    console.log("❌ Invalid phone numbers:");
    console.log(invalidNumbers.join("\n"));
  }

  for (const number of validNumbers) {
    try {
      const success = await sendSMS({ to: [number], message: msg });
      if (success) {
        successfulNumbers.push(number);  // ✅ Track success
      } else {
        failedNumbers.push(number);  // ✅ Track failed sends
        console.log(`❌ Failed to send SMS to ${number}`);
      }
    } catch (error) {
      failedNumbers.push(number);  // ✅ Track failed sends
      console.error(`❌ Error sending SMS to ${number}:`, error);
    }
    await delay(DELAY_MS);
  }

  console.log("\n--- 📊 Summary ---");
  console.log(`✅ Successfully sent to: ${successfulNumbers.length}`);
  console.log(`❌ Failed to send to: ${failedNumbers.length}`);
  console.log(`❌ Invalid numbers: ${invalidNumbers.length}`);
  if (failedNumbers.length > 0) {
    console.log("\nFailed Numbers:");
    console.log(failedNumbers.join("\n"));
  }
};

sendBatchSMS();
