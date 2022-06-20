export interface IUser {
  id?: number,
  firstName?: string,
  lastName?: string,
  age?: number,
};

export interface IResponse {
  status?: number;
  error?: { [key: string]: string } | null;
  msg?: string;
};

export type UserDataResponse = IUser | Array<IUser> | boolean;
export interface IUserResponse extends IUser {};

export interface IResponseData extends IResponse {
  data?: UserDataResponse;
};

export interface IAllUserResponse extends IResponse {
  data?: UserDataResponse;
};

export interface IUserResponseById extends IResponse {
  data?: IUser;
};

export interface IGetUserByIdResponse extends IResponse {};
export interface ICreateUserResponse extends IResponse {};
export interface IRemoveUserByIdResponse extends IUserResponse {};

export interface IUpdateUserByIdResponse extends IResponse {
  data?: UserDataResponse | null;
};

export interface IDeleteUserByIdResponse extends IResponse {
  data?: UserDataResponse | null;
};



