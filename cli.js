
const axios = require('axios')
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const open = require('open');
const child_process = require('child_process');
const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));

var verbose = false;
require('dotenv').config();

if (!process.env.APIKEY) {
    throw (`Empty APIKEY! Please do 'cp .env.example .env' and edit .env to set APIKEY`)
}

require('yargs').command('sandbox <id>', 'run current solution in sandbox vs opponent id', (yargs) => {
    yargs
        .option('id', {
            describe: 'enemy id',
            type: 'string'
        })
        .demandOption(['id'])
}, (argv) => {
    verbose = argv.verbose
    start(argv)
})
    .option('verbose', {
        alias: 'v',
        type: 'boolean',
        description: 'Run with verbose logging'
    })
    .argv

async function start(argv) {
    await compile();

    const vs = argv.id;
    var result = await send();
    if (verbose) console.log('Sended', result.id)
    var submission = await check(result.id);
    while (submission.status !== 'compiled') {
        if (verbose) console.log('Check compilation', submission.id)
        await snooze(1000);
        submission = await check(result.id);
    }
    if (verbose) console.log('Compiled', submission.id)
    if (verbose) console.log('Start game with', submission.id, vs)
    const context = await play(submission.id, vs)
    if (verbose) console.log('Open game', `https://codechallenge.testkontur.ru/sandbox/${context.id}`)
    open(`https://codechallenge.testkontur.ru/sandbox/${context.id}`);
}

// API HELPERS BELLOW
async function compile() {
    child_process.execSync('npm run build');
}
async function send() {
    const form = new FormData();
    const filePath = path.resolve('./dist/app.bundle.js');
    form.append('file', fs.createReadStream(filePath));

    if (verbose) console.log('Send file', filePath, 'to https://codechallenge.testkontur.ru/api/submit')

    return axios.post('https://codechallenge.testkontur.ru/api/submit', form, {
        headers: {
            ...form.getHeaders(),
            Cookie: `wc.auth=${process.env.APIKEY}`,
            'Content-Type': 'multiplart/form-data'
        }
    })
        .then((res) => {
            if (verbose) console.log('Response', res.data)
            return res.data
        })
        .catch((error) => {
            console.error(error.response.data)
        })
}

async function check(id) {
    if (verbose) console.log('Check submission', `https://codechallenge.testkontur.ru/api/submission/${id}`)
    return axios.get(`https://codechallenge.testkontur.ru/api/submission/${id}`, {
        headers: {
            Cookie: `wc.auth=${process.env.APIKEY}`
        }
    })
        .then((res) => {
            if (verbose) console.log('Response', res.data)
            return res.data
        })
        .catch((error) => {
            console.error(error.response.data)
        })
}

async function play(id1, id2) {
    if (verbose) console.log('Start sandbox game', `https://codechallenge.testkontur.ru/api/games/sandbox?player1=${id1}&player2=${id2}`)
    return axios.post(`https://codechallenge.testkontur.ru/api/games/sandbox?player1=${id1}&player2=${id2}`, {}, {
        headers: {
            Cookie: `wc.auth=${process.env.APIKEY}`
        }
    })
        .then((res) => {
            if (verbose) console.log('Response', res.data)
            return res.data;
        })
        .catch((error) => {
            console.error(error.response.data)
        })
}