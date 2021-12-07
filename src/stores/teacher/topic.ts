import { User, Topic as TopicBase } from "~/api";

export interface Topic extends TopicBase {
  teacher: User | null;
}

export const useTopicStore = defineStore("topic-teacher", {
  state: () => ({
    id: -1,
    teacherId: -1,
    studentId: 0,
    title: "",
    difficulty: "",
    description: "",
    requirement: "",
    createTime: "",
    updateTime: "",
    student: {} as User,
  }),
  actions: {
    async getTopic() {},
    async setTopic() {},
  },
});
