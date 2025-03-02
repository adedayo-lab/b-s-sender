# Batch SMS Sender with TypeScript and Termii

A TypeScript-based script to send bulk SMS using Termii API.

## Features
- Phone number validation
- Error handling and logging
- 5-second delay between requests
- Summary report for invalid inputs

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Then 
```bash npm install axios dotenv ts-node
```
   To execute index.ts directly using ts-node (without compiling to JavaScript), ru
```bash npx ts-node src/index.ts
```



## Create or Update .env File
Make sure your .env file has the correct API key and sender ID:
TERMII_API_KEY=your_actual_api_key
TERMII_SENDER_ID=your_sender_id

## Compile TypeScript (Optional)
npx tsc


