import { useState } from "react";

export function useRollingAverage(
    sampleSize?: number,
    initialValue?: number
): [number | undefined, (value: number) => void] {
    const [values, setValues] = useState([]);

    const record = (value: number) => {
        const newValues = [...values, value];
        if (sampleSize && newValues.length > sampleSize) {
            newValues.splice(0, newValues.length - sampleSize);
        }
        setValues(newValues);
    };

    if (values.length === 0) {
        return [initialValue, record];
    }
    return [
        values.reduce((prev, cur) => prev + cur, 0) / values.length,
        record,
    ];
}
