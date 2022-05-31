const { clientAddonConfig } = require ("@vue/cli-ui");

module.exports = {
    ...clientAddonConfig ({
        id: "org.ruoyi.client-addon",
        port: 8042
    })
};
