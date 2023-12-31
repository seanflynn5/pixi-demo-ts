import { Loader as PIXI_Loader, ILoaderResource } from 'pixi.js';

export class Loader {
    loader: PIXI_Loader;
    config: LoaderConfig;
    resources: { [key: string]: ILoaderResource };

    constructor(loader: PIXI_Loader, config: LoaderConfig) {
        this.loader = loader;
        this.config = config;
        this.resources = {};
    }

    preload(): Promise<void> {

        for (const asset of this.config.loader) {
            let key = asset.key.substr(asset.key.lastIndexOf('/') + 1);
            key = key.substring(0, key.indexOf('.'));
            if (asset.key.indexOf('.png') !== -1 || asset.key.indexOf('.jpg') !== -1) {
                this.loader.add(key, asset.data.default);
            }
        }

        return new Promise<void>((resolve) => {
            this.loader.load((loader, resources) => {
                this.resources = resources;
                resolve();
            });
        });
    }
}

export interface LoaderConfig {
    loader: { key: string; data: { default: string } }[];
}





