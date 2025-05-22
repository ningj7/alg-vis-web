import Request from "..";

export interface Params {
    num: number;
    edges: Record<number, number[][]>;
    start: number; // 起点编号
}

export interface StepResult {
    edges: Record<number, number[][]>;
    dis: number[]; // 每一步的 dis 数组
    visited?: number[]; // 标记哪些点已访问，1 表示已访问
    visitedEdges?: number[]; // 本步标记的边（从 -> 到）
}
export const sendDijkstraData = async (params: Params): Promise<StepResult[]> => {
    const response = await Request.post('/algorithms/dijkstra', params);
    return response.data;
};