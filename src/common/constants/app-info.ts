import pkg from '../../../package.json';

interface PackageJson {
  name: string;
  version: string;
  author: string;
}

const typedPkg: PackageJson = pkg as PackageJson;

export const APP_NAME: string = typedPkg.name ?? '';
export const APP_VERSION: string = typedPkg.version ?? '';
export const APP_AUTHOR: string = typedPkg.author ?? '';
