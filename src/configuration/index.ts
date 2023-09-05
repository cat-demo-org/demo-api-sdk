import { config } from "dotenv";
config();

export const environment = {
    ROOT_API_URL: process.env.ROOT_API_URL
}