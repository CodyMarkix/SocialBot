import express, { Request, Response } from 'express';
import { readdirSync } from 'fs'; import path from 'path';
import { Client } from 'discord.js';
import { webServerRoute } from '../interfaces/webServerRoute';
import { APIKeys } from '../models/apikeys';

export class WebServer {
    exserver = express();
    disclient: Client;

    constructor(client: Client) { 
        this.disclient = client
    }

    registerRoutes() {
        for (let r of readdirSync(path.join(__dirname, 'routes'))) {
            let routePath = path.join(__dirname, 'routes', r);
            const route: webServerRoute = require(routePath);
            
            switch(route.reqtype) {
                case 'get':
                    this.exserver.get(route.route, (req: Request, res: Response) => {
                        res.header("Access-Control-Allow-Origin", "*");
                        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

                        let keylist: string[] = [];
                        
                        APIKeys.findAll({attributes: ['key']}).then(model => {
                            model.forEach((key) => {
                                keylist.push(key.getDataValue('key'))
                            });

                            if (req.query.key || '' in keylist) {
                                route.routePayload(req, res, this.disclient);
                            } else {
                                res.status(401);
                                res.send(JSON.stringify({
                                    status: 401,
                                    content: 'Unauthorized'
                                }));
                            }
                        });
                    });
                    break;
                
                case 'post':
                    this.exserver.post(route.route, (req: Request, res: Response) => {
                        res.header("Access-Control-Allow-Origin", "*");
                        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

                        let keylist: string[] = [];
                        
                        APIKeys.findAll({attributes: ['key']}).then(model => {
                            model.forEach((key) => {
                                keylist.push(key.getDataValue('key'))
                            });

                            if (req.query.key || '' in keylist) {
                                route.routePayload(req, res, this.disclient);
                            } else {
                                res.status(401);
                                res.send(JSON.stringify({
                                    status: 401,
                                    content: 'Unauthorized'
                                }));
                            }
                        });
                    });
                    break;
                
                case 'put':
                    this.exserver.put(route.route, (req: Request, res: Response) => {
                        res.header("Access-Control-Allow-Origin", "*");
                        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

                        let keylist: string[] = [];
                        
                        APIKeys.findAll({attributes: ['key']}).then(model => {
                            model.forEach((key) => {
                                keylist.push(key.getDataValue('key'))
                            });

                            if (req.query.key || '' in keylist) {
                                route.routePayload(req, res, this.disclient);
                            } else {
                                res.status(401);
                                res.send(JSON.stringify({
                                    status: 401,
                                    content: 'Unauthorized'
                                }));
                            }
                        });
                    });
                    break;

                case 'delete':
                    this.exserver.delete(route.route, (req: Request, res: Response) => {
                        res.header("Access-Control-Allow-Origin", "http://localhost:3001, http://localhost:5173");
                        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

                        let keylist: string[] = [];
                        
                        APIKeys.findAll({attributes: ['key']}).then(model => {
                            model.forEach((key) => {
                                keylist.push(key.getDataValue('key'))
                            });

                            if (req.query.key || '' in keylist) {
                                route.routePayload(req, res, this.disclient);
                            } else {
                                res.status(401);
                                res.send(JSON.stringify({
                                    status: 401,
                                    content: 'Unauthorized'
                                }));
                            }
                        });
                    })

                default:
                    break;
            }
        }
    }

    startServer(port: number) {
        this.exserver.listen(port);
        console.log(`Listening on ${port}`);
    }
}