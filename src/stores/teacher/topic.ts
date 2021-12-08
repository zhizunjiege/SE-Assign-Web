import api, { User, Topic } from "~/api";

import { useUserStore } from "../user";

const uS = useUserStore();

export const useTopicStore = defineStore("topic-teacher", {
  state: () => ({
    topic: {} as Topic,
    student: {} as User,
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
        id: -1,
        teacherId: -1,
        studentId: 0,
        title: "",
        difficulty: "",
        description: "",
        requirement: "",
        createTime: "",
        updateTime: "",
      };
      this.student = {
        id: -1,
        role: "",
        username: "",
        password: "",
        name: "",
        gender: "",
        jobNum: "",
        class: "",
        title: "",
        major: "",
        email: "",
        resume: "",
      };
    },
    async setTopic() {
      /* const tid = this.topic.id;
      if (tid && tid >= 0) {
        await api.topic.updateTopic(tid, this.topic);
      } else {
        await api.topic.createTopic(this.topic);
      } */
    },
  },
});
