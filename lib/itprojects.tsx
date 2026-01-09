import sql from 'better-sqlite3';
import { ITProject } from '@/components/ITProject';

const dbit = sql('itprojects.db');

export async function getITProjects() {
    return dbit.prepare('SELECT * FROM projects ORDER BY year DESC').all() as ITProject[];
}