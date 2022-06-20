import { Request, Response, NextFunction } from "express";
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import { UserService } from './../services/UserService';
import {
    AuthorizationJwt,
    ResponseData,
    userPayload,
    env,
} from "../config";
import { 
    UserDataResponse,
    UserRequestParamsId,
    UserRequestQuery,
    IAllUserResponse,
    ICreateUserResponse,
    ICreateUserRequestBody,
    IUserResponse,
    IGetUserByIdResponse,
    IUpdateUserByIdResponse,
    IUpdateUserByIdRequestBody,
    IDeleteUserByIdResponse,
    USRE_INFO,
} from '../interface';


export class UserController {
    private userService = new UserService();

    async token(request?: Request, response?: Response, next?: NextFunction) {
        const token = jwt.sign(userPayload, env.API_SECRET);

        response.send(token)
    }

    async getAllUsers(request?: Request , response?: Response, next?: NextFunction): Promise<IAllUserResponse> {
        try{
            AuthorizationJwt(request, response);

            const query: UserRequestQuery = String( request?.query?.query);
            const data: UserDataResponse = await this.userService.getAllUsers(query);
    
            if(!data) {
                next(createError(USRE_INFO.ID_ERROR));
                return;
            }
    
            return ResponseData(StatusCodes.OK, data, null);
        }
        catch(error) {
            next(createError(USRE_INFO.REQUEST_ERROR));
        }
    }

    async getUserById(request: Request, response: Response, next: NextFunction): Promise<IGetUserByIdResponse> {
        try {
            AuthorizationJwt(request, response);

            const id: UserRequestParamsId = parseInt(request?.params?.id);
            const data: UserDataResponse = await this.userService.getUserById(id);

            if(!data) {
                next(createError(USRE_INFO.ID_ERROR));
                return;
            }

            return ResponseData(StatusCodes.OK, data, null);
        }
        catch(error) {
            next(createError(USRE_INFO.REQUEST_ERROR));
        }
    }

    async createUser(request: Request, response: Response, next: NextFunction): Promise<ICreateUserResponse> {
        try {
            AuthorizationJwt(request, response);

            const body: ICreateUserRequestBody = request.body;
            const data: IUserResponse = await this.userService.createUser(body);

            if(!data) {
                next(createError(USRE_INFO.ID_ERROR));
                return;
            }

            return ResponseData(StatusCodes.OK, data, null);
        }
        catch(error) {
            next(createError(USRE_INFO.REQUEST_ERROR));
        }
    }

    async updateUserById(request: Request, response: Response, next: NextFunction): Promise<IUpdateUserByIdResponse> {
        try {
            AuthorizationJwt(request, response);

            const id: UserRequestParamsId = parseInt(request?.params?.id);
            const body: IUpdateUserByIdRequestBody = request.body;
            const data: UserDataResponse = await this.userService.updateUserById(id, body);

            if(!data) {
                next(createError(USRE_INFO.ID_ERROR));
                return;
            }

            return ResponseData(StatusCodes.OK, null, null, USRE_INFO.UPDATE_STATUS)
            
        }
        catch(error) {
            next(createError(USRE_INFO.REQUEST_ERROR));
        }
    }

    async deleteUserById(request: Request, response: Response, next: NextFunction): Promise<IDeleteUserByIdResponse> {
        try {
            AuthorizationJwt(request, response);

            const id: UserRequestParamsId = parseInt(request?.params?.id);
            const data: UserDataResponse = await this.userService.deleteUserById(id);

            if(!data) {
                next(createError(USRE_INFO.ID_ERROR));
                return;
            }

            return ResponseData(StatusCodes.OK, null, null, USRE_INFO.DELETE_STATUS);
        }
        catch(error) {
            next(createError(USRE_INFO.REQUEST_ERROR));
        }
    }
}