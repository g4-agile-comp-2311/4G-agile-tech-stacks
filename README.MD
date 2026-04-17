# Stack Sandbox: [Stack Name]

## Student

Ria Bhullar

## Stack tested

MEEN - MongoDB, Express, EJS, Node.js

## Goal

A very small sandbox app to test how this stack works.

## What the app does

- Chooses a random quote from a database
- Allows for insertion of new quotes
- Connects an Express app to a local MongoDB instance

## Setup instructions

1. Clone the repository
2. Checkout this branch:
   git checkout sandbox-ria-meen
3. Install dependencies:
   npm install
4. Start the app:
   npm start

## Environment / tools used

- Node version: v24.13.0
- Package manager: npm
- IDE or extensions: Visual Studio Code
- Any other requirements: **Make sure you have a local instance of MongoDB installed and working!**

## Notes about setup

Mention anything that was confusing, unusual, or important during installation.

## What I learned

- Communicating to the database with mongoose was very easy to understand.
- Finding a way to figure out how many items were in the database, and to randomly pick one.
- Seeding the database upon creation for other users.
- Having a function that runs upon connection to the database
- This stack seems best for small scale or simple projects.

## Verdict

I don't think this stack is a good idea for larger scale projects. It's more suitable for smaller, simpler apps such as this one. I believe this due to the nature of how EJS interacts with Express apps, as it quickly begins to get complicated at a larger scale with different routes and EJS variables. While I find MongoDB easier, a database that's more strict in it's data types and structure is likely better for security, such as MySQL. MySQL would also be easier as a relational database.
