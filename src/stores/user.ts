import api from "~/api";
import { digestMessage } from "~/utils";

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
    studentClass: "", // 班级，学生专有
    title: "", // 职称，教师专有
    major: "", // 主修专业/研究方向
    email: "", // 邮箱
    resume: "", // 个人简介
  }),
  actions: {
    async signIn() {
      const hashPwd = digestMessage(this.password);
      const res = await api.user.signIn({
        username: this.username,
        password: hashPwd,
      });
      Object.assign(this.$state, res.data);
      aS.$patch({
        online: true,
      });
    },
    async signOut() {
      await api.user.signOut({
        username: this.username,
      });
      this.$reset();
      aS.$patch({
        online: false,
      });
    },

    async updatePassword(oldPwd: string, newPwd: string) {
      const oldPwdHash = digestMessage(oldPwd);
      const newPwdHash = digestMessage(newPwd);
      await api.user.updatePassword({
        userId: this.id,
        oldPwd: oldPwdHash,
        newPwd: newPwdHash,
      });
    },
    async updateDetails() {
      await api.user.updateUser(this.id, this.$state);
    },
  },
});
