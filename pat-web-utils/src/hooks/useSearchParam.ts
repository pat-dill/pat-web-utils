import { Json } from "../types/json";
import doesThrow from "../doesThrow";
import { useEffect, useState } from "react";

type Dispatch<A> = (value: A, openInNewTab?: boolean) => void;
type SetSearchParamStateAction<S> = S | ((prevState?: S) => S);

function encodeParam(obj: Json): string {
    if (typeof obj === "string" && doesThrow(JSON.parse, obj)) {
        return obj;
    } else {
        return JSON.stringify(obj);
    }
}

function decodeParam(text?: string): Json | undefined {
    if (!text) return;

    try {
        return JSON.parse(text);
    } catch {
        return text;
    }
}

export function useSearchParam<T extends Json>(
    paramName: string,
    defaultValue: T
): [T, Dispatch<SetSearchParamStateAction<T>>];
export function useSearchParam<T extends Json>(
    paramName: string
): [T | undefined, Dispatch<SetSearchParamStateAction<T | undefined>>];

export function useSearchParam<T extends Json>(paramName: string, defaultValue?: T) {
    const getCurrentValue = () =>
        decodeParam((new URLSearchParams(window.location.search).get(paramName) as string) ?? undefined) as
            | T
            | undefined;
    const [currentState, setCurrentState] = useState<T | undefined>(getCurrentValue());

    useEffect(() => {
        const listener = () => setCurrentState(getCurrentValue());
        window.addEventListener("popstate", listener);
        return () => window.removeEventListener("popstate", listener);
    }, []);

    const setState: Dispatch<SetSearchParamStateAction<T>> = (value, openInNewTab) => {
        const params = new URLSearchParams(window.location.search);

        let newValue: T | undefined;
        if (typeof value === "function") {
            const cb = value as (prevState?: T) => T | undefined;
            newValue = cb(currentState);
        } else {
            newValue = value;
        }

        if (newValue === undefined || newValue === defaultValue) {
            params.delete(paramName);
        } else {
            params.set(paramName, encodeParam(newValue));
        }

        const newUrl = new URL(window.location.href);
        newUrl.search = params.toString();
        if (openInNewTab) {
            window.open(newUrl, "_blank");
        } else {
            window.history.pushState(undefined, "", newUrl);
            setCurrentState(newValue);
        }
    };

    return [currentState === undefined ? defaultValue : currentState, setState];
}
