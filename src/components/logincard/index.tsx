import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Select, Radio, message } from "antd";
import { Info, Action } from "../../api/msg";
import { Login, Register } from "../../api/login";
import styles from "./logincard.module.scss";
import { ScrollText } from "lucide-react";

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

const LoginCard: FC = () => {
    const navigateTo = useNavigate();

    const [account, setUser] = useState("");
    const [password, setPasswd] = useState("");

    const [showRegister, setShowRegister] = useState(false);
    const [newUser, setNewUser] = useState("");
    const [newPasswd, setNewPasswd] = useState("");
    const [nickname, setNickname] = useState("");
    const [avatar, setAvatar] = useState(avatarOptions[0].value);
    const [gender, setGender] = useState(0);

    const toLogin = async () => {
        const { code, message: msg, data } = await Login(account, password);
        if (code !== 200) {
            Info(Action.error, msg);
            return;
        }
        sessionStorage.setItem("jwt", data.jwt);
        Info(Action.navigate, "启程成功～");
        navigateTo("/siguoya");
    };

    const toRegister = () => {
        // 每次打开清空注册数据
        setNewUser("");
        setNewPasswd("");
        setNickname("");
        setAvatar(avatarOptions[0].value);
        setGender(0);
        setShowRegister(true);
    };

    const handleRegister = async () => {
        if (!nickname.trim()) {
            message.warning("请填写昵称");
            return;
        }
        if (!newUser.trim() || newUser.length < 4) {
            message.warning("账号至少 4 个字符");
            return;
        }
        if (!newPasswd.trim() || newPasswd.length < 6) {
            message.warning("密码至少 6 个字符");
            return;
        }

        const registerData = {
            avatarUrl: avatar,
            nickName: nickname,
            account: newUser,
            password: newPasswd,
            gender,
        };
        const { code, message: msg } = await Register(registerData);
        if (code !== 200) {
            Info(Action.error, msg);
            return;
        }

        Info(Action.success, `少侠「${nickname}」拜师成功！`);
        setShowRegister(false);
        setUser(newUser);      // 自动填充
        setPasswd(newPasswd);
    };

    return (
        <>
            <Card hoverable className={styles.logincard}>
                <form className={styles.form}>
                    <div className={styles.iconTitle}>
                        <ScrollText size={32} color="#fff" style={{ marginRight: "10px" }} />
                        <h2>英雄帖</h2>
                    </div>
                    <p className={styles.desc}>少侠，请留下名号，修习算法，闯荡江湖！</p>
                    <input className={styles.input} type="text" placeholder="输入账号" value={account} onChange={(e) => setUser(e.target.value)} />
                    <input className={styles.input} type="password" placeholder="输入密码" value={password} onChange={(e) => setPasswd(e.target.value)} />
                    <input className={styles.loginBtn} type="button" value="提剑入门" onClick={toLogin} />
                    <div className={styles.registerArea}>
                        <span>尚未拜入门下？</span>
                        <button className={styles.registerBtn} onClick={toRegister} type="button">入门拜师</button>
                    </div>
                </form>
            </Card>

            {showRegister && (
                <div className={styles.registerModal}>
                    <div className={styles.registerBox}>
                        <h3>拜师入门</h3>
                        <div className={styles.registerContent}>
                            <div className={styles.avatarPreview}>
                                <img src={avatar} alt="预览头像" />
                                <Select
                                    value={avatar}
                                    onChange={(value) => setAvatar(value)}
                                    options={avatarOptions}
                                    className={styles.select}
                                    dropdownStyle={{ backgroundColor: '#333', color: '#fff' }}
                                    dropdownMatchSelectWidth={false}
                                    style={{ width: 140 }}
                                />
                            </div>
                            <div className={styles.formFields}>
                                <Radio.Group
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className={styles.genderGroup}
                                >
                                    <Radio value={0} style={{ color: "#fff" }}>男</Radio>
                                    <Radio value={1} style={{ color: "#fff" }}>女</Radio>
                                </Radio.Group>
                                <input
                                    className={styles.input}
                                    type="text"
                                    placeholder="设定昵称"
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                />
                                <input
                                    className={styles.input}
                                    type="text"
                                    placeholder="设定账号（≥4位）"
                                    value={newUser}
                                    onChange={(e) => setNewUser(e.target.value)}
                                />
                                <input
                                    className={styles.input}
                                    type="password"
                                    placeholder="设置密码（≥6位）"
                                    value={newPasswd}
                                    onChange={(e) => setNewPasswd(e.target.value)}
                                />
                                <div className={styles.registerBtns}>
                                    <button className={styles.loginBtn} onClick={handleRegister}>拜师</button>
                                    <button className={styles.cancelBtn} onClick={() => setShowRegister(false)}>离开</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default LoginCard;