"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useImageColorFromUrl = exports.useImageColor = void 0;
const react_1 = require("react");
const colorthief_1 = __importDefault(require("colorthief"));
const contrast_1 = require("../contrast");
const react_query_1 = require("react-query");
const cf = new colorthief_1.default();
const getImageColor = (img) => {
    const [r, g, b] = cf.getColor(img);
    return (0, contrast_1.rgbToHex)(r, g, b);
};
function useImageColor(imgRef) {
    const [color, setColor] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        if (!imgRef.current)
            return;
        if (imgRef.current.complete) {
            setColor(getImageColor(imgRef.current));
        }
        else {
            imgRef.current.onload = () => {
                setColor(getImageColor(imgRef.current));
            };
        }
    }, [imgRef.current]);
    return color;
}
exports.useImageColor = useImageColor;
function useImageColorFromUrl(url) {
    const { data, isLoading, error, refetch } = (0, react_query_1.useQuery)(["image-color", url], () => {
        return new Promise((resolve, reject) => {
            if (!url) {
                resolve(null);
                return;
            }
            let img = new Image();
            img.crossOrigin = "Anonymous";
            img.onload = () => {
                try {
                    resolve(getImageColor(img));
                }
                catch (e) {
                    reject(e);
                }
            };
            img.onerror = () => reject(new Error("Image failed to load"));
            img.src = url;
        });
    });
    return { color: data, isLoading, error, refetch };
}
exports.useImageColorFromUrl = useImageColorFromUrl;
