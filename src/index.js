import { posix as posixPath, win32 as win32Path } from 'path';

export default function () {
    return {
        visitor: {
            CallExpression(path) {
                var {callee} = path.node;
                var modulePath = path.node.arguments[0];
                var calleeIsRequire = callee.type == 'Identifier' && callee.name == 'require';
                var isRelativeModulePath = modulePath && modulePath.type == 'StringLiteral' && modulePath.value.indexOf('.') === 0;
                if (calleeIsRequire && isRelativeModulePath) {
                    var fromPath = path.hub.file.log.filename.replace(win32Path.sep, posixPath.sep);
                    var toPath = modulePath.value;
                    var resolvedPath = posixPath.join(fromPath, '..', toPath);
                    if (resolvedPath.indexOf('ng-src/') !== 0) {
                        throw new Error('babel-plugin-transform-catch-require: path must start with ng-src/');
                    }
                    resolvedPath = resolvedPath.replace('ng-src/', 'cloud/ng/');
                    console.log({fromPath, toPath, resolvedPath});
                    modulePath.value = resolvedPath;
                }
            }
        }
    };
}