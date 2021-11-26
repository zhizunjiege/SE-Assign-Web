export const useUserStore = defineStore("user", {
  state: () => ({
    id: -1, // 用户id
    group: "", // 权限组
    identity: "", // 身份角色

    username: "", // 用户名
    password: "", // 密码
    token: "", // 认证token

    // 共有信息
    name: "", // 姓名
    gender: "", // 性别
    jobNum: "", // 学/工号
    major: "", // 主修专业/研究方向
    email: "", // 邮箱
    resume: "", // 个人简介
    // 学生专有
    class: "", // 班级
    // 教师专有
    title: "", // 职称
  }),
});
