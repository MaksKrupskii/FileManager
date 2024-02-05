import { readdir, stat } from 'node:fs/promises';
import { cwd } from 'node:process';

export const ls = async () => {
    try {
        const list = await readDir(cwd());
        createTableFromObjects(list);
    } catch (error) {
        console.log('Operation failed');
    }
};

const readDir = async (path) => {
    const files = await readdir(path);
    const promises = files.map(async (file, index) => {
        const idDir = (await stat(`${path}/${file}`)).isDirectory()
        return ({
            name: file,
            type: idDir ? 'Dirrectory' : 'File',
        });
    });
    const fileList = await Promise.all(promises);
    return fileList.sort((a, b) => a.name.localeCompare(b.name)).sort((a, b) => a.type.localeCompare(b.type));
}

function createTableFromObjects(list) {
    const data = list.map((item, index) => ({index: index + 1, ... item}));

    // Extract headers from the first object in the array
    const headers = ['index', 'name', 'type'];

    // Find the maximum length of each column
    const columnLengths = headers.map(header =>
        Math.max(header.length, ...data.map(item => item[header].toString().length))
    );

    // Function to pad a string to a specified length
    const padString = (str, length) => {
        const spaces = Array(length - str.toString().length + 1).join(' ');
        return str + spaces;
    };


    if (list.length === 0) {
        const table = [headers.map((header) => padString(header.charAt(0).toUpperCase() + header.slice(1), header.length)).join(' | ')];
        const separator = columnLengths.map(length => '-'.repeat(length)).join('-+-');
        table.splice(1, 0, separator);
    
        console.log(table.join('\n'));
        return;
    }

    // Create the table
    const table = [headers.map((header, index) => padString(header.charAt(0).toUpperCase() + header.slice(1), columnLengths[index])).join(' | ')];

    data.forEach(row =>
        table.push(
            headers.map((header, index) => padString(row[header], columnLengths[index])).join(' | ')
        )
    );

    // Add a separator line
    const separator = columnLengths.map(length => '-'.repeat(length)).join('-+-');
    table.splice(1, 0, separator);

    console.log(table.join('\n'));
}
