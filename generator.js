module.exports = (api, options, rootOptions) => {
    // 安装一些基础公共库
    api.extendPackage({
        scripts: {
            "serve": "concurrently \"npm:mock\" \"vue-cli-service serve\"",
            "build:prod": "vue-cli-service build",
            "build:stage": "vue-cli-service build --mode staging",
            "lint": "vue-cli-service lint",
            "mock": "cd mock && ts-node-dev mock-server.ts",
            "svg": "vsvg -s ./src/icons/svg -t ./src/icons/components --ext ts --es6",
            "test:e2e": "vue-cli-service test:e2e",
            "test:unit": "jest --clearCache && vue-cli-service test:unit"
        },
        dependencies: {
            "@tinymce/tinymce-vue": "^3.0.1",
            "axios": "^0.19.0",
            "cors": "^2.8.5",
            "driver.js": "^0.9.7",
            "element-ui": "^2.12.0",
            "faker": "^4.1.0",
            "js-cookie": "^2.2.1",
            "morgan": "^1.9.1",
            "normalize.css": "^8.0.1",
            "nprogress": "^0.2.0",
            "path-to-regexp": "^3.0.0",
            "tinymce": "^5.0.14",
            "vue-i18n": "^8.14.0",
            "vue-svgicon": "^3.2.6",
            "vuex-class": "^0.3.2",
            "vuex-module-decorators": "^0.10.1",
            "yamljs": "^0.3.0"
        },
        devDependencies: {
            "@types/compression": "^1.0.1",
            "@types/cors": "^2.8.6",
            "@types/express": "^4.17.1",
            "@types/faker": "^4.1.5",
            "@types/jest": "^24.0.18",
            "@types/js-cookie": "^2.2.2",
            "@types/morgan": "^1.7.37",
            "@types/nprogress": "^0.2.0",
            "@types/tinymce": "^4.5.23",
            "@types/webpack-env": "^1.14.0",
            "@types/yamljs": "^0.2.30",
            "@vue/cli-plugin-e2e-cypress": "^3.11.0",
            "@vue/cli-plugin-unit-jest": "^3.11.0",
            "@vue/eslint-config-standard": "^4.0.0",
            "@vue/test-utils": "^1.0.0-beta.29",
            "babel-core": "^7.0.0-bridge.0",
            "babel-eslint": "^10.0.3",
            "concurrently": "^4.1.2",
            "jest": "^24.9.0",
            "lint-staged": "^9.2.5",
            "style-resources-loader": "^1.2.1",
            "swagger-routes-express": "^3.0.3",
            "ts-jest": "^24.0.2",
            "ts-node-dev": "^1.0.0-pre.42",
            "vue-cli-plugin-element": "^1.0.1",
            "vue-cli-plugin-style-resources-loader": "^0.1.3",
            "webpack": "^4.39.3"
        }
    });

    api.render('./template')
}
