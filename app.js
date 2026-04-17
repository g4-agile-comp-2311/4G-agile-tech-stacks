const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Quote = require("./models/quote");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const dbLink ="mongodb://localhost/quote_app?authSource=admin&retryWrites=true"
mongoose.connect(dbLink)
.then(async () => {
    const dbCount = await Quote.countDocuments();

    if (dbCount === 0) {
        await Quote.insertMany([
            { quoteText: "The early bird catches the worm!" },
            { quoteText: "You miss 100% of the shots you dont take." },
            { quoteText: "I think, therefore I am." }
        ]);
    }
})
.catch(err => {
    console.error(err)
});

app.get("/", async (req, res) => {
    const dbCount = await Quote.find();
    const randomQuote = Math.floor(Math.random() * dbCount.length);
    const quote = dbCount[randomQuote]
    res.render("index", {quote});
});

app.post("/add", async (req, res) => {
    const { quoteText } = req.body;
    await Quote.create({ quoteText });
    res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});