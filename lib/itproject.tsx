import sql from 'better-sqlite3';
import { ITProject } from '@/components/ITProject';

const dbit = sql('itprojects.db');

export async function getITProject(slug : string) {
    return dbit.prepare('SELECT * FROM projects WHERE slug = ? LIMIT 1').get(slug) as ITProject;
}