import { Request, Response } from 'express';
import { Client } from 'discord.js';

export interface webServerRoute {
    alias: string,
    route: string,
    reqtype: 'get' | 'post' | 'put' | 'delete' | 'connect' | 'patch',
    routePayload(req: Request, res: Response, client: Client): void
}