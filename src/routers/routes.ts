import { UserController } from "../controller/UserController";
import { body, param, query } from "express-validator";
import { VerifyToken } from '../config';

export const Routes = [
    {
        method: "get",
        route: "/token",
        controller: UserController,
        action: "token",
        // authentication: true,
        VerifyToken,
        validation: [],
    }, 
    {
        method: "get",
        route: "/users",
        controller: UserController,
        authentication: true,
        VerifyToken,
        action: "getAllUsers",
        validation: [
            query('name')
            .optional()
            .isString()
            .isLength({ min: 3, max: 20})
            .matches(/^[a-zA-Z\s.,]+$/)
            .withMessage('Only letters'),
        ],
    }, 
    {
        method: "get",
        route: "/users/:id",
        controller: UserController,
        action: "getUserById",
        authentication: true,
        VerifyToken,
        validation: [
            param('id')
            .isInt()
            .withMessage('Id must be an Number'),
        ],
    },
    {
        method: "post",
        route: "/users",
        controller: UserController,
        authentication: true,
        VerifyToken,
        action: "createUser",
        validation: [
            body('firstName')
                .isString()
                .exists()
                .not().isEmpty()
                .isLength({ min: 3, max: 20})
                .withMessage('Please check your First Name length, it must contain 3-20 letters')
                .matches(/^[a-zA-Z\s.,]+$/)
                .withMessage('Please check your Last Name, because need Latin letters'),
            body('lastName')
                .isString()
                .isLength({ min: 3, max: 20})
                .withMessage('Please check your First Name length, it must contain 3-20 letters')
                .matches(/^[a-zA-Z\s.,]+$/)
                .withMessage('Please check your Last Name, because need Latin letters'),
            body('age')
                .isInt({ min: 18 , max: 99 })
                .withMessage('Your age doesn`t meet the requirements')
                .exists()
                .withMessage('Age must be an Integer'),
        ],
    }, 
    {
        method: "put",
        route: "/users/:id",
        authentication: true,
        controller: UserController,
        VerifyToken,
        action: "updateUserById",
        validation: [
            param('id')
            .if(param('id').exists())
            .not().isEmpty()
            .withMessage('Needed Id.')
            .isInt()
            .withMessage('Id must be an Number'),
            body('firstName')
                .isString()
                .exists()
                .isLength({ min: 3, max: 20})
                .withMessage('Please check your First Name length, it must contain 3-20 letters')
                .matches(/^[a-zA-Z\s.,]+$/)
                .withMessage('Please check your Last Name, because need Latin letters'),
            body('lastName')
                .isString()
                .isLength({ min: 3, max: 20})
                .withMessage('Please check your First Name length, it must contain 3-20 letters')
                .matches(/^[a-zA-Z\s.,]+$/)
                .withMessage('Please check your Last Name, because need Latin letters'),
            body('age')
                .isInt({ min: 18 , max: 99 })
                .withMessage("Your age doesn`t meet the requirements")
                .exists()
                .withMessage('Age must be an Integer'),
        ],
    },
    {
        method: "delete",
        route: "/users/:id",
        controller: UserController,
        authentication: true,
        VerifyToken,
        action: "deleteUserById",
        validation: [
            param("id")
            .isInt()
            .withMessage('Id must be an Number'),
        ],
    }
]