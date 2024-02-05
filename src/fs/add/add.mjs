import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { cwd } from 'node:process';

const add = async (path) => {
    const currDir = cwd();
    try {
        const targetPath = resolve(currDir, path);

        await writeFile(targetPath, '', { flag: 'wx' });        
    } catch {
        console.log('Operation failed');
    }
};

export default add;
