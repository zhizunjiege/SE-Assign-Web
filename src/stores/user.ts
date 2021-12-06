export const useUserStore = defineStore("user", {
  state: () => ({
    online: false, // 是否在线

    id: -1, // 用户id
    // group: "", // 权限组
    role: "教师", // 角色身份

    username: "hh", // 账号
    password: "hhhh", // 密码

    // 系统直接导入的信息
    name: "测试", // 姓名
    gender: "男", // 性别
    jobNum: "", // 学/工号
    class: "", // 班级，学生专有
    title: "", // 职称，教师专有
    // 需要用户完善的信息
    major: "", // 主修专业/研究方向
    email: "", // 邮箱
    resume: "", // 个人简介
  }),
  getters: {},
  actions: {
    async signIn() {},
    async signOut() {},
    async changePwd(oldPwd: string, newPwd: string) {},
    async changeDetails() {},

    async getUserInfo(userId: number) {},
  },
});
