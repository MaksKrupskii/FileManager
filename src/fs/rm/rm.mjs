import { rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { cwd } from 'node:process';

const remove = async (path) => {
    const currDir = cwd();
    try {
        const targetPath = resolve(currDir, path);

        await rm(targetPath);
    } catch {
        console.log('Operation failed');
    }
};

export default remove;
