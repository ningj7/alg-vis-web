import axios from "axios";

export interface HeapSortRequest {
    data: number[]; // 输入数组
}

export interface HeapSortStep {
    data: number[];          // 当前堆的状态
    comparingId?: number[];  // 当前正在比较的索引
    sortedIndex?: number;    // 表示从该下标开始（含）为已排好序部分
}

export const sendHeapSort = async (
    params: HeapSortRequest
): Promise<HeapSortStep[]> => {
    // 模拟步骤，适用于小数组
    const mockSteps: HeapSortStep[] = [
        {
            data: [4, 10, 3, 5, 1],
        },
        {
            data: [4, 10, 3, 5, 1],
            comparingId: [1, 4],
        },
        {
            data: [4, 10, 3, 5, 1],
            comparingId: [1, 3]
        },
        {
            data: [4, 10, 3, 5, 1],
            comparingId: [0, 2]
        },
        {
            data: [4, 10, 3, 5, 1],
            comparingId: [0, 1]
        },
        {
            data: [10, 4, 3, 5, 1],
            comparingId: [1, 4]
        },
        {
            data: [10, 4, 3, 5, 1],
            comparingId: [1, 3]
        },
        {
            data: [10, 5, 3, 4, 1],
        },
        {
            data: [10, 5, 3, 4, 1],
            comparingId: [0, 4]
        },
        {
            data: [1, 5, 3, 4, 10],
            sortedIndex: 4, // 
        }
    ];

    return new Promise(resolve => setTimeout(() => resolve(mockSteps), 300));

    // 实际请求示例（如果后端已准备）：
    // const response = await axios.post('/api/graph/heapSort', params);
    // return response.data.steps;
};