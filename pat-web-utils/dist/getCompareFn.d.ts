export type SortKey<T> = string | ((v: T) => any);
export type SortOrder = "asc" | "desc";
export type NullMode = "start" | "end";
export interface SortStep<T> {
    key: SortKey<T>;
    order?: SortOrder;
    nulls?: NullMode;
}
export declare function getCompareFn<T>(...sortKeys: (SortKey<T> | SortStep<T>)[]): (a: T, b: T) => number;
