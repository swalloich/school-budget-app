const express = require('express');
const fs = require('fs');
const app = express();
const hostname = '127.0.0.1';
const port = 3000;

app.use(express.static('src/public'));

const apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.get('/', (req, res) => {
    res.status(200).send("https://youtu.be/_ElWlUr_tw8")
});

app.get('/dashboard', (_req, res) => {
    if (fileExists('public/dashboard.html')) {
        res.status(200).sendFile(`${__dirname}/src/public/dashboard.html`);
    } else {
        res.status(400).send("There was a problem while getting that page.");
    }
});
app.get('/login', (_req, res) => {
    if (fileExists("public/login.html")) {
        res.status(200).sendFile(`${__dirname}/src/public/login.html`);
    } else {
        res.status(500).send("There was a problem while getting that page.");
    }
});
app.get('/*', (_req, res) => {
    if (fileExists('public/not-found.html')) {
        res.status(404).sendFile(`${__dirname}/src/public/not-found.html`);
    } else {
        res.status(400).send('There was a problem while getting the 404 page.')
    }
});

app.use((_req, res) => {
    if (fileExists('public/index.html')) {
        res.status(200).sendFile(`${__dirname}/src/public/index.html`);
    } else {
        res.status(500).send('There was a problem while getting that page.');
    }
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})

function fileExists(fileName) {
    return fs.existsSync(`${__dirname}/src/${fileName}`);
}

function getFile(filename) {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        return data;
    });
}