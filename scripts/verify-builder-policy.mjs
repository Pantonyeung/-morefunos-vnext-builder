import fs from 'node:fs';

const workflowPath = '.github/workflows/manual-build.yml';
const text = fs.readFileSync(workflowPath, 'utf8');
const expectedSigningCertificate = '69ca37015d3c4680e39a6bbe795e617f86ccce6ff2983661eba3b12a90ce2ee6';

const required = [
  'workflow_dispatch:',
  "if: github.actor == 'Pantonyeung'",
  'repository: Pantonyeung/morefunos-vnext',
  'persist-credentials: false',
  'VNEXT_SOURCE_READ_TOKEN',
  'VNEXT_DELIVERY_WRITE_TOKEN',
  'VNEXT_ANDROID_KEYSTORE_B64',
  'VNEXT_ANDROID_KEYSTORE_PASSWORD',
  'VNEXT_ANDROID_KEY_ALIAS',
  'VNEXT_ANDROID_KEY_PASSWORD',
  'EXPECTED_APP_SIGNING_CERT_SHA256',
  expectedSigningCertificate,
  'Stable APK signing certificate identity mismatch',
  'apksigner',
  '--print-certs',
  'certificate_sha256=',
  'Stable APK signing identity verified: PASS',
  'Remove temporary signing key',
  'details withheld from public log'
];

for (const token of required) {
  if (!text.includes(token)) {
    throw new Error(`BUILDER_POLICY_REQUIRED_TOKEN_MISSING:${token}`);
  }
}

const privateBuildIndex = text.indexOf('Execute private source build without public source logs');
const signingSecretIndex = text.indexOf('VNEXT_ANDROID_KEYSTORE_B64');
if (privateBuildIndex < 0 || signingSecretIndex < 0 || signingSecretIndex < privateBuildIndex) {
  throw new Error('BUILDER_POLICY_SIGNING_SECRETS_MUST_NOT_PRECEDE_PRIVATE_SOURCE_BUILD');
}

if (!/CERT_SHA256[\s\S]*EXPECTED_APP_SIGNING_CERT_SHA256/.test(text)) {
  throw new Error('BUILDER_POLICY_SIGNING_CERTIFICATE_IDENTITY_NOT_ENFORCED');
}

const forbiddenPatterns = [
  /^\s+push:\s*$/m,
  /^\s+pull_request:\s*$/m,
  /^\s+schedule:\s*$/m,
  /^\s+workflow_run:\s*$/m,
  /^\s+repository_dispatch:\s*$/m,
  /actions\/upload-artifact@/,
  /repository:\s*\$\{\{/,
  /\bset\s+-x\b/,
  /echo\s+['"]?\$VNEXT_ANDROID_/,
  /printf\s+['"]?%s['"]?\s+['"]?\$VNEXT_ANDROID_(?!KEYSTORE_B64)/
];

for (const pattern of forbiddenPatterns) {
  if (pattern.test(text)) {
    throw new Error(`BUILDER_POLICY_FORBIDDEN_PATTERN:${pattern}`);
  }
}

console.log('BUILDER_POLICY_PASS');
