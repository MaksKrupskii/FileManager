import { createReadStream } from 'node:fs';
import { access, constants } from 'node:fs/promises';
import { resolve } from 'node:path';
import { cwd } from 'node:process';

const cat = async (path) => {
    const currDir = cwd();
    try {
        if (!!path) {
            const url = resolve(currDir, path);
            await access(url, constants.F_OK);

            const stream = createReadStream(url, { encoding: 'utf-8' });
            stream.on('data', (chunk) => {
                process.stdout.write(chunk);
            });
        } else {
            throw new Error();
        }
    } catch {
        console.log('Operation failed');
    }
};


export default cat;
