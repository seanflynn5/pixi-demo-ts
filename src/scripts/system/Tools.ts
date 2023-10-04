interface RequireContext {
    (id: string): any;
    keys(): string[];
}

export class Tools {
    static massiveRequire(req: RequireContext) {
        const files: { key: string; data: any }[] = [];

        req.keys().forEach((key: string) => {
            files.push({
                key,
                data: req(key)
            });
        });

        return files;
    }
}