import { User, Topic as TopicBase } from "~/api";

export interface Topic extends TopicBase {
  teacher: User | null;
}

export const useTopicStore = defineStore("topic", {
  state: () => ({
    list: [
      {
        id: -1,
        teacherId: -1,
        studentId: -1,
        title: "测试课题",
        difficulty: "难",
        description: "",
        requirement: "",
        createTime: "",
        updateTime: "",
        teacher: {} as User,
      },
    ],
  }),
  actions: {
    async getTopicList() {},
    async getSelectedTopic() {
      return {} as Topic;
    },
    async setSelectedTopic(id: number) {},
  },
});
