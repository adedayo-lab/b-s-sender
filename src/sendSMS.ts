import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.TERMII_API_KEY;
const senderId = process.env.TERMII_SENDER_ID;
const baseUrl = process.env.TERMII_BASE_URL + "api/sms/send";

interface SendSMSPayload {
    to: string[];
    message: string;
}

console.log("Termii API Key:", apiKey);  // Ensure proper API key usage

const sendSMS = async ({ to, message }: SendSMSPayload): Promise<boolean> => {
    const pl = {
        to,
        from: senderId,
        sms: message,
        type: "plain",
        channel: "generic",
        api_key: apiKey,
    };

    try {
        const response = await axios.post(baseUrl, pl);
        console.log("Response:", response.data);
        return true;  // ✅ Return true if successful
    } catch (error) {
        const err = error as any;
        console.log("!!! Error sending SMS:", err.response ? err.response.data : err.message);
        return false;  // ✅ Return false if failed
    }
};

export default sendSMS;
