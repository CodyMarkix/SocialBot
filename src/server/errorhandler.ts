import { Request, Response } from 'express';

export function handleError(res: Response, code: number) {
    switch (code) {
        case 400:
            res.status(400);
            res.send(JSON.stringify({
                status: 400,
                content: 'Bad Request'
            }));
            break;

        case 401:
            res.status(401);
            res.send(JSON.stringify({
                status: 401,
                content: 'Unauthorized'
            }));
            break;
            
        case 403:
            res.status(403);
            res.send(JSON.stringify({
                status: 403,
                content: 'Forbidden'
            }));
            break;
        
        case 404:
            res.status(404);
            res.send(JSON.stringify({
                status: 404,
                content: 'Not Found'
            }));
            break;

        case 405:
            res.status(405);
            res.send(JSON.stringify({
                status: 405,
                content: 'Method not allowed'
            }));
            break;

        case 500:
            res.status(500);
            res.send(JSON.stringify({
                status: 500,
                content: 'Internal Server Error'
            }));
            break;

        case 501:
            res.status(501);
            res.send(JSON.stringify({
                status: 501,
                content: 'Not Implemented'
            }));
            break;

        default:
            res.send(JSON.stringify({
                status: 500,
                content: 'Internal Server Error'
            }));
            break;
    };
};
