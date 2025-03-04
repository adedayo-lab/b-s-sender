import sendSMS from "./sendSMS";
import { isValidPhoneNumber, formatPhoneNumber } from "../utils/validator";
import { delay } from "../utils/delaySeq";

const pN = ["2348168070088", "2349083494644", "2349127818402"];
const msg = "Hi there, if you get this it means our Bulk SMS with Termii is now functioning. Hurray!!!";
const DELAY_MS = 5000;

const sendBatchSMS = async () => {
    const validNumbers = pN.filter(isValidPhoneNumber).map(formatPhoneNumber);
    const invalidNumbers = pN.filter(num => !isValidPhoneNumber(num));
    const failedNumbers: string[] = [];
    const successfulNumbers: string[] = [];

    console.log("📲 Valid Numbers:", validNumbers);
    console.log("❌ Invalid Numbers:", invalidNumbers);

    if (validNumbers.length > 0) {
        try {
            const success = await sendSMS({ to: validNumbers, message: msg });
            if (success) {
                successfulNumbers.push(...validNumbers);
                console.log(`✅ Successfully sent SMS to ${validNumbers.length} numbers.`);
            } else {
                failedNumbers.push(...validNumbers);
                console.log(`❌ Failed to send SMS to some numbers.`);
            }
        } catch (error: unknown) {
            console.error("❌ Unexpected error:", error);
            failedNumbers.push(...validNumbers);
        }
    }

    await delay(DELAY_MS);

    console.log("\n--- Summary ---");
    console.log(`✅ Successfully sent to: ${successfulNumbers.length}`);
    console.log(`❌ Failed to send to: ${failedNumbers.length}`);
    console.log(`❌ Invalid numbers: ${invalidNumbers.length}`);

    if (failedNumbers.length > 0) {
        console.log("\n❌ Failed Numbers:");
        failedNumbers.forEach(num => console.log(`- ${num}`));
    }
};

sendBatchSMS();
