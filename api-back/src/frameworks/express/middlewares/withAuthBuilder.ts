
import { Request, Response, NextFunction } from 'express';
import ResponseError from '../../common/ResponseError';
import ResponseRequest from '../../common/ResponseRequest';
import { verifyAccessTokenBuilder } from '../../../services/utils/token';


export const withAuthBuilder = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
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
  const decoded = verifyAccessTokenBuilder(token.toString());
  if (decoded) {
    //@ts-ignore
    req.id = decoded.id;
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