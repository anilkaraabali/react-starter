/** @type {import('stylelint').Config} */
const config = {
  extends: ['stylelint-config-standard-scss'],
  plugins: ['stylelint-order'],
  rules: {
    'at-rule-no-unknown': null,
    'declaration-property-unit-allowed-list': {
      '/^((min|max)-)?(block-size$|inline-size$)/': [
        '%',
        'ch',
        'dvb',
        'rem',
        'vb',
      ],
      '/^border$|^border.*(width$|block$|inline$|start$|end$/|radius$)': ['px'],
      '/^font|^gap/|^inset|^margin|^padding/': ['rem'],
    },
    'declaration-property-value-no-unknown': true,
    'font-weight-notation': 'numeric',
    'import-notation': 'string',
    'media-feature-name-unit-allowed-list': {
      '/(width|height)$/': ['em'],
    },
    'no-descending-specificity': null,
    'order/order': [
      ['custom-properties', 'declarations', 'rules', 'at-rules'],
      {
        severity: 'warning',
      },
    ],
    'order/properties-alphabetical-order': [
      true,
      {
        severity: 'warning',
      },
    ],
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'apply',
          'custom-variant',
          'import',
          'layer',
          'plugin',
          'responsive',
          'screen',
          'source',
          'theme',
          'use',
          'utility',
          'variant',
          'variants',
        ],
      },
    ],
    'selector-class-pattern': [
      '^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z0-9]+(-[a-z0-9]+)*)?(--[a-z0-9]+(-[a-z0-9]+)*)?$',
      {
        message: 'Expected class selector "%s" to be kebab-case (BEM allowed)',
      },
    ],
  },
};

export default config;
