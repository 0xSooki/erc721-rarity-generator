import fs from 'node:fs';
import archiver from 'archiver';
import { stdout } from 'process';

const createArchiver = () => {
  const archive = archiver('zip', { zlib: { level: 9 } });

  archive.on('warning', (error) => {
    stdout.write(`❗ Something threw a warning during compression: ${error} ❗\n`);
  });

  archive.on('error', (error) => {
    stdout.write(`❗ Something went wrong during compression: ${error} ❗\n`);
  });

  return archive;
};

export const compressDataTo = (data, path, fileName) => {
  const archive = createArchiver();

  const zipFileName = `${fileName}.zip`;
  const jsonFileName = `${fileName}.json`;

  stdout.write('\n🗜️  Preparing for file compression\n');
  const output = fs.createWriteStream(`${path}/${zipFileName}`);

  archive.pipe(output);
  const buffer = Buffer.from(JSON.stringify(data, null, 2));
  archive.append(buffer, { name: jsonFileName });
  archive.finalize();
  stdout.write(`🗜️  Your compressed data has been saved to ${path}/${zipFileName}\n`);
};
