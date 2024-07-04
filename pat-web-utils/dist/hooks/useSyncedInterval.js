"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSyncedInterval = void 0;
const react_1 = require("react");
function useSyncedInterval(cb, intervalMs, offsetMs = 0) {
    // Hook that runs a callback on an interval. Multiple instances of this
    // hook with the same interval will run in sync.
    const getCounter = () => Math.floor((new Date().valueOf() - offsetMs) / intervalMs);
    const requestRef = (0, react_1.useRef)();
    const counter = (0, react_1.useRef)(getCounter());
    const animate = () => {
        const newCount = getCounter();
        if (newCount !== counter.current) {
            try {
                const promise = new Promise(function (resolve) {
                    try {
                        cb();
                    }
                    catch (e) {
                        console.error(e);
                    }
                    resolve();
                });
                promise.then();
            }
            catch (e) {
                console.error(e);
            }
            counter.current = newCount;
        }
        requestRef.current = requestAnimationFrame(animate);
    };
    (0, react_1.useEffect)(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => {
            if (requestRef.current)
                cancelAnimationFrame(requestRef.current);
        };
    }, [cb, intervalMs, offsetMs]);
}
exports.useSyncedInterval = useSyncedInterval;
