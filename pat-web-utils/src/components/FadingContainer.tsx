import {createContext, CSSProperties, ReactNode, useContext, useEffect, useMemo, useRef, useState} from "react";
import {useAnimationFrame} from "../hooks";
import bezier from "bezier-easing";
import {easingGradient} from "../easingGradient";

type ScrollPosition = { scrollTop: number, scrollBottom: number };
const scrollContext = createContext<ScrollPosition>(undefined!);

export type ScrollDirection = "horizontal" | "vertical";

const ease = bezier(0.4, 0, 0.6, 1);

export function FadingContainer(
    {
        children, style, scrollDirection = "vertical", fade = 100, fadeOnlyAfterScroll = true, ...rest
    }: {
        children?: ReactNode,
        scrollDirection?: ScrollDirection,
        fade?: string | number,
        fadeOnlyAfterScroll?: boolean
        style?: CSSProperties,
        [_: string]: any
    }
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

    const maskTop = (!fadeOnlyAfterScroll || scrollTop > 0) ? "#000000" : "#ffffff";
    const maskBottom = (!fadeOnlyAfterScroll || scrollBottom > 0) ? "#000000" : "#ffffff";

    const mask = useMemo(() => {
        if (typeof fade === "number") fade = `${fade}px`;
        const stop1 = fade;
        const stop2 = `calc(100% - ${fade})`;
        const gradient1 = easingGradient(maskTop, "#ffffff", ease, "0%", stop1);
        const gradient2 = easingGradient("#ffffff", maskBottom, ease, stop2, "100%");
        return `linear-gradient(to bottom, ${gradient1}, ${gradient2})`;
    }, [fade, maskTop, maskBottom]);

    return <scrollContext.Provider value={scrollPosition}>
        <div
            ref={scrollRef}
            style={{
                ...style,
                maskImage: mask,
                maskMode: "luminance",
                overflowX: scrollDirection === "horizontal" ? "scroll" : "hidden",
                overflowY: scrollDirection === "vertical" ? "scroll" : "hidden",
            }}
            {...rest}
        >
            {children}
        </div>
    </scrollContext.Provider>
}

export const useScrollPosition = () => useContext(scrollContext);