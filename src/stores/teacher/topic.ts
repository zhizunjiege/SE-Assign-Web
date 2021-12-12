// import api, { User, Topic } from "~/api";
import { User, Topic } from "~/api";
import { getTimeString } from "~/utils";

// import { useUserStore } from "../user";

// const uS = useUserStore();

export const useTopicStore = defineStore("topic-teacher", {
  state: () => ({
    topic: {} as Topic,
    student: {} as User | null,
  }),
  actions: {
    async getTopic() {
      /* const res1 = await api.topic.getPublishedTopic({
        userId: uS.id,
      });
      this.topic = res1.data;
      const sid = res1.data.studentId;
      if (sid && sid >= 0) {
        const res2 = await api.user.getUser(sid);
        this.student = res2.data;
      } */
      this.topic = {
        id: 0,
        teacherId: 0,
        studentId: -1,
        title: "基于xxx的xxx",
        difficulty: "难",
        description: "这是一个测试课题~",
        requirement: "希望学生踏实能干，不要拖延",
        createTime: getTimeString(),
        updateTime: getTimeString(),
      };
      this.student = {
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
      };
    },
    async setTopic() {
      /* const tid = this.topic.id;
      if (tid && tid >= 0) {
        await api.topic.updateTopic(tid, this.topic);
      } else {
        const res = await api.topic.createTopic(this.topic);
        this.topic.id = res.data;
      } */
    },
  },
});
