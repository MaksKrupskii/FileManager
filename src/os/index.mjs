import { EOL, cpus, homedir, userInfo, arch } from 'node:os';

const os = (line) => {
    switch (line) {
        case '--EOL':
            console.log(EOL);
            break;
        case '--cpus':
            const cpuList = cpus();

            console.log(`Total CPUs: ${cpuList.length}`);
            
            cpuList.forEach((cpu, index) => {
                console.log(`CPU ${index + 1}:`);
                console.log(`  Model: ${cpu.model}`);
                console.log(`  Speed: ${cpu.speed / 1000} GHz`);
            });
            break;
        case '--homedir':
            console.log(homedir());
            break;
        case '--username':
            console.log(userInfo().username);
            break;
        case '--architecture':
            console.log(arch());
            break;
        default:
            console.log('Invalid input');
    };
};

export default os;
