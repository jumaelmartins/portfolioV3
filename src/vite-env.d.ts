/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PM_API_URL: string;
  readonly VITE_PM_API_KEY: string;
  readonly VITE_PM_IMAGE_BASE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
