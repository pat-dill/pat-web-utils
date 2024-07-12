import { CSSProperties, ReactNode } from "react";
type ScrollPosition = {
    scrollTop: number;
    scrollBottom: number;
};
export type ScrollDirection = "horizontal" | "vertical";
interface MaskProps {
    mode?: "mask";
    overlayColor?: string;
}
interface OverlayProps {
    mode?: "overlay";
    overlayColor: string;
}
type FadingContainerProps = {
    children?: ReactNode;
    scrollDirection?: ScrollDirection;
    fade?: string | number;
    fadeOnlyAfterScroll?: boolean;
    className?: string;
    style?: CSSProperties;
    innerStyle?: CSSProperties;
    innerCls?: string;
    easingFunc?: (x: number) => number;
    loadMore?: () => Promise<unknown>;
    onScroll?: (scrollStart: number) => void;
    [_: string]: any;
} & (MaskProps | OverlayProps);
export declare function FadingContainer({ children, className, style, innerStyle, innerCls, scrollDirection, fade, fadeOnlyAfterScroll, mode, overlayColor, easingFunc, loadMore, onScroll, ...rest }: FadingContainerProps): import("react/jsx-runtime").JSX.Element;
export declare const useScrollPosition: () => ScrollPosition;
export {};
