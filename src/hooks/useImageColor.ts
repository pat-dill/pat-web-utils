import {MutableRefObject, useEffect, useState} from "react";
import ColorThief from "colorthief";
import {rgbToHex} from "@/contrast";
import {useQuery} from "react-query";

const cf = new ColorThief();

const getImageColor = (img: HTMLImageElement) => {
    const [r, g, b] = cf.getColor(img);
    return rgbToHex(r, g, b);
}

export default function useImageColor(imgRef: MutableRefObject<HTMLImageElement>): string | undefined {
    const [color, setColor] = useState<string>();

    useEffect(() => {
        if (!imgRef.current) return;

        if (imgRef.current.complete) {
            setColor(getImageColor(imgRef.current));
        } else {
            imgRef.current.onload = () => {
                setColor(getImageColor(imgRef.current));
            }
        }
    }, [imgRef.current]);

    return color;
}

export function useImageColorFromUrl(url: string | null | undefined) {
    const {data, isLoading, error, refetch} = useQuery<string | null>(["image-color", url], () => {
        return new Promise<string | null>((resolve, reject) => {
            if (!url) {
                resolve(null);
                return;
            }

            let img = new Image();
            img.crossOrigin = "Anonymous";
            img.onload = () => {
                try {
                    resolve(getImageColor(img))
                } catch (e) {
                    reject(e);
                }
            };
            img.onerror = () => reject(new Error("Image failed to load"));
            img.src = url;
        })
    })

    return {color: data, isLoading, error, refetch}
}