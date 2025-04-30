import axios from 'axios';

export interface MergeSortResponse {
  data: number[],
  tempData?: number[] | null,
  comparing?: number[] | null;
  mergeRange?: [number, number] | null;
}

export interface MergeSortRequest {
  data: number[];
}

export const sendMergeSortData = async (params: MergeSortRequest): Promise<MergeSortResponse[]> => {
  const mockSteps: MergeSortResponse[] = [
    {
      data: [4, 3, 2, 1],
    },
    {
      data: [4, 3, 2, 1],
      comparing: [0, 1],
      mergeRange: [0, 1]
    },
    {
      data: [4, -1, 2, 1],
      tempData: [3],
      comparing: [0, 1],
      mergeRange: [0, 1]
    },
    {
      data: [-1, -1, 2, 1],
      tempData: [3, 4],
      comparing: [0, 1],
      mergeRange: [0, 1]
    },
    {
      data: [3, 4, 2, 1],
    },
    {
      data: [3, 4, 2, 1],
      comparing: [2, 3],
      mergeRange: [2, 3]
    },
    {
      data: [3, 4, 2, -1],
      tempData: [1],
      comparing: [2, 3],
      mergeRange: [2, 3]
    },
    {
      data: [3, 4, -1, -1],
      tempData: [1, 2],
      comparing: [2, 3],
      mergeRange: [2, 3]
    },
    {
      data: [3, 4, 1, 2]
    },
    {
      data: [3, 4, 1, 2],
      comparing: [0, 2],
      mergeRange: [0, 3]
    },
    {
      data: [3, 4, -1, 2],
      tempData: [1],
      comparing: [0, 3],
      mergeRange: [0, 3]
    },
    {
      data: [3, 4, -1, -1],
      tempData: [1, 2],
      mergeRange: [0, 3]
    },
    {
      data: [-1, 4, -1, -1],
      tempData: [1, 2, 3],
      mergeRange: [0, 3]
    },
    {
      data: [-1, -1, -1, -1],
      tempData: [1, 2, 3, 4],
      mergeRange: [0, 3]
    },
    {
      data: [1, 2, 3, 4]
    }

  ];

  return new Promise((resolve) => {
    setTimeout(() => resolve(mockSteps), 300);
  });

  // 实际请求接口时可以用以下方式：
  // const response = await axios.post('/api/algorithm/execute', params);
  // return response.data.steps;
};