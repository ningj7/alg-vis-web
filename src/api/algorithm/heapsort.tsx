import Request from "..";

export interface Params {
    num: number;
    array: number[];
}

export interface StepResult {
    array: number[];          // 当前堆的状态
    comparingId?: number[];  // 当前正在比较的索引
    sortedIndex?: number;    // 表示从该下标开始（含）为已排好序部分
}

export const sendHeapSortData = async (params: Params): Promise<StepResult[]> => {
    const response = await Request.post('/algorithms/heapSort', params);
    return response.data;
};