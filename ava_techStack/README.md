# Stack Sandbox: React+Vite and Postgres

## Student

Ava

## Stack tested

React
Vite
Postgres

## Goal

A very small sandbox app to test how this stack works.

## What the app does

- SPA (no reloads)
- State (remeber what item the user clicked)
- Store use clicks db

## Setup instructions

1. Clone the repository
2. Checkout this branch:
   git checkout [sandbox-ava-reactVite-Postgres]
3. Install dependencies:
   npm i
4. Start the app:
   npm run dev --> front end
   node server.js --> backend

## Notes about setup

HTTP module is so terrible to use! Please use express or some other frame work so we don't have to interface with this directly. Check otu server.js file for insanity.

## What I learned

- Components are fun and simple to style
- HTTP module is very unforgiving and difficult to use.
- It's a strange combination to have fast react + vite and really old, frustrating http module. they do not work well together at all.
- suitable for smaller projects with few routes.
- Postgres is pretty much identical to mysql, very easy to pick up but not sure why we would switch to it instead of mySQL for the project.

## Verdict

I would not reccomend this stack because the HTTP module will cause a lot of issues.
