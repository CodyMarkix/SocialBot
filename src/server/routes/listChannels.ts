import { Request, Response } from 'express';
import { webServerRoute } from '../../interfaces/webServerRoute'; 
import { Client } from 'discord.js';
import { handleError } from '../errorhandler';

const main: webServerRoute = {
    alias: 'listChannels',
    route: '/api/channels',
    reqtype: 'get',
    
    async routePayload(req: Request, res: Response, client: Client) {
        if (req.method == 'GET') {
            if ('sid' in req.query) {
                let channelsListRaw = (await client.guilds.cache.get(req.query.sid as string))?.channels.cache;
                let channelsList: Array<string> = [];

                channelsListRaw?.forEach((item) => {
                    if (item.isTextBased() && item.parent != null) {
                        channelsList.push(item.name);
                    }
                })

                res.send(JSON.stringify({
                    status: 200,
                    content: {
                        msg: 'List of channels successfuly got!',
                        channels: channelsList
                    }
                }));
            } else {
                handleError(res, 400);
            }
        } else {
            handleError(res, 405);
        }
    }
}

module.exports = main;