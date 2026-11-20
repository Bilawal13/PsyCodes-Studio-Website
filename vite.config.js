import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig(function (_a) {
    var mode = _a.mode;
    var env = loadEnv(mode, process.cwd(), '');
    return {
        plugins: [react()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        server: {
            port: 3000,
            open: false,
            proxy: {
                '/api/resend': {
                    target: 'https://api.resend.com',
                    changeOrigin: true,
                    rewrite: function (path) { return path.replace(/^\/api\/resend/, ''); },
                    headers: {
                        Authorization: "Bearer ".concat(env.VITE_RESEND_API_KEY || ''),
                    },
                },
            },
        },
        build: {
            chunkSizeWarningLimit: 600,
            rollupOptions: {
                output: {
                    manualChunks: {
                        'vendor-react': ['react', 'react-dom', 'react-router-dom'],
                        'vendor-motion': ['framer-motion'],
                        'vendor-supabase': ['@supabase/supabase-js'],
                        'vendor-query': ['@tanstack/react-query'],
                        'vendor-icons': ['lucide-react'],
                    },
                },
            },
        },
    };
});
