import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Popconfirm, message, Input, Select } from "antd";
import { GetUser, User } from "../../api/user";
import { UpdateUser } from "../../api/usertable";

import styles from "./usercard.module.scss";

const avatarOptions = [
    { label: '头像1', value: 'http://swcdmmvtq.hd-bkt.clouddn.com/a1.jpeg?...' },
    { label: '头像2', value: 'http://swcdmmvtq.hd-bkt.clouddn.com/a2.jpeg?...' },
    { label: '头像3', value: 'http://swcdmmvtq.hd-bkt.clouddn.com/a3.jpeg?...' },
    { label: '头像4', value: 'http://swcdmmvtq.hd-bkt.clouddn.com/a4.jpeg?...' },
    { label: '头像5', value: 'http://swcdmmvtq.hd-bkt.clouddn.com/a5.webp?...' },
    { label: '头像6', value: 'http://swcdmmvtq.hd-bkt.clouddn.com/a6.webp?...' },
    { label: '头像7', value: 'http://swcdmmvtq.hd-bkt.clouddn.com/a7.jpg?...' },
    { label: '头像8', value: 'http://swcdmmvtq.hd-bkt.clouddn.com/a8.webp?...' },
];

const Comp: FC = () => {
    const navigateTo = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [formVisible, setFormVisible] = useState(false);
    const [formData, setFormData] = useState({ avatarUrl: "", nickName: "", password: "" });

    useEffect(() => {
        const getAndSetUser = async () => {
            const res = await GetUser();
            if (res.code !== 200) {
                message.error(res.message);
                return;
            }
            setUser(res.data);
        };
        getAndSetUser();
    }, []);

    const logout = () => {
        message.success("归隐成功~");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("account");
        setUser(null);
        navigateTo("/yingxiongtie");
    };

    const openForm = () => {
        if (!user) return;
        setFormData({
            avatarUrl: avatarOptions[0].value, // 默认头像
            nickName: user.nickName,
            password: "",
        });
        setFormVisible(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { password } = formData;
        // 密码不为空时才校验
        if (password) {
            if (password.length < 6) {
                message.warning("密码至少需要 6 位！");
                return;
            }
            if (!/[a-zA-Z]/.test(password)) {
                message.warning("密码中必须包含字母！");
                return;
            }
        }
        const res = await UpdateUser({ id: -1, ...formData });
        if (res === 0) {
            message.error("更新失败，请稍后再试");
            setFormVisible(false);
            return;
        }
        message.success("更新成功！");
        const res1 = await GetUser();
        if (res1.code !== 200) {
            message.error(res1.message);
            return;
        }
        if (password) {
            message.success("密码已更新，请重新登录");
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("account");
            navigateTo("/yingxiongtie");
            return;
        }
        setUser(res1.data);
        setFormVisible(false);
    };

    return (
        <>
            <Card className={styles.usercard}
                cover={
                    <div className={styles.avatarWrapper}>
                        <img src={user?.avatarUrl} className={styles.avatar} />
                        <div className={styles.centerEditBtn} onClick={openForm}>✏</div>
                    </div>
                }
            >
                <h3>姓名：{user?.nickName}</h3>
                <h3>身份: {user?.role === 0 ? "长老" : "弟子"}</h3>
                <h3>状态: {user?.status === 0 ? "正常" : "异常"}</h3>

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

            {formVisible && (
                <div className={styles.customModal}>
                    <div className={styles.modalContent}>
                        <h2>修改侠客信息</h2>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.avatarPreview}>
                                <img src={formData.avatarUrl} alt="头像预览" />
                            </div>
                            <label>选择头像</label>
                            <Select
                                value={formData.avatarUrl}
                                onChange={(val) => setFormData({ ...formData, avatarUrl: val })}
                                options={avatarOptions}
                            />
                            <label>昵称</label>
                            <Input
                                value={formData.nickName}
                                onChange={(e) => setFormData({ ...formData, nickName: e.target.value })}
                            />
                            <label>输入新密码</label>
                            <Input.Password
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            <div className={styles.modalButtons}>
                                <button type="submit">保存修改</button>
                                <button type="button" onClick={() => setFormVisible(false)}>取消</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Comp;