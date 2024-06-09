import {interpolateColor} from "./interpolateColor";

export type EasingFunction = (x: number) => number;

export function easingGradient(color1: string, color2: string, easeFunc: EasingFunction,
                               from = "0%", to = "100%", stops = 15) {
    const results = [];
    for (let i = 0; i <= stops; i++) {
        const timeAlpha = i / stops;
        const colorAlpha = easeFunc(timeAlpha);
        results.push(`${interpolateColor(color1, color2, colorAlpha)} calc(((${to} - ${from}) * ${timeAlpha}) + ${from})`);
    }
    return results.join(", ");
}