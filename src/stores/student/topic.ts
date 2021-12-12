import api, { User, Topic as TopicBase } from "~/api";

import { useUserStore } from "../user";

const uS = useUserStore();
export interface Topic extends TopicBase {
  teacher: User;
}

export const useTopicStore = defineStore("topic-student", {
  state: () => ({
    list: [] as Topic[],
    chosen: {} as Topic | null,
  }),
  actions: {
    async getTopicList() {
      const res1 = await api.topic.getTopics([]);
      const res2 = await api.user.getUsers(res1.data.map((e) => e.teacherId!));
      this.list = res1.data.map((e, i) => ({
        ...e,
        teacher: res2.data[i],
      }));
    },
    async getChosenTopic() {
      const res1 = await api.topic.getChosenTopic({
        userId: uS.id,
      });
      const res2 = await api.user.getUser(res1.data.teacherId!);
      this.chosen = {
        ...res1.data,
        teacher: res2.data,
      };
    },
    async setChosenTopic(topicId: number) {
      await api.topic.setChosenTopic({
        userId: uS.id,
        topicId: topicId,
      });
      this.chosen = this.list.find((e) => e.id === topicId)!;
    },
  },
});
