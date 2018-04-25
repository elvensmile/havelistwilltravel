import {WorkingTimePipe} from "./working-time.pipe";

describe("WorkingTimePipe", () => {
  it("create an instance", () => {
    const pipe = new WorkingTimePipe();
    expect(pipe).toBeTruthy();
  });
});
