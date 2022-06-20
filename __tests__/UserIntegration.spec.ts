import { UserController } from './../src/controller/UserController';
// import express from 'express'
// import * as typeorm from 'typeorm';
// import * as request from 'supertest';
// import app from '../src/app';
// import {AppDataSource} from '../src/config'
// import {User} from '../src/entity/User'



test("should return pong message", async () => {
  const controller = new UserController();
  const response = await controller.getAllUsers();

	console.log(response)

	
  // expect(response.message).toBe("pong");
});
