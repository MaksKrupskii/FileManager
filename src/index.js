import { createInterface } from 'node:readline';
import { homedir } from 'node:os';
import { chdir, cwd } from 'node:process';
import { ls } from './ls/index.mjs';
import { up } from './up/index.mjs';
import { cd } from './cd/index.mjs';
import hash from './hash/hash.mjs';
import { compress, decompress } from './zip/index.mjs';
import os from './os/index.mjs';
import { cat, remove, cp, add, rn } from './fs/index.mjs';

let currentDirectory = homedir();
chdir(currentDirectory);

const username = process.argv.slice(2)[0]?.split('=')[1] ?? 'Guest';

console.log(`Welcome to the File Manager, ${username}!`);
console.log(`You are currently in ${cwd()}`);

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
})

rl.on('line', async (line) => {
    const command = line.split(' ');
    switch(command[0]) {
        case 'ls':
            await ls();
            break;
        case 'up':
            up();
            break;
        case 'cd':
            cd(command[1]);
            break;
        case 'cat':
            await cat(command[1]);
            break;
        case 'add':
            await add(command[1]);
            break;
        case 'rn':
            await rn(command[1], command[2]);
            break;
        case 'cp':
            await cp(command[1], command[2]);
            break;
        case 'mv':
            await cp(command[1], command[2]);
            await remove(command[1]);
            break;
        case 'rm':
            await remove(command[1]);
            break;
        case 'hash':
            await hash(command[1]);
            break;
        case 'compress':
            await compress(command[1], command[2]);
            break;
        case 'decompress':
            await decompress(command[1], command[2]);
            break;
        case 'os':
            os(command[1]);
            break;
        case '.exit':
            rl.close();
            return;
        default:
            console.log('Invalid input');
    };

    console.log(`You are currently in ${cwd()}`);
});

rl.on('close', () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
}); 
