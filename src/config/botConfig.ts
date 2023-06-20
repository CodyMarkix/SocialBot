import { readFileSync, existsSync } from 'fs';
import path from 'path';

export let configObject: object = existsSync(path.join(__dirname, '..', '..', 'botconfig.json')) ? JSON.parse(readFileSync(path.join(__dirname, '..', '..', 'botconfig.json'), 'utf-8')) : {
    nickname: "Social Bot Dev Branch"
    // promise this will be more full
};