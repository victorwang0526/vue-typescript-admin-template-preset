module.exports = (api, options, rootOptions) => {
    // 安装一些基础公共库
    api.extendPackage({
        dependencies: {
            "@capacitor/android": "^1.2.1",
            "@capacitor/cli": "^1.2.1",
            "@capacitor/core": "^1.2.1",
            "@capacitor/ios": "^1.2.1",
            "vant": "^2.2.16",
        },
        devDependencies: {
            "ts-import-plugin": "^1.6.1",
        }
    });

    // 配置文件
    api.render({
        './capacitor.config.json' : './template/capacitor.config.json',
    });

    if (options.template === 'vue-vant' || options.template === 'vue-vant-tabs') {
        // 复制并用 ejs 渲染 `./template` 内所有的文件
        api.render('./template/vue-vant')

        if(options.template === 'vue-vant-tabs') {
            api.render('./template/vue-vant-tabs')
        }
    }else if (options.template === 'vue-vant-ts' || options.template === 'vue-vant-tabs-ts') {
        // 复制并用 ejs 渲染 `./template` 内所有的文件
        api.render('./template/vue-vant-ts')

        if(options.template === 'vue-vant-tabs-ts') {
            api.render('./template/vue-vant-tabs-ts')
        }
    }
}
