import { Json } from "../types/json";
type Dispatch<A> = (value: A) => void;
type SetSearchParamStateAction<S> = S | ((prevState?: S) => S);
export declare function useSearchParamState<T extends Json>(paramName: string, defaultValue: T): [T, Dispatch<SetSearchParamStateAction<T>>];
export declare function useSearchParamState<T extends Json>(paramName: string): [T | undefined, Dispatch<SetSearchParamStateAction<T | undefined>>];
export {};
