import { Request, Response } from 'express';
import { webServerRoute } from '../../interfaces/webServerRoute';
import { Client } from 'discord.js';
import { APIKeys } from '../../models/apikeys';
import { handleError } from '../errorhandler';

const main: webServerRoute = {
    alias: 'registerKey',
    route: '/api/unregisterkey',
    reqtype: 'delete',
    
    routePayload(req: Request, res: Response, client: Client) {
        if (req.method == 'DELETE') {
            if ('keyToDelete' in req.query) {
                APIKeys.findAll({attributes: ['key']}).then(model => {
                    model.forEach((key) => {
                        if (req.query.keyToDelete == key.getDataValue('key')) {
                            APIKeys.destroy({where: { key: req.query.keyToDelete }});
                        }
                    });
                    res.send(JSON.stringify({
                        status: 200,
                        content: 'Key deleted successfuly!'
                    }))
                });
            } else {
                handleError(res, 400);
            }
        } else {
            handleError(res, 405);
        }
    }
}

module.exports = main;