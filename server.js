const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const DB_FILE = "db.json";

function loadDB() {
    if (!fs.existsSync(DB_FILE)) return {};
    return JSON.parse(fs.readFileSync(DB_FILE));
}

function saveDB(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

app.post("/hwid", (req, res) => {
    const { key, hwid } = req.body;

    let db = loadDB();

    if (!db[key]) {
        db[key] = { hwid: null };
    }

    if (!db[key].hwid) {
        db[key].hwid = hwid;
        saveDB(db);
        return res.json({ status: "ok" });
    }

    if (db[key].hwid === hwid) {
        return res.json({ status: "ok" });
    }

    return res.json({ status: "blocked" });
});

app.listen(3000, () => {
    console.log("Server radi na portu 3000");
});