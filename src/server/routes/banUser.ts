import { Request, Response } from 'express';
import { webServerRoute } from '../../interfaces/webServerRoute'; 
import { Client } from 'discord.js';
import { handleError } from '../errorhandler';

const main: webServerRoute = {
    alias: 'banUser',
    route: '/api/banuser',
    reqtype: 'post',
    
    async routePayload(req: Request, res: Response, client: Client) {
        if (req.method == 'POST') {
            if ('username' in req.query && 'sid' in req.query && 'reason' in req.query) {
                client.guilds.cache.get(req.query.sid as string)?.members.fetch().then(m => {
                    m.forEach(item => {
                        if (item.user.username == req.query.username) {
                            console.log(item.user.username);
                            item.createDM().then(channel => {
                                channel.send(`Byl jsi zabanován! Důvod: ${req.query.reason as string || 'nespecifikován'}`)
                            });
                            item.ban({reason: req.query.reason as string || ''});
                        }
                    })
                });
                
                res.send(JSON.stringify({
                    status: 200,
                    content: {
                        msg: 'Banned successfully!',
                        bannedUser: req.query.username
                    }
                }))
            } else {
                handleError(res, 400);
            }
        } else {
            handleError(res, 405);
        }
    }
}

module.exports = main;