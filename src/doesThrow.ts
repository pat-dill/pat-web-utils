export default function doesThrow(cb: (...args: any[]) => any, ...args: any[]): unknown | undefined {
    try {
        cb(...args);
        return;
    } catch (e) {
        return e;
    }
}
