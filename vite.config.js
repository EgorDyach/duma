var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
var aliasFolders = [
    "components",
    "type",
    "lib",
    "modules",
    "store",
    "hooks",
    "hocs",
    "assets",
    "layouts",
];
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: __assign(__assign({}, Object.fromEntries(aliasFolders.map(function (v) { return [
            "@".concat(v),
            "".concat(path.resolve(__dirname, "./src/".concat(v, "/"))),
        ]; }))), { "@public": "".concat(path.resolve(__dirname, "./public/")) }),
    },
});
