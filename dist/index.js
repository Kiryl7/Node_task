"use strict";
exports.__esModule = true;
var dotenv_1 = require("dotenv");
var app_1 = require("./src/app");
dotenv_1.config();
app_1.app.listen(process.env.PORT, function () {
    console.log("Server start on http://localhost:" + process.env.PORT);
});
//# sourceMappingURL=index.js.map