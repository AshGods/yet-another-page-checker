import type { Config } from './app/config';

declare module '*.json' {
    const value: Config;
    export default value;
} 