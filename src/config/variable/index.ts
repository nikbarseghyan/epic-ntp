export const env = {
	API_ENV: process.env.API_ENV || 'development',
	API_PORT: process.env.API_PORT || 3011,
    API_HOST: process.env.API_HOST || 'localhost',
    API_CONSOLE: `Server has started on port ${process.env.API_PORT}`,
    API_SECRET: "JWT_ACCESS_TOKEN_PUBLIC_KEY" || process.env.JWT_ACCESS_TOKEN_PUBLIC_KEY ,
    API_EXPIRESIN: 60 * 60,
};

export const userPayload = {
    firtname: "Selena",
    lastName: "Selena",
}