import { Request, Response } from 'express';
import { webServerRoute } from '../../interfaces/webServerRoute';
import { Client } from 'discord.js';

const main: webServerRoute = {
    alias: 'main',
    route: '/api',
    reqtype: 'get',
    
    async routePayload(req: Request, res: Response, client: Client) {
        let currdate = new Date();
        res.send(JSON.stringify(
            {
                status: 200,
                content: {
                    name: 'Social Bot',
                    author: ['CodyMarkix', 'A2noh'],
                    releasedate: '2021',
                    currenttime: `${currdate.getDate()}/${currdate.getMonth()}/${currdate.getFullYear()} ${currdate.getUTCHours()}:${currdate.getUTCMinutes()}:${currdate.getUTCSeconds()} UTC`
                }
            }
        ));
    }
}

module.exports = main;