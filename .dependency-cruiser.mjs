/** @type {import('dependency-cruiser').IConfiguration} */
export default {
  forbidden: [
    {
      comment:
        'Circular dependencies cause unexpected runtime undefined values and bundling issues.',
      from: {},
      name: 'no-circular',
      severity: 'error',
      to: {
        circular: true,
      },
    },
    {
      comment:
        'Shared code (src/components, src/hooks, src/utils, etc.) must not depend on features.',
      from: {
        path: '^src/(api|components|config|hooks|lib|locales|stores|styles|types|utils)/',
      },
      name: 'shared-cannot-import-features',
      severity: 'error',
      to: {
        path: '^src/features/',
      },
    },

    {
      comment:
        'Shared code and features must not depend on the app layer (src/app, src/main.tsx).',
      from: {
        path: '^src/(api|components|config|features|hooks|lib|locales|stores|styles|types|utils)/',
      },
      name: 'shared-and-features-cannot-import-app',
      severity: 'error',
      to: {
        path: '^src/(app/|main\\.tsx)',
      },
    },
    {
      comment:
        'A feature module may not import another feature module directly.',
      from: {
        path: '^src/features/([^/]+)/',
      },
      name: 'no-cross-feature-imports',
      severity: 'error',
      to: {
        path: '^src/features/([^/]+)/',
        pathNot: '^src/features/$1/',
      },
    },

    {
      comment:
        'Organisms can import files within their own folder hierarchy, but cannot escape to other organisms via relative paths.',
      from: {
        path: '^src/components/organisms/([^/]+)/',
      },
      name: 'no-cross-organism-escapes',
      severity: 'error',
      to: {
        path: '^src/components/organisms/([^/]+)/',
        pathNot: '^src/components/organisms/$1/',
      },
    },
  ],
  options: {
    doNotFollow: {
      path: 'node_modules',
    },
    enhancedResolveOptions: {
      conditionNames: ['import', 'require', 'node', 'default'],
      exportsFields: ['exports'],
    },
    tsConfig: {
      fileName: 'tsconfig.json',
    },
    tsPreCompilationDeps: true,
  },
};
