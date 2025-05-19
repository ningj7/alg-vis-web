interface SortInput {
    num: number;
    array: number[];
}

export const parseInputForSort = (input: string): SortInput | null => {
    const lines = input.trim().split('\n').map(line => line.trim()).filter(line => line !== '');
    if (lines.length < 2) return null;

    const num = parseInt(lines[0], 10);
    if (!Number.isInteger(num) || num <= 0) return null;

    const array = lines[1].split(/\s+/).map(s => parseInt(s, 10));
    if (array.length !== num || array.some(n => !Number.isInteger(n) || n <= 0)) {
        return null;
    }

    return { num, array };
};