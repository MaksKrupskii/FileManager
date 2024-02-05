import { resolve } from 'node:path';
import { cwd, chdir } from 'node:process';
import { homedir } from 'node:os';

const homeDir = homedir();

export const up = () => {
    const currDir = cwd();
    const parentPath = resolve(currDir, '..');

    if (homeDir !== currDir) {
      chdir(parentPath);
    } else {
      console.log('Already in the root directory.');
    }
};
