import {useState} from "react";

export function useStopwatch(): [() => void, () => number, Date] {
    const [lapTime, setLapTime] = useState(new Date());
    const resetTimer = () => setLapTime(new Date());
    const getTime = () => new Date().valueOf() - lapTime.valueOf();
    return [resetTimer, getTime, lapTime];
}