import { readFileSync, existsSync } from 'fs';
import path from 'path';

declare global {
    let configObject: object;
};

configObject = existsSync(path.join(__dirname, '..', '..', 'botconfig.json')) ? JSON.parse(readFileSync(path.join(), 'utf-8')) : {
    
};

export { configObject };