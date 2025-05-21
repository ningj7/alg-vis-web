interface SortInput {
    num: number;
    array: number[];
}

interface SearchInput {
    num: number;
    edges: Record<number, number[]>;
}

interface ShortestPathInput {
    num: number;
    edges: Record<number, number[][]>;
    start: number; // 起点编号
}

interface SpanningTreeInput {
    num:number;
    edges: Record<number, number[][]>;
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

export const parseInputForSearch = (input: string): SearchInput | null => {
    const lines = input.trim().split('\n').map(line => line.trim()).filter(line => line !== '');
    if (lines.length < 2) return null;

    const num = parseInt(lines[0], 10);
    if (!Number.isInteger(num) || num <= 0 || lines.length !== num) return null;

    const edges: Record<number, number[]> = {};

    for (let i = 1; i < lines.length; i++) {
        const [fromStr, toStr] = lines[i].split(/\s+/);
        const from = parseInt(fromStr, 10);
        const to = parseInt(toStr, 10);

        if (![from, to].every(n => Number.isInteger(n) && n >= 0 && n < num)) {
            return null;
        }

        if (!edges[from]) {
            edges[from] = [];
        }

        edges[from].push(to);
    }

    // 保证每个点都有定义（即使没有出边）
    for (let i = 0; i < num; i++) {
        if (!edges[i]) {
            edges[i] = [];
        }
    }

    return { num, edges };
};

export const parseInputForShortestPath = (input: string): ShortestPathInput | null => {
    const lines = input.trim().split('\n').map(line => line.trim()).filter(line => line !== '');
    if (lines.length < 2) return null;

    const [numStr, _mStr, startStr] = lines[0].split(/\s+/);
    const num = parseInt(numStr, 10);
    const m = parseInt(_mStr, 10);
    const start = parseInt(startStr, 10);
    console.log(num, m, start);
    console.log(lines.length);

    if (!Number.isInteger(num) || num <= 0 || !Number.isInteger(start) || start < 0 || start >= num || lines.length !== m + 1) {
        return null;
    }

    const edges: Record<number, number[][]> = {};

    for (let i = 1; i < lines.length; i++) {
        const [fromStr, toStr, weightStr] = lines[i].split(/\s+/);
        const from = parseInt(fromStr, 10);
        const to = parseInt(toStr, 10);
        const weight = parseInt(weightStr, 10);

        if (![from, to, weight].every(n => Number.isInteger(n))) {
            return null;
        }
        if (from < 0 || from >= num || to < 0 || to >= num || weight < 0) {
            return null;
        }

        if (!edges[from]) {
            edges[from] = [];
        }

        edges[from].push([to, weight]);
    }

    // 确保每个点都定义（即使没有出边）
    for (let i = 0; i < num; i++) {
        if (!edges[i]) {
            edges[i] = [];
        }
    }

    return { num, edges, start };
};

export const parseInputForSpanningTree = (input: string): SpanningTreeInput | null => {
    const lines = input.trim().split('\n').map(line => line.trim()).filter(line => line !== '');
    if (lines.length < 2) return null;

    const [numStr, mStr] = lines[0].split(/\s+/);
    const num = parseInt(numStr, 10);
    const m = parseInt(mStr, 10);

    if (!Number.isInteger(num) || !Number.isInteger(m) || num <= 0 || m < 0 || lines.length !== m + 1) {
        return null;
    }

    const edges: Record<number, number[][]> = {};

    for (let i = 1; i <= m; i++) {
        const [uStr, vStr, wStr] = lines[i].split(/\s+/);
        const u = parseInt(uStr, 10);
        const v = parseInt(vStr, 10);
        const w = parseInt(wStr, 10);

        if (![u, v, w].every(n => Number.isInteger(n)) || u < 0 || v < 0 || u >= num || v >= num || w < 0) {
            return null;
        }

        if (!edges[u]) edges[u] = [];
        if (!edges[v]) edges[v] = []; // 因为是无向边

        edges[u].push([v, w]);
        edges[v].push([u, w]);
    }

    // 确保每个点都有定义
    for (let i = 0; i < num; i++) {
        if (!edges[i]) {
            edges[i] = [];
        }
    }

    return { num, edges };
};