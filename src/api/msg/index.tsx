import { CSSProperties } from "react";
import { Image, message } from "antd";

export enum Action{
    navigate,
    guiyin,
    error,
    jieyue,
}

const messageStyle: CSSProperties = {
    padding: "10px",
    color: "black",
    fontSize: "9px",
    fontWeight: "bold",
    fontFamily: "Kaiti",
    fontStyle: "oblique 15deg",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
    transform: "scale(1.8)",
    backgroundColor: "transparent",
    borderRadius: "5px",
    border: "none",
    boxShadow: "none"
}

/**
 * @brief 提示信息输出
 * @param acion——执行动作
 * @param content——输出内容
 */
export const Info = (action : Action, content: string)=>{
    // 根据执行动作映射得到不同的图标
    let iconPath: string;
    switch (action){
        case Action.navigate:
            iconPath = "/img/qicheng.png";
            break;
        case Action.guiyin:
            iconPath = "/img/tuichu.png";
            break;
        case Action.error:
            iconPath = "/img/cuowu.png";
            break;
        case Action.jieyue:
            iconPath = "/img/icon-sds.jpeg";
            break;
    }
    message.info({
        content: content,
        style: messageStyle,
        icon: <Image src={iconPath} width={27} height={30}/>,
    });
};