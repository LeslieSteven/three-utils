import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import AutoImports from 'unplugin-auto-import/vite';
import { DirResolverHelper } from 'vite-auto-import-resolvers';

export default ({ mode }) => {
  const { VITE_PORT, VITE_BASE_URL } = loadEnv(mode, process.cwd());

  return defineConfig({
    base: VITE_BASE_URL,
    plugins: [
      vue(),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false // css in js
          })
        ]
      }),
      // 该辅助插件也是必需的 👇
      DirResolverHelper(),
      AutoImports({
        imports: [
          'vue',
          'vue-router',
          'pinia'
        ],
        resolvers: [AntDesignVueResolver()],
        eslintrc: {
          enabled: false, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        }
      })
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/styles/mixins.scss"; @import "@/styles/variables.scss";'
        }
      }
    },
    server: {
      hmr: true,
      // 是否开启 https
      https: false, // 端口号
      port: VITE_PORT, // 监听所有地址
      host: '0.0.0.0', // 服务启动时是否自动打开浏览器
      open: true, // 允许跨域
      cors: true, // 自定义代理规则
      proxy: {}
    },
    build: {
      // 设置最终构建的浏览器兼容目标
      target: 'es2015', // 构建后是否生成 source map 文件
      sourcemap: false, //  chunk 大小警告的限制（以 kbs 为单位）
      chunkSizeWarningLimit: 2000, // 启用/禁用 gzip 压缩大小报告
      reportCompressedSize: false
    }
  });
};
