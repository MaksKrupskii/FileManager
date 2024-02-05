import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { cwd } from 'node:process';

const hash = async (path) => {
    const currDir = cwd();
    try {
        const url = resolve(currDir, path);
        const data = await readFile(url);
        const hash = createHash('sha256');
        hash.update(data);
        console.log(hash.digest('hex'));        
    } catch (error) {
        console.log('Operation failed');
    }
};

export default hash;
