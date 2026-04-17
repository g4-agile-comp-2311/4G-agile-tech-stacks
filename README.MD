# PERN Setup

## Installing PostgreSql

[Download link](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)

Choose defaults for everything. When prompted for which extra stuff to add just ignore it. App is not called "PostgreSQL" it's called "pgAdmin"

## PostgreSQL vs MySQL

- npm i pg instead of mysql2
- Placeholder differences:
  - MySQL: WHERE id = ?
  - PostgreSql: WHERE id = $1
- "SERIAL" instead of "AUTO_INCREMENT"
- Postgres is stricter on case sensitivity

## React + Vite

- Replaces EJS
- Vite runs the frontend on localhost:5173
- I think we're familiar enough with React at this point

## Express/EJS vs PERN -- App Flow

Express/EJS:

Express renders EJS templates
Browser receives HTML

PERN:

React frontend renders UI
Express backend serves JSON API
Frontend calls backend via HTTP

## Express/EJS vs PERN -- Forms

Express/EJS:

Form data goes straight to Express route.

PERN:

- You must call a fetch call with onSubmit.

- Frontend manually handles:
  - Validation
  - Loading states
  - Error messages

  ## Express/EJS vs PERN -- Running the App

Express/EJS:

nodemon server.js

PERN:

node server.js
**AND**
npm run dev in frontend folder (this runs "vite" command which builds frontend)

## PERN

Use two servers in development

Frontend: localhost:5173
Backend: localhost:5000

This means you have to worry about CORS. Fix with the following line.

```javascript
app.use(cors({ origin: "http://localhost:5173" }));
```

## Cookie Sessions in PERN

- More difficult because of CORS
- Cookies won't work if not configured properly

### Config

```javascript
import session from "express-session";

app.use(
  session({
    secret: "your-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
    },
  }),
);
```

Enable credentials in CORS middleware

```javascript
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
```

Send credentials in fetch calls

```javascript
fetch("http://localhost:5000/login", {
  method: "POST",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email, password }),
});
```

Session stored in MemoryStore by default, not production-safe. Use Redis or something.
