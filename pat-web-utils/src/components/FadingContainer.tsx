import {createContext, CSSProperties, ReactNode, useContext, useMemo, useRef, useState} from "react";
import {useAnimationFrame} from "../hooks";
import bezier from "bezier-easing";
import {easingGradient} from "../easingGradient";
import {convertToRgba} from "../interpolateColor";

type ScrollPosition = { scrollTop: number, scrollBottom: number };
const scrollContext = createContext<ScrollPosition>(undefined!);

export type ScrollDirection = "horizontal" | "vertical";

const cubicBezier = bezier(0.4, 0, 0.6, 1);

type EasingFunction = (x: number) => number;

interface MaskProps {
    mode?: "mask",
    overlayColor?: string
}

interface OverlayProps {
    mode?: "overlay",
    overlayColor: string
}

type FadingContainerProps = {
    children?: ReactNode,
    scrollDirection?: ScrollDirection,
    fade?: string | number,
    fadeOnlyAfterScroll?: boolean
    className?: string,
    style?: CSSProperties,
    innerStyle?: CSSProperties,
    innerCls?: string,
    easingFunc?: (x: number) => number,
    [_: string]: any
} & (MaskProps | OverlayProps);

export function FadingContainer(
    {
        children,
        className,
        style,
        innerStyle,
        innerCls,
        scrollDirection = "vertical",
        fade = 100,
        fadeOnlyAfterScroll = true,
        mode = "mask",
        overlayColor,
        easingFunc = cubicBezier,
        ...rest
    }: FadingContainerProps
) {
    const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
        scrollTop: 0, scrollBottom: 0
    });
    // noinspection TypeScriptValidateTypes
    const scrollRef = useRef<HTMLDivElement>(null);

    const {scrollTop, scrollBottom} = scrollPosition;

    useAnimationFrame(() => {
        if (scrollRef.current) {
            const {scrollTop, offsetHeight, scrollHeight} = scrollRef.current;
            const scrollBottom = scrollHeight - offsetHeight - scrollTop;
            setScrollPosition({scrollTop, scrollBottom});
        }
    });

    const fadeColor = mode === "mask" ? "#000000" : overlayColor as string;
    const noFadeColor = mode === "mask" ? "#ffffff" : convertToRgba(overlayColor as string, 0);
    const gradientStart = (!fadeOnlyAfterScroll || scrollTop > 0) ? fadeColor : noFadeColor;
    const gradientEnd = (!fadeOnlyAfterScroll || scrollBottom > 0) ? fadeColor : noFadeColor;

    const linearGradient = useMemo(() => {
        if (typeof fade === "number") fade = `${fade}px`;
        const stop1 = fade;
        const stop2 = `calc(100% - ${fade})`;
        const gradient1 = easingGradient(gradientStart, noFadeColor, easingFunc as EasingFunction, "0%", stop1);
        const gradient2 = easingGradient(noFadeColor, gradientEnd, easingFunc as EasingFunction, stop2, "100%");
        const gradientDir = scrollDirection === "vertical" ? "to bottom" : "to right";
        return `linear-gradient(${gradientDir}, ${gradient1}, ${gradient2})`;
    }, [fade, fadeColor, noFadeColor, gradientStart, gradientEnd]);

    return <scrollContext.Provider value={scrollPosition}>
        <div
            style={{
                maskImage: mode === "mask" ? linearGradient : undefined,
                maskMode: mode === "mask" ? "luminance" : undefined,
                position: "relative",
                ...style,
            }}
            className={className}
        >
            <div
                style={{
                    overflowX: scrollDirection === "horizontal" ? "scroll" : "hidden",
                    overflowY: scrollDirection === "vertical" ? "scroll" : "hidden",
                    width: "100%",
                    height: "100%",
                    ...innerStyle
                }}
                ref={scrollRef}
                className={innerCls}
                {...rest}
            >
                {children}
            </div>

            {mode === "overlay" && <div
              style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  zIndex: 999,
                  background: linearGradient,
                  pointerEvents: "none"
              }}
            />}
        </div>
    </scrollContext.Provider>
}

export const useScrollPosition = () => useContext(scrollContext);