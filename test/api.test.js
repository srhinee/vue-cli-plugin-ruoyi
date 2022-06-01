const ui = require("../ui/index.js");
const api = require("./setup.js");
describe("test vue ui api", () => {
  ui(api);
  let mock;

  it("should shared data is valid", () => {
    mock = api.setSharedData.mock;
    expect(mock.calls.length).toEqual(1);
    expect(mock.lastCall[0]).toEqual("org.ruoyi.sourceMap");
  });
  it("should describeConfig is valid", function () {
    mock = api.describeConfig.mock;
    expect(mock.lastCall[0].id).toEqual("org.ruoyi.config");
  });
  it("should clineAddon is valid", function () {
    mock = api.addClientAddon.mock;
    expect(mock.lastCall[0].id).toEqual("org.ruoyi.client-addon");
  });
  it("should addView is valid", function () {
    mock = api.addView.mock;
    expect(mock.lastCall[0].id).toEqual("org.ruoyi.view");
  });
});
