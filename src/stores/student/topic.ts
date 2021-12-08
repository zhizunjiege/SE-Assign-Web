import api, { User, Topic as TopicBase } from "~/api";

import { useUserStore } from "../user";

const uS = useUserStore();
export interface Topic extends TopicBase {
  teacher: User;
}

export const useTopicStore = defineStore("topic-student", {
  state: () => ({
    list: [] as Topic[],
    chosen: {} as Topic,
  }),
  actions: {
    async getTopicList() {
      /* const res1 = await api.topic.getTopics([]);
      const res2 = await api.user.getUsers(res1.data.map((e) => e.teacherId!));
      this.list = res1.data.map((e, i) => ({
        ...e,
        teacher: res2.data[i],
      })); */

      this.list = [
        {
          id: -1,
          teacherId: -1,
          studentId: -1,
          title: "",
          difficulty: "",
          description: "",
          requirement: "",
          createTime: "",
          updateTime: "",
          teacher: {},
        },
      ]; // 测试数据
    },
    async getChosenTopic() {
      /* const res1 = await api.topic.getChosenTopic({
        userId: uS.id,
      });
      const res2 = await api.user.getUser(res1.data.teacherId!);
      this.chosen = {
        ...res1.data,
        teacher: res2.data,
      }; */
      this.chosen = {
        id: -1,
        teacherId: -1,
        studentId: -1,
        title: "",
        difficulty: "",
        description: "",
        requirement: "",
        createTime: "",
        updateTime: "",
        teacher: {},
      };
    },
    async setChosenTopic(topicId: number) {
      /* await api.topic.setChosenTopic({
        userId: uS.id,
        topicId: topicId,
      }); */
    },
  },
});
