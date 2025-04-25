import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "antd";
import { Info, Action } from "../../api/msg";
import { Login } from "../../api/login";
import styles from "./logincard.module.scss";
import { ScrollText } from 'lucide-react';

/**
 * 登录卡组件
 */
const LoginCard: FC = () => {
    // 基于编程方式进行路由导航
    const navigateTo = useNavigate();

    // 将用户名与密码记录到 state 中
    const [user, setUser] = useState<string>("");
    const [passwd, setPasswd] = useState<string>("");

    // 更新用户名
    const recordUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(e.target.value);
    };

    // 更新密码
    const recordPasswd = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswd(e.target.value);
    };

    // 登录处理
    const toLogin = async () => {
        // 向服务端发起登录请求
        const { errno, errmsg, userId } = await Login(user, passwd);
        if (errno !== 0) {
            Info(Action.error, errmsg);
            return;
        }
        // 登录成功，设置用户信息
        sessionStorage.setItem("userId", userId);
        Info(Action.navigate, "启程成功～");
        navigateTo("/siguoya");
    };

    //注册处理
    const toRegister = () => {

    };

    return (
        <Card hoverable className={styles.logincard}>
            <form className={styles.form}>
                <div className={styles.iconTitle}>
                    <ScrollText size={32} color="#fff" style={{ marginRight: "10px" }} />
                    <h2>英雄帖</h2>
                </div>
                <p className={styles.desc}>少侠，请留下名号，修习算法，闯荡江湖！</p>
                <input className={styles.input} type="text" placeholder="输入账号" onChange={recordUser} />
                <input className={styles.input} type="password" placeholder="输入密码" onChange={recordPasswd} />
                <input className={styles.loginBtn} type="button" value="提剑入门" onClick={toLogin} />
                <div className={styles.registerArea}>
                    <span>尚未拜入门下？</span>
                    <button className={styles.registerBtn} onClick={toRegister} type="button">入门拜师</button>
                </div>
            </form>
        </Card>
    );
};

export default LoginCard;