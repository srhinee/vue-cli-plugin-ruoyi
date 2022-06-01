const api = {};

api.getCwd = jest.fn(() => process.cwd() + "/test/mock");
api.setSharedData = jest.fn();
api.describeConfig = jest.fn();
api.addClientAddon = jest.fn();
api.addView = jest.fn();

module.exports = api;
