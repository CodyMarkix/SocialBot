import { Request, Response } from 'express';
import { webServerRoute } from '../../interfaces/webServerRoute';
import { Client } from 'discord.js';
import crypto from 'crypto';
import { APIKeys } from '../../models/apikeys';
import { handleError } from '../errorhandler';

const main: webServerRoute = {
    alias: 'registerKey',
    route: '/api/registerkey',
    reqtype: 'post',
    
    routePayload(req: Request, res: Response, client: Client) {
        if (req.method == 'POST') {
            if ('keyOwner' in req.query && 'registrar' in req.query) {
                let newApikey = crypto.randomBytes(48)
                    .toString('base64')
                    .replace(/[\/+=]/g, '')
                    .split('')
                    .splice(0, 48)
                    .toString()
                    .replace(/[,]/g, '');
    
                const dateOfCreation = new Date();
        
                APIKeys.create({
                    keyOwner: req.query.keyOwner,
                    key: newApikey,
                    registrar: req.query.registrar,
                    registrationDate: dateOfCreation
                });
    
                res.send(JSON.stringify({status: '200', content: {
                    key: `${newApikey}`,
                    keyOwner: req.query.keyOwner,
                    registrar: req.query.registrar,
                    registrationDate: dateOfCreation
                }}));
            } else {
                handleError(res, 400);
            }
        } else {
            handleError(res, 405);
        }
    }
}

module.exports = main;