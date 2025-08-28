"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUpload = void 0;
var real_antivirus_package_1 = require("real-antivirus-package"); // استبدل بـ حزمة فحص حقيقي مثل ClamAV أو أي فحص آخر.
// فحص الفيروسات الحقيقي
var fileUpload = function (req, res, next) {
    var file = req.file;
    var scanner = new real_antivirus_package_1.AVScanner();
    scanner.scan(file, function (err, result) {
        if (err || !result.isSafe) {
            return res.status(400).json({ error: "File scan failed." });
        }
        // عملية الرفع هنا
        next();
    });
};
exports.fileUpload = fileUpload;
