export type JsonPrimitive = string | number | boolean | null;
export type JsonMap = {
    [key: string]: JsonPrimitive | JsonMap | JsonArray;
};
export type JsonArray = Array<JsonPrimitive | JsonMap | JsonArray>;
export type Json = JsonPrimitive | JsonMap | JsonArray;
