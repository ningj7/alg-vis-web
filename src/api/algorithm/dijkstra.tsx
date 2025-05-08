import axios from "axios";

export interface DijkstraRequest {
    count: number;
    edges: number[][]; // 邻接矩阵，0 表示无边
    start: number; // 起点编号
}

export interface DijkstraStep {
    edges: number[][];
    dis: number[]; // 每一步的 dis 数组
    visited?: number[]; // 标记哪些点已访问，1 表示已访问
    visitedEdges?: number[]; // 本步标记的边（从 -> 到）
}

export const sendDijkstra = async (
    params: DijkstraRequest
): Promise<DijkstraStep[]> => {
    // 模拟数据，适用于 4 个点的情况
    const mockSteps: DijkstraStep[] = [
        {
            edges: [[0, 1, 2, 0], [0, 0, 0, 3], [0, 0, 0, 1], [0, 0, 0, 0]],
            dis: [0, Infinity, Infinity, Infinity],
            visited: [1, 0, 0, 0],
        },
        {
            edges: [[0, 1, 2, 0], [0, 0, 0, 3], [0, 0, 0, 1], [0, 0, 0, 0]],
            dis: [0, Infinity, Infinity, Infinity],
            visited: [1, 0, 0, 0],
            visitedEdges: [0, 1]
        },
        {
            edges: [[0, 1, 2, 0], [0, 0, 0, 3], [0, 0, 0, 1], [0, 0, 0, 0]],
            dis: [0, 1, Infinity, Infinity],
            visited: [1, 0, 0, 0],
        },
        {
            edges: [[0, 1, 2, 0], [0, 0, 0, 3], [0, 0, 0, 1], [0, 0, 0, 0]],
            dis: [0, 1, Infinity, Infinity],
            visited: [1, 0, 0, 0],
            visitedEdges: [0, 2]
        },
        {
            edges: [[0, 1, 2, 0], [0, 0, 0, 3], [0, 0, 0, 1], [0, 0, 0, 0]],
            dis: [0, 1, 2, Infinity],
            visited: [1, 0, 0, 0],
        },
        {
            edges: [[0, 1, 2, 0], [0, 0, 0, 3], [0, 0, 0, 1], [0, 0, 0, 0]],
            dis: [0, 1, 2, Infinity],
            visited: [1, 1, 0, 0],
        },
        {
            edges: [[0, 1, 2, 0], [0, 0, 0, 3], [0, 0, 0, 1], [0, 0, 0, 0]],
            dis: [0, 1, 2, Infinity],
            visited: [1, 1, 0, 0],
            visitedEdges: [1, 3]
        },
        {
            edges: [[0, 1, 2, 0], [0, 0, 0, 3], [0, 0, 0, 1], [0, 0, 0, 0]],
            dis: [0, 1, 2, 4],
            visited: [1, 1, 0, 0],
        },
        {
            edges: [[0, 1, 2, 0], [0, 0, 0, 3], [0, 0, 0, 1], [0, 0, 0, 0]],
            dis: [0, 1, 2, 4],
            visited: [1, 1, 1, 0],
        },
        {
            edges: [[0, 1, 2, 0], [0, 0, 0, 3], [0, 0, 0, 1], [0, 0, 0, 0]],
            dis: [0, 1, 2, 4],
            visited: [1, 1, 1, 0],
            visitedEdges: [2, 3]
        },
        {
            edges: [[0, 1, 2, 0], [0, 0, 0, 3], [0, 0, 0, 1], [0, 0, 0, 0]],
            dis: [0, 1, 2, 3],
            visited: [1, 1, 1, 0],
        },
        {
            edges: [[0, 1, 2, 0], [0, 0, 0, 3], [0, 0, 0, 1], [0, 0, 0, 0]],
            dis: [0, 1, 2, 3],
            visited: [1, 1, 1, 1],
        }

    ];

    return new Promise((resolve) => setTimeout(() => resolve(mockSteps), 300));

    // 实际请求时替换为：
    // const response = await axios.post('/api/graph/dijkstra', params);
    // return response.data.steps;
};