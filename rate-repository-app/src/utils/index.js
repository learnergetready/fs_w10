export const numberInKs = (number) => {
    return number > 999
        ? (Math.round(number/100)/10)+"k"
        : number;
};