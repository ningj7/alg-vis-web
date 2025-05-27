import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Popconfirm,message } from "antd";
import { GetUser, User } from "../../api/user";

import styles from "./usercard.module.scss";

/**
 * 用户身份组件
 */
const Comp: FC = () => {
    const navigateTo = useNavigate();

    const [user, setUser] = useState<User | null>(null);

    // 生命周期钩子函数
    useEffect(() => {
        const getAndSetUser = async () => {
            const res= await GetUser();
            if (res.code != 200) {
                message.error(res.message);
                return;
            }
            setUser(res.data);
        };
        getAndSetUser();
    }, []);

    // 注销
    const logout = () => {
        message.success("归隐成功~");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("account");
        setUser(null);
        navigateTo('/yingxiongtie');
    };



    return (
        <Card
            className={styles.usercard}
            cover={<img src={user?.avatarUrl} />}
        >
            <h3>姓名：{user?.nickName}</h3>
            <h3>身份: {user?.role == 0 ? "宗主" : "弟子"}</h3>
            <h3>状态: {user?.status == 0 ? "正常" : "异常"}</h3>
            <Popconfirm
                className={styles.popconfirm}
                overlayClassName={styles.popconfirmOverlay}
                placement="leftTop"
                title="确认归隐吗？"
                onConfirm={logout}
                okText="是"
                cancelText="否"
            >
                <button>归隐</button>
            </Popconfirm>

        </Card>
    )
};

export default Comp;