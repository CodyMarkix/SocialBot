import { Request, Response } from 'express';
import { webServerRoute } from '../../interfaces/webServerRoute'; 
import { Client } from 'discord.js';
import { handleError } from '../errorhandler';
import { configObject } from '../../config/botConfig';

const main: webServerRoute = {
    alias: 'getBotConfig',
    route: '/api/config',
    reqtype: 'get',
    
    async routePayload(req: Request, res: Response, client: Client) {
        if (req.method == 'GET') {
                res.send(JSON.stringify({
                    status: 200,
                    content: configObject
                }));
        } else {
            handleError(res, 405);
        }
    }
}

module.exports = main;