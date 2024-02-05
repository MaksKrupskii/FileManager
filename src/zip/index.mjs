import { createReadStream, createWriteStream } from 'node:fs';
import { access } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import { BrotliCompress, BrotliDecompress } from 'node:zlib';
import { resolve } from 'node:path';
import { cwd } from 'node:process';

export const compress = async (path, targetDir) => {
    const currDir = cwd();
    try {
        let src = resolve(currDir, path);
        let dest = resolve(targetDir, 'archive.gz');

        await access(src);
        await access(targetDir);

        const gzip = BrotliCompress();
        const readStream = createReadStream(src);
        const writeStream = createWriteStream(dest);

        await pipeline(readStream, gzip, writeStream);        
    } catch (error) {
        console.log(error)
        console.log('Operation failed');
    }
};

export const decompress = async (path, targetDir) => {
    const currDir = cwd();
    try {
        let src = resolve(currDir, path);
        let dest = resolve(targetDir, 'file.txt');

        await access(src);
        await access(targetDir);

        const gunzip = BrotliDecompress();
        const readStream = createReadStream(src);
        const writeStream = createWriteStream(dest);

        await pipeline(readStream, gunzip, writeStream);        
    } catch (error) {
        console.log('Operation failed');
    }
};
