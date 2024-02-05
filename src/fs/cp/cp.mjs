import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { resolve } from 'node:path';
import { cwd } from 'node:process';
import { access, constants } from 'node:fs/promises';

const cp = async (path, targetDir) => {
    const currDir = cwd();
    try {
        let src = resolve(currDir, path);
        let dest = resolve(targetDir, path);
        await access(src, constants.F_OK);
        await access(targetDir, constants.F_OK);
        const readStream = createReadStream(src, { encoding: 'utf-8' });
        const writeStream = createWriteStream(dest);

        await pipeline(readStream, writeStream); 
    } catch {
        console.log('Operation failed');
    }
};

export default cp;
