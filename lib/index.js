'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    return {
        visitor: {
            CallExpression: function CallExpression(path) {
                var callee = path.node.callee;

                var modulePath = path.node.arguments[0];
                var calleeIsRequire = callee.type == 'Identifier' && callee.name == 'require';
                var isRelativeModulePath = modulePath && modulePath.type == 'StringLiteral' && modulePath.value.indexOf('.') === 0;
                if (calleeIsRequire && isRelativeModulePath) {
                    var fromPath = path.hub.file.log.filename.split(_path.win32.sep).join(_path.posix.sep);
                    var toPath = modulePath.value;
                    var resolvedPath = _path.posix.join(fromPath, '..', toPath);
                    if (resolvedPath.indexOf('ng-src/') !== 0) {
                        throw new Error('babel-plugin-transform-catch-require: path must start with ng-src/: ' + resolvedPath);
                    }
                    resolvedPath = resolvedPath.replace('ng-src/', 'cloud/ng/');
                    modulePath.value = resolvedPath;
                }
            }
        }
    };
};

var _path = require('path');
