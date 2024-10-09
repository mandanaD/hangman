import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from "vite-plugin-pwa";
import fs from 'fs';
import path from 'path';

// Read the manifest file from the public folder
const manifest = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, 'public', 'manifest.json'), 'utf-8')
);

export default defineConfig({
    plugins: [react(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
            manifest
        })
    ],
    base: "/hangman"
})
