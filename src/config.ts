import { readContactsFromCSV } from "../utils/readCSV";

export const msg = "Hi there, if you are getting this message, it means our Bulk SMS with Termii now works with CSV import functions. Hurray!!!";
// to load conatcts Asychronously

export const getContacts = async () => {
    const contacts = await readContactsFromCSV();
    return contacts;
};
