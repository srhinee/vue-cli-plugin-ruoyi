const cwd = process.cwd() + "/test/mock";

jest.mock("fs", () => {
  return {
    readFileSync: jest.requireActual("fs").readFileSync,
    writeFileSync: jest.fn(),
  };
});
const fs = require("fs");
const { readConfig, writeConfig } = require("../ui/fileIO.js");

let prompts, list;
let api = {};

beforeAll(() => {
  prompts = readConfig({
    cwd,
    data: { setting: [], vue: { devServer: [] } },
  });
  list = [...prompts.tabs[0].prompts, ...prompts.tabs[1].prompts];
  api.setData = jest.fn();
  writeConfig({
    cwd,
    prompts: list,
    api,
  });
});
describe("test file read", () => {
  it("should read config return setting tab is valid", function () {
    let setting = prompts.tabs[0];
    expect(setting.id).toEqual("setting");
    expect(setting.prompts.length).toEqual(4);
  });
  it("should read config return setting tab is valid", function () {
    let env = prompts.tabs[1];
    expect(env.id).toEqual("environment");
    expect(env.prompts.length).toEqual(16);
  });
});

describe("test file write", () => {
  it("should write handle is valid", function () {
    expect(api.setData.mock.calls.length).toEqual(2);
    expect(api.setData.mock.calls[0][0]).toEqual("setting");
    expect(api.setData.mock.calls[1][0]).toEqual("vue");
    expect(fs.writeFileSync.mock.calls.length).toEqual(3);
  });
});
