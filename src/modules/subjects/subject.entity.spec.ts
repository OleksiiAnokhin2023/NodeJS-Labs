import { Subject } from "./subject.entity";

describe("Subject Entity", () => {
  it("should create a subject correctly", () => {
    const subject = new Subject();
    subject.title = "Math";
    expect(subject.title).toBe("Math");
  });
});
