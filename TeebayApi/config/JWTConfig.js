
const JWTConfig = {
    JWT_SECRET: process.env.JWT_SECRET || 'ef3d171d0fb5328c8c12f188e34b403a94bd4cf9600e34ac664280eebb6a1947',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || '3c0273f989ec034f8c',
    expiresIn: '1h', // Access token expiration time
    refreshExpiresIn: '7d', // Refresh token expiration time (adjust as needed)
};

module.exports = JWTConfig;