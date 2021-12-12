// import api from "~/api";
// import { digestMessage } from "~/utils";

import { useAppStore } from "./app";

const aS = useAppStore();

export const useUserStore = defineStore("user", {
  state: () => ({
    id: -1, // 用户id
    role: "", // 角色身份
    username: "", // 账号
    password: "", // 密码
    name: "", // 姓名
    gender: "", // 性别
    jobNum: "", // 学/工号
    class: "", // 班级，学生专有
    title: "", // 职称，教师专有
    major: "", // 主修专业/研究方向
    email: "", // 邮箱
    resume: "", // 个人简介
  }),
  actions: {
    async signIn() {
      /* const hashPwd = await digestMessage(this.password);
      const res = await api.user.signIn({
        username: this.username,
        password: hashPwd,
      }); */
      const res = {
        data: {
          id: 0,
          role: "学生",
          username: "18371234",
          password: "",
          name: "张三",
          gender: "男",
          jobNum: "18371234",
          class: "180322",
          title: "",
          major: "自动化",
          email: "18371234@buaa.edu.cn",
          resume: "这是一个测试账号哟~",
        },
      };
      // const res = {
      //   data: {
      //     id: 0,
      //     role: "教师",
      //     username: "02121",
      //     password: "",
      //     name: "李四",
      //     gender: "男",
      //     jobNum: "02121",
      //     class: "",
      //     title: "教授",
      //     major: "无人机集群控制",
      //     email: "02121@buaa.edu.cn",
      //     resume: "这是一个测试账号哟~",
      //   },
      // };
      // const res = {
      //   data: {
      //     id: 0,
      //     role: "管理员",
      //     username: "8888",
      //     password: "",
      //     name: "ROOT",
      //     gender: "",
      //     jobNum: "",
      //     class: "",
      //     title: "",
      //     major: "",
      //     email: "",
      //     resume: "",
      //   },
      // };
      Object.assign(this.$state, res.data);
      aS.$patch({
        online: true,
      });
    },
    async signOut() {
      /* await api.user.signOut({
        username: this.username,
      }); */
      this.$reset();
      aS.$patch({
        online: false,
      });
    },

    async updatePassword(oldPwd: string, newPwd: string) {
      /* const oldPwdHash = await digestMessage(oldPwd);
      const newPwdHash = await digestMessage(newPwd);
      await api.user.updatePassword({
        userId: this.id,
        oldPwd: oldPwdHash,
        newPwd: newPwdHash,
      }); */
    },
    async updateDetails() {
      /* await api.user.updateUser(this.id, {
        email: this.email,
        resume: this.resume,
      }); */
    },
  },
});
