import { Request, Response } from 'express';
import { Client } from 'discord.js';
import { webServerRoute } from '../../interfaces/webServerRoute';
import { handleError } from '../errorhandler';

const main: webServerRoute = {
    alias: 'changeNickname',
    route: '/api/changenick',
    reqtype: 'post',
    
    async routePayload(req: Request, res: Response, client: Client) {
        if (req.method == 'POST') {
            if ('key' in req.query && 'newnick' in req.query) {
                client.user?.setUsername(`${req.query.newnick}`)
                    .then(err => {
                        res.send(JSON.stringify({
                            status: 200,
                            content: {
                                msg: 'Nick successfully set!',
                                newnick: req.query.newnick
                            }
                        }));
                    })
                    .catch(err => {
                        handleError(res, 403);
                    });
            } else {
                handleError(res, 400);
            }
        } else {
            handleError(res, 405)
        }
    }
}

module.exports = main;