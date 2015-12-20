'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (_ref) {
    var t = _ref.types;

    return {
        visitor: {
            CallExpression: function(path) {
                var callee = path.node.callee;
                var modulePath = path.node.arguments[0];
                if (callee.type == 'Identifier' && callee.name == 'require') {
                    if (modulePath && modulePath.type == 'StringLiteral' && modulePath.value.indexOf('.') === 0) {
                        var filename = path.hub.file.log.filename;
                        console.log(filename);
                    }
                }
            }
        }
    };
};