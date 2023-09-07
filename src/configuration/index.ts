if (process) {
    import("dotenv").then((module) => {
        const config = module.config;
        config();
    });
}

export const environment = {
    // @ts-ignore
    ROOT_API_URL: process ? process.env.ROOT_API_URL : import.meta.env.ROOT_API_URL,
};
