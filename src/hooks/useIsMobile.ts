import {useWindowSize} from "usehooks-ts";

export default function useIsMobile() {
    return useWindowSize().width < 768
}