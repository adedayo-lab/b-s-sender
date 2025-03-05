import axios from "axios";
import * as dotenv from "dotenv";
import { msg } from "./config";


dotenv.config();

const apiKey = process.env.TERMII_API_KEY;
const senderId = process.env.TERMII_SENDER_ID;
const baseUrl = `${process.env.TERMII_BASE_URL}/api/sms/send/bulk`;

//Test for sender id info and msg content...
console.log("\n Sender ID is ==>>>", senderId);
console.log("\n BULK SMS CONTENT ==>>>", msg);

if (!apiKey) console.error("❌ Missing TERMII_API_KEY.");
if (!senderId) console.error("❌ Missing TERMII_SENDER_ID.");
if (!baseUrl) console.error("❌ Missing TERMII_BASE_URL.");
if (!apiKey || !senderId || !baseUrl) process.exit(1);

interface SendSMSPayload {
    to: string[];
    message: string;
}


const sendSMS = async ({ to, message }: SendSMSPayload): Promise<boolean> => {
    const payload = {
        to,
        from: senderId,
        sms: message,
        type: "plain",
        channel: "generic",
        api_key: apiKey,
    };

    console.log("🚀 SMS Payload:", payload);

    try {
        const response = await axios.post(baseUrl, payload, {
            headers: {"Content-Type": "application/json" },
        });
        console.log("✅ SMS Sent! Response:", response.data);
        return true; 

    } catch (error) {
        const err = error as any;
        console.log("!!! Error sending SMS:", {
            status: err.response?.status,
            data: err.response?.data,
            message: err.message,
        });
        return false;
    }
};

export default sendSMS;
