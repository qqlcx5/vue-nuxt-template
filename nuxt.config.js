import config from './config'

export default {
    // 静态服务部署 GITHUB
    // router: {
    //   base: '/vue-nuxt-template/',
    // },
    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: 'saas',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content:
                    'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no',
            },
            {
                hid: 'description',
                name: 'description',
                content: config['site.description'],
            },
            {
                hid: 'keywords',
                name: 'keywords',
                content: config['site.keywords'],
            },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: [
        'normalize.css',
        'element-ui/lib/theme-chalk/index.css',
        '@/styles/animate.scss',
        '@/styles/custom.scss',
    ],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [
        '@/plugins/element-ui',
        '~/plugins/globalComponents/index.js',
        '~/service',
    ],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
    ],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        'nuxt-clipboard2',
    ],

    // Axios module configuration (https://go.nuxtjs.dev/config-axios)
    axios: { proxy: true },
    proxy: {
        '/api/': {
            // target: 'http://106.14.200.71:5500',
            target: 'https://shop2.meijiabang.com/',
            pathRewrite: { '^/api/': '/api/v4/' },
        },
        '/oss/': {
            target: 'http://106.14.200.71:5500',
            pathRewrite: { '^/oss/': '/' },
        },
    },
    server: {
        port: config['server.port'],
        host: config['server.host'],
    },

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {
        transpile: [/^element-ui/],
        analyze: false,
        extractCSS: process.env.NODE_ENV === 'production',
        maxChunkSize: 300000,
        postcss: {
            plugins: {
                'postcss-url': false,
            },
        },
        babel: {
            plugins: [
                [
                    'component',
                    {
                        libraryName: 'element-ui',
                        styleLibraryName: 'theme-chalk',
                    },
                ],
            ],
        },
        loaders: {
            sass: {
                implementation: require('sass'),
            },
            scss: {
                implementation: require('sass'),
                additionalData: '@import "@/styles/variables.scss";',
            },
        },
        /*
         ** You can extend webpack config here
         */
        extend(config, { isDev }) {
            // Run ESLint on save
            if (isDev && process.client) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/,
                })
            }
        },
    },
}
