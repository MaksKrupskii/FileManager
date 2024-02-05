import { rename } from 'node:fs/promises';
import { resolve } from 'node:path';
import { cwd } from 'node:process';

const rn = async (pathToFile, newFilename) => {
    const currDir = cwd();
    try {
        const file = resolve(currDir, pathToFile);
        const newName = resolve(currDir, newFilename);

        await rename(file, newName);        
    } catch {
        console.log('Operation failed');
    }
};

export default rn;
