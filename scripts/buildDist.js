#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '../');
const componentPath = path.resolve(rootDir, './src');
const distPath = path.resolve(rootDir, './dist');

const blackListDir = ['icons', 'utils'];

const execOptions = {
  shell: true,
};

/** Make Sure dist Folder Exists */
function setup() {
  // Clean dist
  execSync(`rm -rf ${distPath}/*`, { shell: true, stdio: 'inherit' });

  // Create dist folder
  if (!fs.existsSync(distPath)) fs.mkdirSync(distPath);
}

/** Copy SCSS */
const copyScss = () => {
  execSync(
    `find ${componentPath} -maxdepth 1 -type f -name \\*.scss -exec cp {} ./dist \\;`,
    execOptions,
  );
};

/** Bundle blackListed Directories */
const bundleBlackListed = () => {
  blackListDir.forEach(folder => {
    execSync(
      `BABEL_ENV=production babel ${componentPath}/${folder} -d ${distPath}/${folder} --ignore scss,test.js`,
      execOptions,
    );
  });
};

/** Get Component Folders */
const getFolders = () => {
  const data = execSync(`find ${componentPath} -type d`, execOptions);
  return [
    ...new Set(
      data
        .toString()
        .split('\n')
        .map(folder => path.basename(folder)),
    ),
  ];
};

/** Build Entries Object */
const buildEntries = () => {
  let entries = {};
  const folders = getFolders();
  folders
    .filter(folder => blackListDir.indexOf(folder) === -1 || !folder) // Get rid of blacklisted directories
    .forEach(folder => {
      const data = execSync(
        `find ${componentPath} -type f -name ${folder}.jsx`,
      );
      const result = data
        .toString()
        .split('\n')
        .filter(d => !!d);
      if (result.length) {
        const [component] = result;
        entries[folder] = `./${path.relative(rootDir, component)}`;
      }
    });

  // Sort for readability
  entries = Object.keys(entries)
    .sort()
    .reduce(
      (prev, key) => ({
        ...prev,
        [key]: entries[key],
      }),
      {},
    );

  /** Write Entries JSON */
  fs.writeFileSync(
    `${distPath}/entries.json`,
    JSON.stringify(entries, null, 4),
    'utf8',
  );
};

Promise.resolve(setup())
  .then(copyScss)
  .then(bundleBlackListed)
  .then(buildEntries)
  .catch(error => console.error('Bundle Failed:', error));
