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
                    var fromPath = path.hub.file.log.filename.split(win32Path.sep).join(posixPath.sep);
                    var toPath = modulePath.value;
                    var resolvedPath = posixPath.join(fromPath, '..', toPath);
                    if (resolvedPath.indexOf('ng-src/') !== 0) {
                        return;
                    }
                    resolvedPath = resolvedPath.replace('ng-src/', 'cloud/ng/');
                    modulePath.value = resolvedPath;
                }
            }
        }
    };
}
