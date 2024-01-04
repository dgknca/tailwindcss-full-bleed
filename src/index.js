const plugin = require('tailwindcss/plugin');
const flattenColorPalette =
  require('tailwindcss/lib/util/flattenColorPalette').default;
const toColorValue = require('tailwindcss/lib/util/toColorValue').default;

const fullBleed = plugin(function ({ matchUtilities, addUtilities, theme }) {
  addUtilities({
    '.bleed-bg': {
      'border-image':
        'linear-gradient(var(--tw-full-bleed-color) 0 0) fill 0/ /0 100vw 0 100vw',
    },
    '.bleed-bg-l': {
      'border-image':
        'linear-gradient(var(--tw-full-bleed-color) 0 0) fill 0/ /0 0 0 100vw',
    },
    '.bleed-bg-r': {
      'border-image':
        'linear-gradient(var(--tw-full-bleed-color) 0 0) fill 0/ /0 100vw 0 0',
    },
    '.bleed-none': {
      '--tw-full-bleed-border-bottom-width': '0px',
      '--tw-full-bleed-border-top-width': '0px',
      'border-image': 'none',
    },
  });

  // colors
  matchUtilities(
    {
      bleed: (value) => {
        return { '--tw-full-bleed-color': toColorValue(value) };
      },
    },
    {
      type: ['color'],
      values: flattenColorPalette({
        ...theme('colors'),
        ...theme('bleedColors'),
      }),
    }
  );

  const bleedBorderUtilityVariations = [
    [
      'bleed-border',
      [
        '--tw-full-bleed-border-top-width',
        '--tw-full-bleed-border-bottom-width',
        [
          'border-image',
          'linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 100vw 0 100vw',
        ],
        [
          'border-top',
          'var(--tw-full-bleed-border-top-width) solid var(--tw-full-bleed-color)',
        ],
        [
          'border-bottom',
          'var(--tw-full-bleed-border-bottom-width) solid var(--tw-full-bleed-color)',
        ],
      ],
    ],
    [
      [
        'bleed-border-t',
        [
          '--tw-full-bleed-border-top-width',
          [
            'border-image',
            'linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 100vw 0 100vw',
          ],
          [
            'border-top',
            'var(--tw-full-bleed-border-top-width) solid var(--tw-full-bleed-color)',
          ],
        ],
      ],
      [
        'bleed-border-b',
        [
          '--tw-full-bleed-border-bottom-width',
          [
            'border-image',
            'linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 100vw 0 100vw',
          ],
          [
            'border-bottom',
            'var(--tw-full-bleed-border-bottom-width) solid var(--tw-full-bleed-color)',
          ],
        ],
      ],
      [
        'bleed-border-r',
        [
          '--tw-full-bleed-border-top-width',
          '--tw-full-bleed-border-bottom-width',
          [
            'border-image',
            'linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 100vw 0 0',
          ],
          [
            'border-top',
            'var(--tw-full-bleed-border-top-width) solid var(--tw-full-bleed-color)',
          ],
          [
            'border-bottom',
            'var(--tw-full-bleed-border-bottom-width) solid var(--tw-full-bleed-color)',
          ],
        ],
      ],
      [
        'bleed-border-l',
        [
          '--tw-full-bleed-border-top-width',
          '--tw-full-bleed-border-bottom-width',
          [
            'border-image',
            'linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 0 0 100vw',
          ],
          [
            'border-top',
            'var(--tw-full-bleed-border-top-width) solid var(--tw-full-bleed-color)',
          ],
          [
            'border-bottom',
            'var(--tw-full-bleed-border-bottom-width) solid var(--tw-full-bleed-color)',
          ],
        ],
      ],
      [
        'bleed-border-tl',
        [
          '--tw-full-bleed-border-top-width',
          [
            'border-image',
            'linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 0 0 100vw',
          ],
          [
            'border-top',
            'var(--tw-full-bleed-border-top-width) solid var(--tw-full-bleed-color)',
          ],
        ],
      ],
      [
        'bleed-border-tr',
        [
          '--tw-full-bleed-border-top-width',
          [
            'border-image',
            'linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 100vw 0 0',
          ],
          [
            'border-top',
            'var(--tw-full-bleed-border-top-width) solid var(--tw-full-bleed-color)',
          ],
        ],
      ],
      [
        'bleed-border-bl',
        [
          '--tw-full-bleed-border-bottom-width',
          [
            'border-image',
            'linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 0 0 100vw',
          ],
          [
            'border-bottom',
            'var(--tw-full-bleed-border-bottom-width) solid var(--tw-full-bleed-color)',
          ],
        ],
      ],
      [
        'bleed-border-br',
        [
          '--tw-full-bleed-border-bottom-width',
          [
            'border-image',
            'linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 100vw 0 0',
          ],
          [
            'border-bottom',
            'var(--tw-full-bleed-border-bottom-width) solid var(--tw-full-bleed-color)',
          ],
        ],
      ],
    ],
  ];

  const createUtilityPlugin = (
    themeKey,
    utilityVariations = [[themeKey, [themeKey]]],
    { filterDefault = false, ...options } = {}
  ) => {
    for (let utilityVariation of utilityVariations) {
      let group = Array.isArray(utilityVariation[0])
        ? utilityVariation
        : [utilityVariation];

      matchUtilities(
        group.reduce((obj, [classPrefix, properties]) => {
          return Object.assign(obj, {
            [classPrefix]: (value) => {
              return properties.reduce((obj, name) => {
                if (Array.isArray(name)) {
                  return Object.assign(obj, { [name[0]]: name[1] });
                }
                return Object.assign(obj, { [name]: value });
              }, {});
            },
          });
        }, {}),
        {
          ...options,
        }
      );
    }
  };

  createUtilityPlugin('bleedBorderWidth', bleedBorderUtilityVariations, {
    type: ['length'],
    values: {
      ...theme('borderWidth'),
      ...theme('bleedBorderWidth'),
    },
  });
});

module.exports = fullBleed;
