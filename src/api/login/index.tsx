import Request from "..";

// 登录响应参数
export interface LoginResp {
    // 错误码 200——成功 其他——失败
    code: number
    // 错误信息
    message: string
    //用户主键ID
    data: {
        jwt: string;
    };
};

/**
 * @brief 向服务端发送登录请求
 * @param user ——用户名
 * @param passwd ——密码
 * @returns LoginResp
 */
export const Login = async (account: string, password: string): Promise<LoginResp> => {
    return Request.post("/auth/login", { "account": account, "password": password });
};

export interface RegisterReq {
    avatarUrl: string;
    nickName: string;
    gender: number;
    account: string;
    password: string;
}

export const Register = async (data: RegisterReq): Promise<LoginResp> => {
    return Request.post("/auth/register", data);
};