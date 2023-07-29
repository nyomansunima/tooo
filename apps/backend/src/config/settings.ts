const settingConfiguration = () => ({
  port: process.env.PORT || 4000,
  jwt: {
    secret: process.env.AUTH_JWT_SECRET!,
    accessTokenExpiresIn: process.env.AUTH_ACCESS_TOKEN_EXPIRATION!,
    refreshTokenExpiresIn: process.env.AUTH_REFRESH_TOKEN_EXPIRATION!,
  },
})

export { settingConfiguration }
