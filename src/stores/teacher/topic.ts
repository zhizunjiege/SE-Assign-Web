import api, { User, Topic } from "~/api";

import { useUserStore } from "../user";

const uS = useUserStore();

export const useTopicStore = defineStore("topic-teacher", {
  state: () => ({
    topic: {} as Topic,
    student: {} as User | null,
  }),
  actions: {
    async getTopic() {
      const res1 = await api.topic.getPublishedTopic({
        userId: uS.id,
      });
      this.topic = res1.data;
      const sid = res1.data.studentId;
      if (sid && sid >= 0) {
        const res2 = await api.user.getUser(sid);
        this.student = res2.data;
      }
    },
    async setTopic() {
      const tid = this.topic.id;
      if (tid && tid >= 0) {
        await api.topic.updateTopic(tid, this.topic);
      } else {
        const res = await api.topic.createTopic(this.topic);
        this.topic.id = res.data;
      }
    },
  },
});
