import fs from 'node:fs';

const workflowPath = '.github/workflows/manual-build.yml';
const text = fs.readFileSync(workflowPath, 'utf8');

const required = [
  'workflow_dispatch:',
  "if: github.actor == 'Pantonyeung'",
  'repository: Pantonyeung/morefunos-vnext',
  'persist-credentials: false',
  'VNEXT_SOURCE_READ_TOKEN',
  'VNEXT_DELIVERY_WRITE_TOKEN',
  'details withheld from public log'
];

for (const token of required) {
  if (!text.includes(token)) {
    throw new Error(`BUILDER_POLICY_REQUIRED_TOKEN_MISSING:${token}`);
  }
}

const forbiddenPatterns = [
  /^\s+push:\s*$/m,
  /^\s+pull_request:\s*$/m,
  /^\s+schedule:\s*$/m,
  /^\s+workflow_run:\s*$/m,
  /^\s+repository_dispatch:\s*$/m,
  /actions\/upload-artifact@/,
  /repository:\s*\$\{\{/,
];

for (const pattern of forbiddenPatterns) {
  if (pattern.test(text)) {
    throw new Error(`BUILDER_POLICY_FORBIDDEN_PATTERN:${pattern}`);
  }
}

console.log('BUILDER_POLICY_PASS');
