import axios from 'axios';

export interface MergeSortResponse {
  data: {
    value: number;
    position: 'top' | 'bottom' | 'center';
  }[];
  comparing?: number[];
  mergeRange?: [number, number] | null;
}

export interface MergeSortRequest {
  data: number[];
}

export const sendMergeSortData = async (params: MergeSortRequest): Promise<MergeSortResponse[]> => {
  const mockSteps: MergeSortResponse[] = [
    {
      data: [
        { value: 4, position: 'top' },
        { value: 3, position: 'top' },
        { value: 2, position: 'top' },
        { value: 1, position: 'top' },
      ],
      mergeRange: [0, 1],
    },
    {
      data: [
        { value: 3, position: 'bottom' },
        { value: 4, position: 'bottom' },
        { value: 2, position: 'top' },
        { value: 1, position: 'top' },
      ],
      comparing: [0, 1],
      mergeRange: [0, 1],
    },
    {
      data: [
        { value: 3, position: 'bottom' },
        { value: 4, position: 'bottom' },
        { value: 2, position: 'top' },
        { value: 1, position: 'top' },
      ],
      mergeRange: [2, 3],
    },
    {
      data: [
        { value: 3, position: 'top' },
        { value: 4, position: 'top' },
        { value: 1, position: 'bottom' },
        { value: 2, position: 'bottom' },
      ],
      comparing: [2, 3],
      mergeRange: [2, 3],
    },
    {
      data: [
        { value: 1, position: 'bottom' },
        { value: 2, position: 'bottom' },
        { value: 3, position: 'bottom' },
        { value: 4, position: 'bottom' },
      ],
      mergeRange: [0, 3],
    },
    {
      data: [
        { value: 1, position: 'top' },
        { value: 2, position: 'top' },
        { value: 3, position: 'top' },
        { value: 4, position: 'top' },
      ],
      mergeRange: null,
    },
  ];

  return new Promise((resolve) => {
    setTimeout(() => resolve(mockSteps), 300);
  });

  // 实际请求接口时可以用以下方式：
  // const response = await axios.post('/api/algorithm/execute', params);
  // return response.data.steps;
};