import { defineConfig, UserConfigExport } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";


export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './src/setupTests.ts',
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            include: [
                'src/**/*.{js,jsx,ts,tsx}',
                'src/setupTests.ts',
                'src/vite-env.d.ts',
            ],
        },
    },
} as UserConfigExport);