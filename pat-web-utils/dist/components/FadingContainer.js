"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useScrollPosition = exports.FadingContainer = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const hooks_1 = require("../hooks");
const bezier_easing_1 = __importDefault(require("bezier-easing"));
const easingGradient_1 = require("../easingGradient");
const interpolateColor_1 = require("../interpolateColor");
const useRollingAverage_1 = require("../hooks/useRollingAverage");
const scrollContext = (0, react_1.createContext)(undefined);
const cubicBezier = (0, bezier_easing_1.default)(0.4, 0, 0.6, 1);
function FadingContainer(_a) {
    var { children, className, style, innerStyle, innerCls, scrollDirection = "vertical", fade = 100, fadeOnlyAfterScroll = true, mode = "mask", overlayColor, easingFunc = cubicBezier, loadMore, onScroll } = _a, rest = __rest(_a, ["children", "className", "style", "innerStyle", "innerCls", "scrollDirection", "fade", "fadeOnlyAfterScroll", "mode", "overlayColor", "easingFunc", "loadMore", "onScroll"]);
    const [scrollPosition, setScrollPosition] = (0, react_1.useState)({
        scrollTop: 0,
        scrollBottom: 0,
    });
    // noinspection TypeScriptValidateTypes
    const scrollRef = (0, react_1.useRef)(null);
    const { scrollTop, scrollBottom } = scrollPosition;
    const [averageLoadTime, recordLoadTime] = (0, useRollingAverage_1.useRollingAverage)(5, 0.1);
    const isLoading = (0, react_1.useRef)(false);
    const loadAndRecord = () => __awaiter(this, void 0, void 0, function* () {
        if (!loadMore)
            return;
        const startTime = performance.now() / 1000;
        isLoading.current = true;
        try {
            yield loadMore();
        }
        catch (e) {
            console.error(e);
        }
        const finishTime = performance.now() / 1000;
        isLoading.current = false;
        recordLoadTime(finishTime - startTime);
    });
    const prevScrollTop = (0, react_1.useRef)(0);
    const prevApproachingBottom = (0, react_1.useRef)(false);
    (0, hooks_1.useAnimationFrame)(({ delta }) => {
        if (scrollRef.current) {
            const { scrollTop, offsetHeight, scrollHeight } = scrollRef.current;
            const scrollBottom = scrollHeight - offsetHeight - scrollTop;
            setScrollPosition({ scrollTop, scrollBottom });
            if (onScroll && scrollTop !== prevScrollTop.current) {
                onScroll(scrollTop);
            }
            const scrollSpeed = (scrollTop - prevScrollTop.current) / delta;
            prevScrollTop.current = scrollTop;
            const timeUntilBottom = scrollBottom / scrollSpeed;
            const approachingBottom = scrollSpeed > 0 && timeUntilBottom <= (averageLoadTime || 0) + 0.1;
            if (approachingBottom && !prevApproachingBottom.current && !isLoading.current) {
                prevApproachingBottom.current = true;
                loadAndRecord().then();
            }
            else if (!approachingBottom) {
                prevApproachingBottom.current = false;
            }
        }
    });
    const fadeColor = mode === "mask" ? "#000000" : overlayColor;
    const noFadeColor = mode === "mask" ? "#ffffff" : (0, interpolateColor_1.convertToRgba)(overlayColor, 0);
    const gradientStart = !fadeOnlyAfterScroll || scrollTop > 0 ? fadeColor : noFadeColor;
    const gradientEnd = !fadeOnlyAfterScroll || scrollBottom > 0 ? fadeColor : noFadeColor;
    const linearGradient = (0, react_1.useMemo)(() => {
        if (typeof fade === "number")
            fade = `${fade}px`;
        const stop1 = fade;
        const stop2 = `calc(100% - ${fade})`;
        const gradient1 = (0, easingGradient_1.easingGradient)(gradientStart, noFadeColor, easingFunc, "0%", stop1);
        const gradient2 = (0, easingGradient_1.easingGradient)(noFadeColor, gradientEnd, easingFunc, stop2, "100%");
        const gradientDir = scrollDirection === "vertical" ? "to bottom" : "to right";
        return `linear-gradient(${gradientDir}, ${gradient1}, ${gradient2})`;
    }, [fade, fadeColor, noFadeColor, gradientStart, gradientEnd]);
    return ((0, jsx_runtime_1.jsx)(scrollContext.Provider, Object.assign({ value: scrollPosition }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ style: Object.assign({ maskImage: mode === "mask" ? linearGradient : undefined, maskMode: mode === "mask" ? "luminance" : undefined, position: "relative" }, style), className: className }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ style: Object.assign({ overflowX: scrollDirection === "horizontal" ? "scroll" : "hidden", overflowY: scrollDirection === "vertical" ? "scroll" : "hidden", width: "100%", height: "100%" }, innerStyle), ref: scrollRef, className: innerCls }, rest, { children: children })), mode === "overlay" && ((0, jsx_runtime_1.jsx)("div", { style: {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        zIndex: 999,
                        background: linearGradient,
                        pointerEvents: "none",
                    } }))] })) })));
}
exports.FadingContainer = FadingContainer;
const useScrollPosition = () => (0, react_1.useContext)(scrollContext);
exports.useScrollPosition = useScrollPosition;
