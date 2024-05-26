import { createStorage } from "unstorage";
import fsDriver from "unstorage/drivers/fs-lite"

export const db = createStorage({
    driver: fsDriver({base: "./.db"}),
});
type DBUser = {
    music: string[]
}

export const setUser = (id: string, value?: DBUser) => db.setItem<DBUser>(`users/${id}`, value ?? {music: []});
export const getUser = (id: string) => db.getItem<DBUser>(`users/${id}`)