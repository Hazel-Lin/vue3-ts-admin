import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import path from 'path'


export default defineConfig({
    plugins: [
        Vue({
            include: [/\.vue$/, /\.md$/],
        })],
    resolve: {
        // 配置别名
        alias: {
          '@/': `${path.resolve(__dirname, 'src')}/`,
        },
    },
    // 解决process is not defined的问题
    define: { 'process.env': {} }
})

