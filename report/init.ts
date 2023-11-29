/**
 * Garantizar que el directorio 'test-results' exista y esté vacío.
 */
const fsExtra = require('fs-extra');
try {
  fsExtra.ensureDir('test-results');
  fsExtra.emptyDir('test-results');
} catch (error) {
  console.log('The folder has not been created ' + error);
}
