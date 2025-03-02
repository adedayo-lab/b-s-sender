import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.TERMII_API_KEY; // reading API key from .env 
const senderId = process.env.TERMII_SENDER_ID;  // reading sender ID from .env
const url = "https://api.termii.com/api/sms/send/bulk";

// an If Statement to check if API key and Sender ID are provided.
if (!apiKey || !senderId) {
    console.error("❌ Missing API_KEY or SENDER_ID check  .env file or directory");
    process.exit(1);  // Exit if missing
}

const sendBulkSms = async (pN: string[], msg: string): Promise<boolean> => {
    // 🛠 Define the payload correctly
    const pl = {
        to: pN,
        from: senderId,
        sms: msg,
        type: "plain",
        channel: "generic",
        api_key: apiKey,
    };

    try {
        const response = await axios.post(url, pl);
        console.log("✅ SMS sent successfully:", response.data);
        return true;  // ✅ Return true if successful
    } catch (error: any) {
        console.log("❌ Error sending SMS:", error.response ? error.response.data : error.message);
        return false;  // ✅ Return false if failed
    }
};

export default sendBulkSms;
