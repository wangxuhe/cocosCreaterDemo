// 任务状态
export enum TASKSTATE {
    NONE = 0,         
    NOT_FINISH = 1,             // 未完成      
    FINISH_NOT_GET = 2,         // 完成未领取
    FINISH_GETTED = 3,          // 已领取
}

/*
任务测试配置表, 数据结构：
    iconImg: icon图片名
    name: 任务名字
    desc: 任务描述
    curNum: 当前完成数目
    maxNum: 最大完成数目
    state: 任务状态(1.未完成 2.完成为领取 3.已领取)
*/
export const taskConfigs = [
    {
        iconImg: "emoji1",
        name: "升级",
        desc: "玩家升级到15级",
        curNum: 1,
        maxNum: 10,
        state: 1,
    },
    {
        iconImg: "emoji2",
        name: "金币",
        desc: "玩家获取到10000金币",
        curNum: 12000,
        maxNum: 1000,
        state: 2,
    },
    {
        iconImg: "emoji3",
        name: "银币",
        desc: "玩家获取到20000金币",
        curNum: 1000,
        maxNum: 9000,
        state: 3,
    },
    {
        iconImg: "emoji1",
        name: "元宝",
        desc: "玩家获取到10000金币",
        curNum: 120000,
        maxNum: 10000,
        state: 2,
    },
    {
        iconImg: "emoji2",
        name: "装备",
        desc: "玩家拥有15件白色装备",
        curNum: 15,
        maxNum: 15,
        state: 1,
    },
    {
        iconImg: "emoji2",
        name: "装备",
        desc: "玩家拥有15件紫色装备",
        curNum: 5,
        maxNum: 15,
        state: 3,
    },
    {
        iconImg: "emoji2",
        name: "装备",
        desc: "玩家拥有15件紫色装备",
        curNum: 5,
        maxNum: 15,
        state: 3,
    },
    {
        iconImg: "emoji2",
        name: "装备",
        desc: "玩家拥有15件紫色装备",
        curNum: 5,
        maxNum: 15,
        state: 3,
    },
    {
        iconImg: "emoji2",
        name: "装备",
        desc: "玩家拥有15件紫色装备",
        curNum: 5,
        maxNum: 15,
        state: 3,
    },
    {
        iconImg: "emoji2",
        name: "装备",
        desc: "玩家拥有15件紫色装备",
        curNum: 5,
        maxNum: 15,
        state: 3,
    },
    {
        iconImg: "emoji2",
        name: "装备",
        desc: "玩家拥有15件紫色装备",
        curNum: 5,
        maxNum: 15,
        state: 3,
    },
];