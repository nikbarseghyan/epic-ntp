import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes'
import { 
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from "express";
import { 
  UserDataResponse, 
  IResponseData,
} from '../../interface'
import { env } from '../variable' 

export const ErrorHandler: ErrorRequestHandler = (error?: any, request?: Request, response?: Response, next?: NextFunction) => {
  // if (response.headersSent) return next(error);
  if (typeof error === 'string') {
    return response.status(400).json({
      status: response.statusCode,
      data: null,
      error: null,
      message: response
    });
  }

  if (error.name === 'UnauthorizedError') {
    return response.status(401).json({
      status: response.statusCode,
      data: null,
      error: null,
      message: 'Invalid Token'
    });
}
  
  response.send({
    status: response.statusCode,
    data: null,
    error: error,
  })
}

export const ValidationHandler = (error?: any , request?: Request, response?: Response) => {
    return response.status(response.statusCode).json({
      status: response.statusCode,
      data: null,
      error: error.array(),
    })
}

export const ResponseData = (status?: number, data?: UserDataResponse | null, error?: any, msg?: string | null): IResponseData => {
  return { status, data, error, msg};
}

export const VerifyToken = (request: Request, response?: Response, next?: NextFunction) => {
  const bearerHeader = request.headers['authorization'];

  if(typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];

    request.headers.authorization = bearerToken;

    next();
  } else {
    response.sendStatus(StatusCodes.UNAUTHORIZED);
  }
}

export const AuthorizationJwt = (request: Request, response?: Response, next?: NextFunction) => {
  const token: string = request?.headers?.authorization;

  jwt.verify(token, env.API_SECRET, (error, dec) => {
    if(typeof token === 'undefined' && error) return response.status(StatusCodes.UNAUTHORIZED).json({
      status: StatusCodes.UNAUTHORIZED,
      data: null,
      error: error,
    })
  })
}