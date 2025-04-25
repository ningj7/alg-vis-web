// src/services/user.ts
export enum UserStatus {
    Normal = 0,
    Abnormal = 1
  }
  
  export interface User {
    id: number;
    avatarUrl: string;
    nickName: string;
    studentNumber: string;
    role:UserStatus;
    status: UserStatus;
    createTime: string;
    updateTime: string;
  }
  
  export interface UserListResponse {
    errno: number;
    errmsg: string;
    data: User[];
    total: number;
  }
  
  export const GetUsers = async (
    params: {
      page?: number;
      pageSize?: number;
    }
  ): Promise<UserListResponse> => {
    // 模拟数据
    return {
      errno: 0,
      errmsg: "success",
      data: [
        {
          id: 1,
          avatarUrl: "http://stz4qtq7j.hn-bkt.clouddn.com/cae4e872904800a89de5a49d628671fe.jpeg?e=1745070914&token=u3VlIXDm55LLiax5RIVxFMHjz601gXy0fHGDQdjT:ArE4gF9D7_zHApC-ImLlTpf7auw=",
          nickName: "admin",
          studentNumber: "admin-001",
          role: UserStatus.Normal,
          status: UserStatus.Normal,
          createTime: "2025-01-01",
          updateTime: "2025-12-01"
        },
      ],
      total: 20
    };
  };