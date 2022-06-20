import { AppDataSource } from '../config';
import { User } from '../entity/User';
import {
  ICraeateUserRequestBody,
  UserRequestQuery,
  IUpdateUserBody,
  UserDataResponse,
  IUserResponse,
} from '../interface';


export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  /**
   * @property {Function} 
   * @discription Designed to get all user data. But when the function has a query parameter`
   *  starts to get user data by name.
   * @param query
   * @returns 
   */
  async getAllUsers(query: UserRequestQuery): Promise<UserDataResponse> {
    return (query !== 'undefined' 
      ? await this.userRepository.find({ where: { firstName: query }})
      : await this.userRepository.find()
    ) 
  }

  /**
   * @discription Designed to get user data by id.
   * @property {Function} getUserById
   * @param id 
   * @returns {IUser}
   */
  async getUserById(id: number): Promise<UserDataResponse> {
    return await this.userRepository.findOne({ where: { id }})
  }

  /**
   * @discription Designed to Create User.
   * @param {firstName, lastName, age} 
   * @returns {IUserResponse}
   */
  async createUser({ firstName, lastName, age }: ICraeateUserRequestBody): Promise<IUserResponse> {
    return await this.userRepository.save({ firstName, lastName, age });
  }

  /**
   * @discription Designed to Update User data.
   * @property {Function} updateUserById
   * @param {id, body} 
   * @returns {UserDataResponse}
   */
  async updateUserById(id: number, body: IUpdateUserBody): Promise<UserDataResponse> {
    const isUserId: Omit<UserDataResponse, 'IUser[]' | 'boolean'> = await this.getUserById(id);

    if(!isUserId) return false;
    await this.userRepository.update({ id }, body );

    return true;
  }

  /**
   * @discription Designed to Delete User.
   * @property {Function deleteUserById} 
   * @param {id}
   * @returns {UserDataResponse}
   */
  async deleteUserById(id: number): Promise<UserDataResponse> {
    const isUserId: Omit<UserDataResponse, 'IUser[]' | 'boolean'> = await this.getUserById(id);

    if(!isUserId) return false;
    await this.userRepository.delete(id);
    
    return true;
  }
}