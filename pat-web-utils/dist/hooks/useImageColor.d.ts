import { MutableRefObject } from "react";
export declare function useImageColor(imgRef: MutableRefObject<HTMLImageElement>): string | undefined;
export declare function useImageColorFromUrl(url: string | null | undefined): {
    color: string | null | undefined;
    isLoading: boolean;
    error: unknown;
    refetch: <TPageData>(options?: (import("react-query").RefetchOptions & import("react-query").RefetchQueryFilters<TPageData>) | undefined) => Promise<import("react-query").QueryObserverResult<string | null, unknown>>;
};
