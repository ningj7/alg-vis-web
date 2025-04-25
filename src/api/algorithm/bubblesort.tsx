import axios from 'axios';

export interface AlgorithmRequest {
  algorithm: string;
  data: number[];
}

export interface StepResult {
  values: number[];
  curIndex: number | null;
  sortedTailIndex: number;
}

export const sendAlgorithmData = async (params: AlgorithmRequest): Promise<StepResult[]> => {
  const mockSteps: StepResult[] = [
    { values: [3, 4, 2, 1], curIndex: null, sortedTailIndex: 4 },
    { values: [3, 4, 2, 1], curIndex: 0, sortedTailIndex: 4 },
    { values: [3, 4, 2, 1], curIndex: 0, sortedTailIndex: 4 },
    { values: [3, 4, 2, 1], curIndex: 1, sortedTailIndex: 4 },
    { values: [3, 2, 4, 1], curIndex: 1, sortedTailIndex: 4 },
    { values: [3, 2, 4, 1], curIndex: 2, sortedTailIndex: 4 },
    { values: [3, 2, 1, 4], curIndex: 2, sortedTailIndex: 4 },
    { values: [3, 2, 1, 4], curIndex: 0, sortedTailIndex: 3 },
    { values: [2, 3, 1, 4], curIndex: 0, sortedTailIndex: 3 },
    { values: [2, 3, 1, 4], curIndex: 1, sortedTailIndex: 3 },
    { values: [2, 1, 3, 4], curIndex: 1, sortedTailIndex: 3 },
    { values: [2, 1, 3, 4], curIndex: 0, sortedTailIndex: 2 },
    { values: [1, 2, 3, 4], curIndex: 0, sortedTailIndex: 2 },
    { values: [1, 2, 3, 4], curIndex: null, sortedTailIndex: 1 },
    { values: [1, 2, 3, 4], curIndex: null, sortedTailIndex: 0 },
  ];
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockSteps), 300); // 模拟网络延迟
  });
  // const response = await axios.post('/api/algorithm/execute', params);
  // return response.data.steps; // 假设后端返回 { steps: [...] }
};