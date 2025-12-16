import { User } from "./user.entity";

describe("User Entity", () => {
  it("should create a user correctly", () => {
    const user = new User();
    user.name = "Demo User";
    user.email = "demo@example.com";
    user.password = "123456";

    expect(user.name).toBe("Demo User");
    expect(user.email).toBe("demo@example.com");
    expect(user.password).toBe("123456");
  });
});
