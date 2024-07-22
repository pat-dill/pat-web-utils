"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSearchParam = void 0;
const doesThrow_1 = __importDefault(require("../doesThrow"));
const react_1 = require("react");
function encodeParam(obj) {
    if (typeof obj === "string" && (0, doesThrow_1.default)(JSON.parse, obj)) {
        return obj;
    }
    else {
        return JSON.stringify(obj);
    }
}
function decodeParam(text) {
    if (!text)
        return;
    try {
        return JSON.parse(text);
    }
    catch (_a) {
        return text;
    }
}
function useSearchParam(paramName, defaultValue) {
    const getCurrentValue = () => {
        var _a;
        return decodeParam((_a = new URLSearchParams(window.location.search).get(paramName)) !== null && _a !== void 0 ? _a : undefined);
    };
    const [currentState, setCurrentState] = (0, react_1.useState)(getCurrentValue());
    (0, react_1.useEffect)(() => {
        const listener = () => setCurrentState(getCurrentValue());
        window.addEventListener("popstate", listener);
        return () => window.removeEventListener("popstate", listener);
    }, []);
    const setState = (value, openInNewTab) => {
        const params = new URLSearchParams(window.location.search);
        let newValue;
        if (typeof value === "function") {
            const cb = value;
            newValue = cb(currentState);
        }
        else {
            newValue = value;
        }
        if (newValue === undefined || newValue === defaultValue) {
            params.delete(paramName);
        }
        else {
            params.set(paramName, encodeParam(newValue));
        }
        const newUrl = new URL(window.location.href);
        newUrl.search = params.toString();
        if (openInNewTab) {
            window.open(newUrl, "_blank");
        }
        else {
            window.history.pushState(undefined, "", newUrl);
            setCurrentState(newValue);
        }
    };
    return [currentState === undefined ? defaultValue : currentState, setState];
}
exports.useSearchParam = useSearchParam;
