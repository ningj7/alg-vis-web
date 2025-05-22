import Request from "..";

export interface Params {
    num: number;
    edges: Record<number, number[][]>; 
    type: number;
}

export interface  StepResult{
    edges: Record<number, number[][]>; // 0: 无边, 1: 已访问
    visited: number[]; // 0: 未访问, 1: 已访问
    edgeStatus: number[][] | null; // 当前尝试访问的边
    totalWeight: number; // 当前总权重
}

export const sendSpanningTreeData = async (params: Params): Promise<StepResult[]> => {
    const response = await Request.post('/algorithms/spanningTree', params);
    return response.data;
};