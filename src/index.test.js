const path = require('path')
const postcss = require('postcss')
const tailwindcss = require('tailwindcss')
const fullBleedPlugin = require('.')

function run(config, plugin = tailwindcss) {
  let { currentTestName } = expect.getState()
  config = {
    ...{ plugins: [fullBleedPlugin], corePlugins: { preflight: false } },
    ...config,
  }

  return postcss(plugin(config)).process('@tailwind utilities', {
    from: `${path.resolve(__filename)}?test=${currentTestName}`,
  })
}

it('should add the `bleed-bg` utilities', () => {
  const config = {
    content: [{ raw: String.raw`<div class="bleed-bg bleed-bg-r bleed-bg-l"></div>` }],
  }

  return run(config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      .bleed-bg {
        border-image: linear-gradient(var(--tw-full-bleed-color) 0 0) fill 0/ /0 9999vw 0 9999vw;
      }
      .bleed-bg-r {
        border-image: linear-gradient(var(--tw-full-bleed-color) 0 0) fill 0/ /0 9999vw 0 0;
      }
      .bleed-bg-l {
        border-image: linear-gradient(var(--tw-full-bleed-color) 0 0) fill 0/ /0 0 0 9999vw;
      }
    `)
  })
})

it('should add the `bleed-{color}` utilities', () => {
  const config = {
    content: [
      { raw: String.raw`<div class="bleed-red-500 bleed-amber-200 bleed-amber-200/50"></div>` },
    ],
  }

  return run(config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      .bleed-amber-200 {
        --tw-full-bleed-color: #fde68a;
      }
      .bleed-amber-200\/50 {
        --tw-full-bleed-color: rgb(253 230 138 / 0.5);
      }
      .bleed-red-500 {
        --tw-full-bleed-color: #ef4444;
      }
    `)
  })
})

it('should accept theme variables for bleed-{color} utilities from `colors`', () => {
  const config = {
    content: [{ raw: String.raw`<div class="bleed-primary"></div>` }],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#4f46e5',
          },
        },
      },
    },
  }

  return run(config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      .bleed-primary {
        --tw-full-bleed-color: #4f46e5;
      }
    `)
  })
})

it('should accept theme variables for bleed-{color} utilities from `bleedColor`', () => {
  const config = {
    content: [{ raw: String.raw`<div class="bleed-primary"></div>` }],
    theme: {
      extend: {
        bleedColors: {
          primary: {
            DEFAULT: '#4f46e5',
          },
        },
      },
    },
  }

  return run(config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      .bleed-primary {
        --tw-full-bleed-color: #4f46e5;
      }
    `)
  })
})

it('should override `colors` with `bleedColors`', () => {
  const config = {
    content: [{ raw: String.raw`<div class="bleed-primary bleed-secondary"></div>` }],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#4f46e5',
          },
          secondary: '#000',
        },
        bleedColors: {
          primary: {
            DEFAULT: '#ff0000',
          },
        },
      },
    },
  }

  return run(config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      .bleed-primary {
        --tw-full-bleed-color: #ff0000;
      }
      .bleed-secondary {
        --tw-full-bleed-color: #000;
      }
    `)
  })
})

it('should add the `bleed-border` utilities', () => {
  const config = {
    content: [
      {
        raw: String.raw`<div class="bleed-border bleed-border-t bleed-border-b bleed-border-br-4 bleed-border-tl-8"></div>`,
      },
    ],
  }

  return run(config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      .bleed-border {
        --tw-full-bleed-border-top-width: 1px;
        --tw-full-bleed-border-bottom-width: 1px;
        border-image: linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 9999vw 0 9999vw;
        border-top: var(--tw-full-bleed-border-top-width) solid;
        border-bottom: var(--tw-full-bleed-border-bottom-width) solid;
      }
      .bleed-border-b {
        --tw-full-bleed-border-bottom-width: 1px;
        border-image: linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 9999vw 0 9999vw;
        border-bottom: var(--tw-full-bleed-border-bottom-width) solid;
      }
      .bleed-border-br-4 {
        --tw-full-bleed-border-bottom-width: 4px;
        border-image: linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 9999vw 0 0;
        border-bottom: var(--tw-full-bleed-border-bottom-width) solid;
      }
      .bleed-border-t {
        --tw-full-bleed-border-top-width: 1px;
        border-image: linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 9999vw 0 9999vw;
        border-top: var(--tw-full-bleed-border-top-width) solid;
      }
      .bleed-border-tl-8 {
        --tw-full-bleed-border-top-width: 8px;
        border-image: linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 0 0 9999vw;
        border-top: var(--tw-full-bleed-border-top-width) solid;
      }
    `)
  })
})

it('should accept theme variables for `bleed-border-{borderWidth}` utilities from `borderWidth`', () => {
  const config = {
    content: [
      { raw: String.raw`<div class="bleed-border-2 bleed-border-13 bleed-border-t-22"></div>` },
    ],
    theme: {
      extend: {
        borderWidth: {
          13: '13px',
          22: '5em',
        },
      },
    },
  }

  return run(config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      .bleed-border-13 {
        --tw-full-bleed-border-top-width: 13px;
        --tw-full-bleed-border-bottom-width: 13px;
        border-image: linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 9999vw 0 9999vw;
        border-top: var(--tw-full-bleed-border-top-width) solid;
        border-bottom: var(--tw-full-bleed-border-bottom-width) solid;
      }
      .bleed-border-2 {
        --tw-full-bleed-border-top-width: 2px;
        --tw-full-bleed-border-bottom-width: 2px;
        border-image: linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 9999vw 0 9999vw;
        border-top: var(--tw-full-bleed-border-top-width) solid;
        border-bottom: var(--tw-full-bleed-border-bottom-width) solid;
      }
      .bleed-border-t-22 {
        --tw-full-bleed-border-top-width: 5em;
        border-image: linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 9999vw 0 9999vw;
        border-top: var(--tw-full-bleed-border-top-width) solid;
      }
    `)
  })
})

it('should accept theme variables for `bleed-border-{borderWidth}` utilities from `bleedBorderWidth`', () => {
  const config = {
    content: [{ raw: String.raw`<div class="bleed-border-17"></div>` }],
    theme: {
      extend: {
        bleedBorderWidth: {
          17: '17px',
        },
      },
    },
  }

  return run(config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      .bleed-border-17 {
        --tw-full-bleed-border-top-width: 17px;
        --tw-full-bleed-border-bottom-width: 17px;
        border-image: linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 9999vw 0 9999vw;
        border-top: var(--tw-full-bleed-border-top-width) solid;
        border-bottom: var(--tw-full-bleed-border-bottom-width) solid;
      }
    `)
  })
})

it('should override `borderWidth` with `bleedBorderWidth`', () => {
  const config = {
    content: [{ raw: String.raw`<div class="bleed-border-sm bleed-border-lg"></div>` }],
    theme: {
      extend: {
        borderWidth: {
          sm: '2px',
          lg: '8px',
        },
        bleedBorderWidth: {
          sm: '4px',
        },
      },
    },
  }

  return run(config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      .bleed-border-lg {
        --tw-full-bleed-border-top-width: 8px;
        --tw-full-bleed-border-bottom-width: 8px;
        border-image: linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 9999vw 0 9999vw;
        border-top: var(--tw-full-bleed-border-top-width) solid;
        border-bottom: var(--tw-full-bleed-border-bottom-width) solid;
      }
      .bleed-border-sm {
        --tw-full-bleed-border-top-width: 4px;
        --tw-full-bleed-border-bottom-width: 4px;
        border-image: linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 9999vw 0 9999vw;
        border-top: var(--tw-full-bleed-border-top-width) solid;
        border-bottom: var(--tw-full-bleed-border-bottom-width) solid;
      }
    `)
  })
})

it('should not affect borderWidth utilities', () => {
  const config = {
    content: [{ raw: String.raw`<div class="border-2 border-13"></div>` }],
    theme: {
      extend: {
        borderWidth: {
          13: '13px',
        },
      },
    },
  }

  return run(config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      .border-13 {
        border-width: 13px;
      }
      .border-2 {
        border-width: 2px;
      }
    `)
  })
})

it('should add the `bleed-none` utility', () => {
  const config = {
    content: [{ raw: String.raw`<div class="bleed-none !bleed-none"></div>` }],
  }

  return run(config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      .\!bleed-none {
        --tw-full-bleed-border-top-width: 0px !important;
        --tw-full-bleed-border-bottom-width: 0px !important;
        border-image: none !important;
      }
      .bleed-none {
        --tw-full-bleed-border-top-width: 0px;
        --tw-full-bleed-border-bottom-width: 0px;
        border-image: none;
      }
    `)
  })
})

it('should generate arbitrary values', () => {
  const config = {
    content: [{ raw: String.raw`<div class="bleed-[#ff0000] bleed-border-t-[1em]"></div>` }],
  }

  return run(config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      .bleed-\[\#ff0000\] {
        --tw-full-bleed-color: #ff0000;
      }
      .bleed-border-t-\[1em\] {
        --tw-full-bleed-border-top-width: 1em;
        border-image: linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 9999vw 0 9999vw;
        border-top: var(--tw-full-bleed-border-top-width) solid;
      }
    `)
  })
})
