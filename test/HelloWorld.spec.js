import { HelloWorld } from "src/client/js/components";

describe("Example test", () => {
  it("works", () => {
    expect(HelloWorld).toBeDefined();

    const component = new HelloWorld();
    expect(component).toBeDefined();
  });
});
