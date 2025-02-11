import { promises as fs } from 'fs';

interface PackageJsonType {
  name: string;
  version: string;
}

async function getFile(filePath: string): Promise<PackageJsonType> {
  const packageJsonContent = await fs.readFile(filePath, 'utf8');
  return JSON.parse(packageJsonContent) as PackageJsonType;
}

async function getAppName(filePath: string): Promise<string> {
  const packageJsonFile = await getFile(filePath);
  return `${packageJsonFile.name}`;
}

async function getAppVersion(filePath: string): Promise<string> {
  const packageJsonFile = await getFile(filePath);
  return `${packageJsonFile.version}`;
}

async function getAppNameVersion(filePath: string): Promise<string> {
  const appName = await getAppName(filePath);
  const appVersion = await getAppVersion(filePath);

  return `${appName}@${appVersion}`;
}

export const PackageJson = {
  getAppName,
  getAppVersion,
  getAppNameVersion,
};
