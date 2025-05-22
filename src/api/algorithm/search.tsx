import Request from "..";

export interface Params {
    num: number;
    edges: Record<number, number[]>; 
    type: number;
}

export interface  StepResult{
    visited: number[]; // 0: 未访问, 1: 已访问
    edges: Record<number, number[]>; // 0: 无边, 1: 已访问
    tempEdge?: [number, number] | null; // 当前尝试访问的边

}

export const sendSearchData = async (params: Params): Promise<StepResult[]> => {
    const response = await Request.post('/algorithms/search', params);
    return response.data;
};