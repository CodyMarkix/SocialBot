import { Request, Response } from 'express';
import { webServerRoute } from '../../interfaces/webServerRoute'; 
import { Client } from 'discord.js';
import { handleError } from '../errorhandler';

const main: webServerRoute = {
    alias: 'unbanUser',
    route: '/api/unbanuser',
    reqtype: 'post',
    
    async routePayload(req: Request, res: Response, client: Client) {
        if (req.method == 'POST') {
            if ('username' in req.query && 'sid' in req.query) {
                handleError(res, 501);
            }
        } else {
            handleError(res, 405);
        }
    }
}

module.exports = main;