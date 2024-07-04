import { CSSProperties, ReactNode } from "react";
type ScrollPosition = {
    scrollTop: number;
    scrollBottom: number;
};
export type ScrollDirection = "horizontal" | "vertical";
export declare function FadingContainer({ children, className, style, scrollDirection, fade, fadeOnlyAfterScroll, ...rest }: {
    className?: string;
    children?: ReactNode;
    scrollDirection?: ScrollDirection;
    fade?: string | number;
    fadeOnlyAfterScroll?: boolean;
    style?: CSSProperties;
    [_: string]: any;
}): import("react/jsx-runtime").JSX.Element;
export declare const useScrollPosition: () => ScrollPosition;
export {};
