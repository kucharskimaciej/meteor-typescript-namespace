Package.describe({
  name: 'kucharskimaciej:typescript-namespace',
  version: '1.0.0',
  summary: 'Namespace decorator for TypeScript classes',
  git: 'https://github.com/kucharskimaciej/meteor-typescript-namespace',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.addFiles('typescript-namespace.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('kucharskimaciej:typescript-namespace');

  api.addFiles('spec/typescript-namespace_spec.js');
});
