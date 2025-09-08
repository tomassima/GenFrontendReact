# Task Manager (Frontend)

This is the frontend (React + TypeScript + Vite) for the Task Manager app.

## Quick start

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run the backend API**

   This frontend expects the backend to be available at `http://localhost:5020` and proxies requests from `/api` to `http://localhost:5020`. Start the backend from the companion repository:

   [GenBackendAspNetCore](https://github.com/tomassima/GenBackendAspNetCore)

   Alternatively, adjust the proxy in `vite.config.ts` or set `baseUrl` in `src/config/api-config.ts` to point to a different backend URL.

3. **Start the frontend dev server**

   ```bash
   npm run dev
   ```

### Build & preview

```bash
npm run build
npm run preview
```

## Notes

- The Vite dev server proxies `/api` to `http://localhost:5020` by default (see `vite.config.ts`).
- If you run the backend on a different host/port, either update the proxy in `vite.config.ts` or change `API_CONFIG.baseUrl` in `src/config/api-config.ts` to the backend's full URL.
- Node v16+ is recommended.

## Features

- Add / edit / delete tasks
- Filter and sort tasks
- Basic task status management
