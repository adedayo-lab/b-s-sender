import * as fs from 'fs';
import * as path from 'path';
import csvParser from 'csv-parser';

interface Contact{
    fN: string; //full name
    pN: string; //phone number
}

// reading and parsing csv file
export const readContactsFromCSV = (): Promise<Contact[]> => {
    return new Promise((resolve, reject) => {
        const contacts: Contact[] = [];
        const filePath = path.join(__dirname, "../data/contacts.csv");


        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (row) => {
                const fN = row["Full Name"]?.trim();
                const pN = row["Phone Number"]?.trim();
                
                if (fN && pN) {
                    contacts.push({ fN, pN });
                }
            })
            .on('end', () => {
                console.log( `{contacts.length}✅Contacts read from csv.`);
                resolve(contacts);
            })
            .on("error", (error) => {
                console.error("❌ Error reading csv check ===>>>", error);
                reject(error);
            });
        });
    };