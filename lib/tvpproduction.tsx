import sql from 'better-sqlite3';
import { TVProduction } from "@/components/TVProduction";

const dbtv = sql('tvproductions.db');

export async function getTVProduction(slug : string) {
    return dbtv.prepare('SELECT * FROM tvproductions WHERE slug = ? LIMIT 1').get(slug) as TVProduction;
}