import 'dotenv/config';
import express from "express";
import bodyParser from "body-parser";
import morgan from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { validationResult } from 'express-validator';
import { Request, Response } from "express";

import { Routes } from "./routers/routes";
import { ErrorHandler, ValidationHandler } from './config';
import * as swaggerDocument from './config/swagger/swagger.json'

const app = express();
app.use(morgan('dev'));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(bodyParser.json());
app.use(cors());

Routes.forEach(route => {
  app[route.method](route.route, ...route.validation,
    async (request?: Request, response?: Response, next?: Function) => {
      try {
        const error = validationResult(request);

        if(!error.isEmpty()) return ValidationHandler(error, request, response);
          
        const data = await (new (route.controller as any))[route.action](request, response, next);

        response.json(data);
      } catch(error) {
        next(error);
      }
    })
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(ErrorHandler);

export default app;