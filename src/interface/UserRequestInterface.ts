import { query } from 'express-validator';
import * as core from 'express-serve-static-core'
import { Request } from "express";
import { IUser } from './UserResponseInterface';

export interface TypedRequestQuery<T extends Query> extends Request {
    query: T
};

export interface Query extends core.Query {};

export interface ICreateUserRequestBody extends IUser {}
export interface ICraeateUserRequestBody extends IUser {}

export interface IUpdateUserBody extends Pick<IUser, 'firstName' | 'lastName' | 'age'> {}
export interface IUpdateUserByIdRequestBody extends Pick<IUser, 'firstName' | 'lastName' | 'age'> {}

export type UserRequestParamsId = number;

export type UserRequestQuery = string;
