import { resolve } from 'node:path';
import { cwd, chdir } from 'node:process';

export const cd = (path) => {
    if (!path) {
        console.log('Operation failed')
        return;
    }
    try {
        const currDir = cwd();
        const targetPath = resolve(currDir, path);
        chdir(targetPath);        
    } catch (error) {
        console.log('Operation failed');
    }
}
