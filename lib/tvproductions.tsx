import sql from 'better-sqlite3';
import { TVProduction } from "@/components/TVProduction";

const dbtv = sql('tvproductions.db');

export async function getTVProductions() {
    return dbtv.prepare('SELECT * FROM tvproductions ORDER BY year DESC').all() as TVProduction[];
}