type AnimationCb = ({ time, delta }: {
    time: number;
    delta: number;
}) => any;
export declare function useAnimationFrame(cb: AnimationCb): void;
export {};
