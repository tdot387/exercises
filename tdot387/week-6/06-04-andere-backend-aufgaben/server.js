const express = require("express");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const app = express();
const PORT = 3000;
const DIRECTORY = "public";
const ORIGINS = [
    "http://lokale-seite-eins:3000",
    "http://lokale-seite-zwei:3000"
]

const isRequestOk = (requestedPath, basePath) =>
  requestedPath.startsWith(basePath);

const setCors = (req, res) => {
    const origin = req.headers.origin;
    if(ORIGINS.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
}

const setCache = (res, data) => {
    const hash = crypto.createHash("sha256").update(data).digest("hex");
    res.setHeader("ETag", hash);
    res.setHeader("Cache-Control", "public, max-age=86400")
}

const cookies = (req, res) => {
    if(!req.headers.cookie || !req.headers.cookie.includes("uniqueId")) {
        const uniqueId = crypto.randomBytes(16).toString("hex");
        res.cookie("uniqueId", uniqueId, {httpOnly: true});
    } else {
        const match = req.headers.cookie.match(/uniqueId=([a-f0-9]{32})/);
        if(match) {
            console.log(`Received uniqueId cookie: ${match[1]}`);
        }
    }
}

const myMiddleware = (baseDir = DIRECTORY) => {
    return (req, res, next) => {
        const requestedPath = path.join(__dirname, req.path);
        const basePath = path.join(__dirname, baseDir);

        if(!isRequestOk(requestedPath, basePath)) {
            return next();
        }

        setCors(req, res);

        fs.readFile(requestedPath, (err, data) => {
            if(err) {
                if(err.code = "ENOENT") {
                    return next();
                }
                return next(err);
            }
            setCache(res, data);
            handleCookies(req, res);

            fs.stat(requestedPath, (err, stats) => {
                if(!err && stats.mtime) {
                    res.setHeader("Last-Modified", stats.mtime.toUTCString());
                }

                res.send(data);
            });
        });
    };
};

app.use(myMiddleware());

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
