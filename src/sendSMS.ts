// src/sendSMS.ts
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.TERMII_API_KEY;
const url = 'https://api.ng.termii.com/api/sms/send/bulk';


interface SendSMSPayload {
    to: string[];
    message: string;
}
console.log("Termii API Key:", apiKey);// used to ensure proper APi key usage

const sendSMS = async ({ to, message }: SendSMSPayload): Promise<boolean> => {
    const pl = {
        to,
        from: "Holuid",
        sms: message,
        type: "plain",
        channel: "generic",
        api_key: apiKey,
    };

    try {
        const response = await axios.post(url, pl);
        console.log("Response:", response.data);
        return true;  // ✅ Return true if successful
    } catch (error) {
        /// using type assertion to get the error response here.
        const err = error as any;
        console.log("!!! Error sending SMS:", err.response ? err.response.data : err.message);
        return false;  // ✅ Return false if failed
    }
};

export default sendSMS;
