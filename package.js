Package.describe({
  name: 'kucharskimaciej:typescript-namespace',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Namespace decorator for TypeScript classes',
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.addFiles('typescript-namespace.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('kucharskimaciej:typescript-namespace');
  api.addFiles('typescript-namespace-tests.js');
});
