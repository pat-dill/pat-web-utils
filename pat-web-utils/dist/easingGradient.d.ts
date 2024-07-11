export type EasingFunction = (x: number) => number;
export declare function easingGradient(color1: string, color2: string, easeFunc: EasingFunction, from?: string, to?: string, stops?: number): string;
