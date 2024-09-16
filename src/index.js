const plugin = require('tailwindcss/plugin')
const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette').default
const toColorValue = require('tailwindcss/lib/util/toColorValue').default

const fullBleed = plugin(function ({ matchUtilities, addUtilities, theme }) {
  addUtilities({
    '.bleed-bg': {
      'border-image': 'linear-gradient(var(--tw-full-bleed-color) 0 0) fill 0/ /0 9999vw 0 9999vw',
    },
    '.bleed-bg-r': {
      'border-image': 'linear-gradient(var(--tw-full-bleed-color) 0 0) fill 0/ /0 9999vw 0 0',
    },
    '.bleed-bg-l': {
      'border-image': 'linear-gradient(var(--tw-full-bleed-color) 0 0) fill 0/ /0 0 0 9999vw',
    },
    '.bleed-none': {
      '--tw-full-bleed-border-top-width': '0px',
      '--tw-full-bleed-border-bottom-width': '0px',
      'border-image': 'none',
    },
  })

  // colors
  matchUtilities(
    {
      bleed: (value) => {
        return { '--tw-full-bleed-color': toColorValue(value) }
      },
    },
    {
      values: flattenColorPalette({
        ...theme('colors'),
        ...theme('bleedColors'),
      }),
      type: ['color'],
    }
  )

  const bleedBorderUtilityVariations = [
    [
      'bleed-border',
      [
        '--tw-full-bleed-border-top-width',
        '--tw-full-bleed-border-bottom-width',
        ['border-image', 'linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 9999vw 0 9999vw'],
        ['border-top', 'var(--tw-full-bleed-border-top-width) solid'],
        ['border-bottom', 'var(--tw-full-bleed-border-bottom-width) solid'],
      ],
    ],
    [
      [
        'bleed-border-t',
        [
          '--tw-full-bleed-border-top-width',
          ['border-image', 'linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 9999vw 0 9999vw'],
          ['border-top', 'var(--tw-full-bleed-border-top-width) solid'],
        ],
      ],
      [
        'bleed-border-b',
        [
          '--tw-full-bleed-border-bottom-width',
          ['border-image', 'linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 9999vw 0 9999vw'],
          ['border-bottom', 'var(--tw-full-bleed-border-bottom-width) solid'],
        ],
      ],
      [
        'bleed-border-r',
        [
          '--tw-full-bleed-border-top-width',
          '--tw-full-bleed-border-bottom-width',
          ['border-image', 'linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 9999vw 0 0'],
          ['border-top', 'var(--tw-full-bleed-border-top-width) solid'],
          ['border-bottom', 'var(--tw-full-bleed-border-bottom-width) solid'],
        ],
      ],
      [
        'bleed-border-l',
        [
          '--tw-full-bleed-border-top-width',
          '--tw-full-bleed-border-bottom-width',
          ['border-image', 'linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 0 0 9999vw'],
          ['border-top', 'var(--tw-full-bleed-border-top-width) solid'],
          ['border-bottom', 'var(--tw-full-bleed-border-bottom-width) solid'],
        ],
      ],
      [
        'bleed-border-tl',
        [
          '--tw-full-bleed-border-top-width',
          ['border-image', 'linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 0 0 9999vw'],
          ['border-top', 'var(--tw-full-bleed-border-top-width) solid'],
        ],
      ],
      [
        'bleed-border-tr',
        [
          '--tw-full-bleed-border-top-width',
          ['border-image', 'linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 9999vw 0 0'],
          ['border-top', 'var(--tw-full-bleed-border-top-width) solid'],
        ],
      ],
      [
        'bleed-border-bl',
        [
          '--tw-full-bleed-border-bottom-width',
          ['border-image', 'linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 0 0 9999vw'],
          ['border-bottom', 'var(--tw-full-bleed-border-bottom-width) solid'],
        ],
      ],
      [
        'bleed-border-br',
        [
          '--tw-full-bleed-border-bottom-width',
          ['border-image', 'linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 9999vw 0 0'],
          ['border-bottom', 'var(--tw-full-bleed-border-bottom-width) solid'],
        ],
      ],
    ],
  ]

  const createUtilityPlugin = (
    themeKey,
    utilityVariations = [[themeKey, [themeKey]]],
    { filterDefault = false, ...options } = {}
  ) => {
    for (let utilityVariation of utilityVariations) {
      let group = Array.isArray(utilityVariation[0]) ? utilityVariation : [utilityVariation]

      matchUtilities(
        group.reduce((obj, [classPrefix, properties]) => {
          return Object.assign(obj, {
            [classPrefix]: (value) => {
              return properties.reduce((obj, name) => {
                if (Array.isArray(name)) {
                  return Object.assign(obj, { [name[0]]: name[1] })
                }
                return Object.assign(obj, { [name]: value })
              }, {})
            },
          })
        }, {}),
        {
          ...options,
        }
      )
    }
  }

  createUtilityPlugin('bleedBorderWidth', bleedBorderUtilityVariations, {
    values: {
      ...theme('borderWidth'),
      ...theme('bleedBorderWidth'),
    },
    type: ['length'],
  })
})

module.exports = fullBleed
