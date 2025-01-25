import { Json } from "../types/json";
type Target = "_replace" | "_blank" | "_self" | "_parent" | "_top";
type Dispatch<A> = (value: A, targetOrNewTab?: Target | boolean) => void;
type SetSearchParamStateAction<S> = S | ((prevState?: S) => S);
export declare function useSearchParam<T extends Json>(paramName: string, defaultValue: T, target?: Target): [T, Dispatch<SetSearchParamStateAction<T>>];
export declare function useSearchParam<T extends Json>(paramName: string, defaultValue: T, newTab?: boolean): [T, Dispatch<SetSearchParamStateAction<T>>];
export declare function useSearchParam<T extends Json>(paramName: string): [T | undefined, Dispatch<SetSearchParamStateAction<T | undefined>>];
export {};
