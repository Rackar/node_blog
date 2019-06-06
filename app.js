var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var multer = require("multer");
var fs = require("fs");
var jwt = require("jsonwebtoken"); // 使用jwt签名
var config = require("./config/index");

// var indexRouter = require("./routes/index");
var usersRouter = require("./routes/user/index");
var articlesRouter = require("./routes/article");
var apiRoutes = require("./routes/apiRoutes/api"); //需要token认证的路径
var imageRoutes = require("./routes/image");


var User = require("./models/user");

var app = express();
//设置允许跨域访问该服务.
app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行。jwt需Authorization
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Content-Type", "application/json;charset=utf-8");

  //header头信息设置结束后，结束程序往下执行，如果是options请求，直接返回204允许浏览器紧接着发复杂请求
  if (req.method.toLocaleLowerCase() === "options") {
    res.status(204);
    return res.json({}); //直接返回空数据，结束此次请求
  } else {
    next();
  }
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// 设置superSecret 全局参数for jwt
// app.set('superSecret', config.jwtsecret);

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//无需登录验证的
// app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/article", articlesRouter);



app.use('/getoneimage',imageRoutes)

// 文件上传插件 第一种方式通过

// var upload = multer({ dest: 'uploads/' })
// app.post('/profile', upload.single('avatar'), function (req, res, next) {
//     console.log(req.file)
//     // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
// })

// var storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function(req, file, cb) {
//     cb(null, file.fieldname + "-" + Date.now() + file.originalname);
//   }
// });
// var upload = multer({ storage: storage });
// app.post("/profile", upload.single("avatar"), function(req, res, next) {
//   console.log(req.file);
//   return res.send({ status: 0, msg: "上传成功", data: req.file });
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
// });

//token验证的
app.use("/api", apiRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
