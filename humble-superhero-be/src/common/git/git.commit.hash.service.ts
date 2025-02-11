import { execSync } from 'child_process';

function get(): string {
  try {
    return execSync('git rev-parse HEAD').toString().trim();
  } catch {
    return 'unknown';
  }
}

export const GitCommitHashService = {
  get,
};
