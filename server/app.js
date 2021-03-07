const path = require('path');

const cheerio = require('cheerio');
const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/status', async (_, res) => {
    const response = await fetch('https://www.githubstatus.com/');
    const body = await response.text();

    const $ = cheerio.load(body);

    let statusMap = [];

    $('.component-container.border-color').each((index, element) => {
        const nameField = $(element).find('.name').text().trim();
        const statusField = $(element).find('.component-status').text().trim();

        statusMap.push({ name: nameField, status: statusField });
    });

    statusMap = statusMap.filter(status => !status.name.includes('Visit'));

    res
        .status(200)
        .json({ status: statusMap });
});

app.listen(3000, () => console.log('Listening...'));