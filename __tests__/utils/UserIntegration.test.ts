import { UserController } from '../../src/controller/UserController'
import { UserService } from '../../src/services/UserService'
import {request} from 'supertest'
import {expect, jest, test, describe, afterEach} from '@jest/globals'
import { Request, Response } from 'express';
import mocks from 'node-mocks-http'
import app from '../../src/app'


import { faker } from '@faker-js/faker';

function generateUserData(overide = {}) {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.datatype.number(),
    ...overide,
  }
}
function generateUserPayload() {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.datatype.number(),
  }
}

function generateUsersData(n: number = 1) {
  return Array.from({
    length: n
  }, (_, i) => {
    return generateUserData()
  });
}


afterEach(() => {
  jest.resetAllMocks()
})



const req = mocks.createRequest()
const res = mocks.createResponse()
const next = jest.fn();

const service =  new UserService()
const controller = new UserController();

describe("UserController", () => {

  describe("getUserById", () => {
    test("should return undrefind, missing id ", async () => {
      const spy = jest.spyOn(service, 'getUserById');
      spy.mockImplementation(() => Promise.resolve([{}]));
      const users = await controller.getUserById(req, res, next);
      
      expect(users).toEqual(undefined)
    })

    test("should return user from the database", async () => {
      const id = 1
      const userData = generateUserData({id})
      const spy = jest.spyOn(service, 'getUserById').mockResolvedValue(userData)
      const data = await service.getUserById(id);

      expect(data).toEqual(userData);
      expect(spy).toHaveBeenCalledWith(id);
      expect(spy).toHaveBeenCalledTimes(1);
    })
  })

  describe("createUser", () => {
    test("should add new user to the database", async () => {
      const payload = generateUserPayload()
      const userData = generateUserData(payload)
      const spy = jest.spyOn(service, 'createUser').mockResolvedValueOnce(userData)
      const user = await service.createUser(payload);

      expect(user).toMatchObject(payload)
      expect(user).toEqual(userData)
      expect(spy).toHaveBeenCalledWith(payload)
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe("updateUserById", () => {
    test("should update old user data to the database", async () => {
      const payload = generateUserPayload()
      const body = generateUserData(payload)
      const id = 1
      const userData = generateUserData({id})
      const spy = jest.spyOn(service, 'updateUserById').mockResolvedValueOnce(userData)
      const user = await service.updateUserById(id, body);

      expect(user).toBeTruthy()
      expect(user).toEqual(userData)
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })
})