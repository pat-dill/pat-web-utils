const is = {
    hex: (a: string) => /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a),
    rgb: (a: string) => /^rgb\(/.test(a),
    col: (a: string) => is.hex(a) || is.rgb(a),
};

export const convertToRgba = (colour: string, alpha?: number) => {
    return is.hex(colour) ? hexToRgba(colour, alpha) : is.rgb(colour) ? rbgToRgba(colour, alpha) : colour;
};

const hexToRgba = (colour: string, alpha = 1) => {
    const match = colour.match(/\w\w/g);
    if (!match) throw new Error("invalid color");
    const [r, g, b] = match.map((x) => parseInt(x, 16));
    return `rgba(${r},${g},${b},${alpha ?? 1})`;
};

const rbgToRgba = (colour: string, alpha = 1) => {
    const [r, g, b] = colour.replace(/[^\d,]/g, "").split(",");
    return `rgba(${r},${g},${b},${alpha ?? 1})`;
};

const deconstructRgba = (rgba: string) => {
    return rgba
        .replace(/[^\d,]/g, "")
        .split(",")
        .map((x) => parseInt(x));
};

const formatRbga = (colour: { r: number; g: number; b: number; a: number }) => {
    return `rgba(${colour.r},${colour.g},${colour.b},${colour.a})`;
};

export const interpolateColor = (colourA: string, colourB: string, progress: number) => {
    const [r1, g1, b1, a1] = deconstructRgba(convertToRgba(colourA));
    const [r2, g2, b2, a2] = deconstructRgba(convertToRgba(colourB));
    return formatRbga({
        r: Math.round((r2 - r1) * progress + r1),
        g: Math.round((g2 - g1) * progress + g1),
        b: Math.round((b2 - b1) * progress + b1),
        a: (a2 - a1) * progress + a1,
    });
};
