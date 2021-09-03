import reactRefresh from "@vitejs/plugin-react-refresh";
import vite from "vite";

const config = vite.defineConfig({
  plugins: [reactRefresh()],
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
});

export default config;
