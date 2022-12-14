const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')
const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette').default
const toColorValue = require('tailwindcss/lib/util/toColorValue').default
// const createUtilityPlugin = require('tailwindcss/lib/util/createUtilityPlugin').default

const fullBleed = plugin(
  function ({ matchUtilities, addDefaults, addUtilities, theme }) {
    addDefaults('bleed-bg', {
      '--tw-full-bleed-color': 'theme(colors.neutral.200)',
    })

    addDefaults('bleed-border', {
      '--tw-full-bleed-border-top-width': '1px',
      '--tw-full-bleed-border-bottom-width': '1px',
    })

    addUtilities({
      '.bleed-bg': {
        '@defaults bleed-bg': {},
        'border-image': 'linear-gradient(var(--tw-full-bleed-color) 0 0) fill 0/ /0 100vw 0 100vw' 
      },
      '.bleed-bg-r': {
        '@defaults bleed-bg': {},
        'border-image': 'linear-gradient(var(--tw-full-bleed-color) 0 0) fill 0/ /0 100vw 0 0' 
      },
      '.bleed-bg-l': {
        '@defaults bleed-bg': {},
        'border-image': 'linear-gradient(var(--tw-full-bleed-color) 0 0) fill 0/ /0 0 0 100vw' 
      },
      '.bleed-none': {
        '--tw-full-bleed-border-top-width': '0px',
        '--tw-full-bleed-border-bottom-width': '0px',
        'border-image': 'none'
      },
    })

    // colors
    matchUtilities(
      {
        'bleed': (value) => {
          return { '--tw-full-bleed-color': toColorValue(value) }
        },
      },
      { values: flattenColorPalette(theme('bleedColor')), type: ['color'] }
    )

    const bleedBorderUtilityVariations = [
      ['bleed-border',
        [
          ['@defaults bleed-border', {}],
          '--tw-full-bleed-border-top-width',
          '--tw-full-bleed-border-bottom-width',
          ['border-image', 'linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 100vw 0 100vw'],
          ['border-top', 'var(--tw-full-bleed-border-top-width) solid'],
          ['border-bottom', 'var(--tw-full-bleed-border-bottom-width) solid']
        ]
      ],
      [
        [
          'bleed-border-t',
          [
            ['@defaults bleed-border', {}],
            '--tw-full-bleed-border-top-width',
            ['border-image', 'linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 100vw 0 100vw'],
            ['border-top', 'var(--tw-full-bleed-border-top-width) solid']
          ]
        ],
        [
          'bleed-border-b',
          [
            ['@defaults bleed-border', {}],
            '--tw-full-bleed-border-bottom-width',
            ['border-image', 'linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 100vw 0 100vw'],
            ['border-bottom', 'var(--tw-full-bleed-border-bottom-width) solid']
          ]
        ],
        [
          'bleed-border-r',
          [
            ['@defaults bleed-border', {}],
            '--tw-full-bleed-border-top-width',
            '--tw-full-bleed-border-bottom-width',
            ['border-image', 'linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 100vw 0 0'],
            ['border-top', 'var(--tw-full-bleed-border-top-width) solid'],
            ['border-bottom', 'var(--tw-full-bleed-border-bottom-width) solid'],
          ]
        ],
        [
          'bleed-border-l',
          [
            ['@defaults bleed-border', {}],
            '--tw-full-bleed-border-top-width',
            '--tw-full-bleed-border-bottom-width',
            ['border-image', 'linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 0 0 100vw'],
            ['border-top', 'var(--tw-full-bleed-border-top-width) solid'],
            ['border-bottom', 'var(--tw-full-bleed-border-bottom-width) solid'],
          ]
        ],
        [
          'bleed-border-tl',
          [
            ['@defaults bleed-border', {}],
            '--tw-full-bleed-border-top-width',
            ['border-image', 'linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 0 0 100vw'],
            ['border-top', 'var(--tw-full-bleed-border-top-width) solid']
          ]
        ],
        [
          'bleed-border-tr',
          [
            ['@defaults bleed-border', {}],
            '--tw-full-bleed-border-top-width',
            ['border-image', 'linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 100vw 0 0'],
            ['border-top', 'var(--tw-full-bleed-border-top-width) solid']
          ]
        ],
        [
          'bleed-border-bl',
          [
            ['@defaults bleed-border', {}],
            '--tw-full-bleed-border-bottom-width',
            ['border-image', 'linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 0 0 100vw'],
            ['border-bottom', 'var(--tw-full-bleed-border-bottom-width) solid']
          ]
        ],
        [
          'bleed-border-br',
          [
            ['@defaults bleed-border', {}],
            '--tw-full-bleed-border-bottom-width',
            ['border-image', 'linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 100vw 0 0'],
            ['border-bottom', 'var(--tw-full-bleed-border-bottom-width) solid']
          ]
        ],
      ]
    ]

    /* TODO: the imported function from 'tailwindcss/lib/util' below is not working, so I had to move the function here and tweak a bit. if you can make it work, please create a PR

      createUtilityPlugin('bleedBorder', bleedBorderUtilityVariations, {type: ['length']})
    */

    const createUtilityPlugin = (themeKey, utilityVariations = [[themeKey, [themeKey]]], { filterDefault = false, ...options }  = {}) => {
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
                  // return Object.assign(obj, { [name]: transformValue(value) })
                  return Object.assign(obj, { [name]: value })
                }, {})
              },
            })
          }, {}),
          {
            ...options,
            values: filterDefault
              ? Object.fromEntries(
                  Object.entries(theme(themeKey) ?? {}).filter(([modifier]) => modifier !== 'DEFAULT')
                )
              : theme(themeKey),
          }
        )
      }
    }

    createUtilityPlugin('bleedBorder', bleedBorderUtilityVariations, { type: ['length'] })

  },
  {
    theme: {
      bleedBorder: {
        DEFAULT: '1px',
        2: '2px',
        4: '4px',
        8: '8px',
      },
      bleedColor: {
        ...colors
      }
    },
  }
)

module.exports = fullBleed
