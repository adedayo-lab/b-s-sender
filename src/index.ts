import sendSMS from "./sendSMS";
import { isValidPhoneNumber, formatPhoneNumber } from "../utils/validator";
import { delay } from "../utils/delaySeq";
import { msg, getContacts } from "./config";

const DELAY_MS = 5000;


// Fuction fo send SMS
const sendBatchSMS = async () => {
    try {

        const contact = await getContacts();
        console.log(`Succesfully loaded ${contact.length}contacts from imported CSV file.`);

        //to seperate valid from inValid pN's
        const validContacts = contact.filter(contact => isValidPhoneNumber(contact.pN));
        const invalidContacts = contact.filter(contact => !isValidPhoneNumber(contact.pN));


        const validNumbers = validContacts.map(contact => formatPhoneNumber(contact.pN));
        const invalidNumbers = invalidContacts.map(contact => contact.pN);

        const failedNumbers: string[] = []
        const successfulNumbers: string[] = [];

        console.log("Valid Numbers=>>>", validNumbers);
        console.log("Invalid Number =>>>", invalidNumbers);

        //for invalid Num with Names
        if (invalidContacts.length > 0) {
            console.log(`sysytem found ${invalidContacts.length} invalid phone  numbers`);
            invalidContacts.forEach(contact =>
                console.log(`-${contact.fN}: ${contact.pN}`)
            );
        }

        //send sms to valid pN's
        if (validNumbers.length > 0) {
            try {
                const success = await sendSMS({ to: validNumbers, message: msg });
                if (success) {
                    successfulNumbers.push(...validNumbers);
                    console.log(`Successfully sent SMS to ${validNumbers.length} numbers.`);
                } else {
                    failedNumbers.push(...validNumbers);
                    console.log("Failed to send SMS to some numbers.");
                }
            } catch (error: unknown) {
                console.error(" unexpected error check ==>>:", error);
                failedNumbers.push(...validNumbers);
            }
        }

        await delay(DELAY_MS); // this calls the delay between requests

        ///after completion of Asynchronous run list below summary of task
        console.log("\n--- Summary ---");
        console.log(`✅ Successfully sent to: ${successfulNumbers.length}`);
        console.log(`❌ Failed to send to: ${failedNumbers.length}`);
        console.log(`❌ Invalid numbers: ${invalidNumbers.length}`);

        if (failedNumbers.length > 0) {
            console.log("\n Failed Numbers:")
            failedNumbers.forEach(num => console.log(`-${num}`));
        }

        // To further troubleshoot
    } catch (err) {
        console.error("error loading Contacts from CSV or something, but check ===>", err);
    
    }
};
//Execute SMS sending
sendBatchSMS();

