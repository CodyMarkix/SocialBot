import { Request, Response } from 'express';
import { webServerRoute } from '../../interfaces/webServerRoute'; 
import { Client } from 'discord.js';
import { handleError } from '../errorhandler';

const main: webServerRoute = {
    alias: 'sendMessage',
    route: '/api/sendmsg',
    reqtype: 'post',
    
    async routePayload(req: Request, res: Response, client: Client) {
        if (req.method == 'POST') {
            console.log(req.query)
            //@ts-ignore
            client.channels.fetch(req.query.MsgChannel).then(e => e.send(req.query.MsgContent))
            res.send(JSON.stringify({status: 200, content: 'Posted message!'}));
        } else {
            handleError(res, 405);
        }
    }
}

module.exports = main;