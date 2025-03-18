import { expect } from "@fixtures/common.fixture";
import { testHelper } from "@helpers/test/test.helper";

testHelper.runSuite({
  name: "Todos controller, Get all",
  type: "api",
  tests: [
    {
      name: "Successful request and all properties are existed",
      test: async ({ api }) => {
        const { data: todos, status } = await api.app.typicode.todo.getAll();
        expect(status).toBe(200);
        todos.forEach(todo => {
          expect(todo).toHaveProperty("id");
          expect(todo).toHaveProperty("userId");
          expect(todo).toHaveProperty("title");
          expect(todo).toHaveProperty("completed");
        });
      },
    },
  ],
});
