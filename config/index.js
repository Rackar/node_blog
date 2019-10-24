module.exports = {
  network: {
    port: 3002
  },
  jwtsecret: 'wodeJwtsecret_needchangenow', //密码
  expiresIn: 60 * 60 * 24 * 1, //token过期时间
  database: '你的mongo库链接或者其他'
}
