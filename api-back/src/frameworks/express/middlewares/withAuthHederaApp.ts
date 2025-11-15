
import { Request, Response, NextFunction } from 'express';
import ResponseError from '../../common/ResponseError';
import ResponseRequest from '../../common/ResponseRequest';
import { verifyAccessTokenHederaApp } from '../../../services/utils/token';


export const withAuthHederaApp = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
  console.log(req.headers)
  if (!token) {
    return res.json(
      new ResponseRequest({
        status: 401,
        error: new ResponseError({
          error: 'Unauthorized',
          msg: 'Acces forbidden',
        }),
        content: null,
      }),
    );
  }
  
  const decodedHederaApp = verifyAccessTokenHederaApp(token.toString());

  if(decodedHederaApp) {
    //@ts-ignore
    req.id = decodedHederaApp.id
    next();
  } else {
      return res.json(
          new ResponseRequest({
            status: 401,
            error: new ResponseError({
              error: 'Unauthorized',
              msg: 'Acces forbidden',
            }),
            content: null,
          }),
      );
  }
  
};