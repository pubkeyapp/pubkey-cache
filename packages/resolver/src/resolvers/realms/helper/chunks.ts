export function chunks<T>(array: T[], size: number): T[][] {
    const result: Array<T[]> = [];
    let i, j;
    for (i = 0, j = array.length; i < j; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}
