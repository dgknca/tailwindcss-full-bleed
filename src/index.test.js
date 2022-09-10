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
        border-image: linear-gradient(var(--tw-full-bleed-color) 0 0) fill 0/ /0 100vw 0 100vw;
      }
      .bleed-bg-r {
        border-image: linear-gradient(var(--tw-full-bleed-color) 0 0) fill 0/ /0 100vw 0 0;
      }
      .bleed-bg-l {
        border-image: linear-gradient(var(--tw-full-bleed-color) 0 0) fill 0/ /0 0 0 100vw;
      }
    `)
  })
})

it('should add the `bleed-border` utilities', () => {
  const config = {
    content: [{ raw: String.raw`<div class="bleed-border bleed-border-t bleed-border-b bleed-border-br-4 bleed-border-tl-8"></div>` }],
  }

  return run(config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      .bleed-border {
        --tw-full-bleed-border-top-width: 1px;
        --tw-full-bleed-border-bottom-width: 1px;
        border-image: linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 100vw 0 100vw;
        border-top: var(--tw-full-bleed-border-top-width) solid;
        border-bottom: var(--tw-full-bleed-border-bottom-width) solid;
      }
      .bleed-border-t {
        --tw-full-bleed-border-top-width: 1px;
        border-image: linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 100vw 0 100vw;
        border-top: var(--tw-full-bleed-border-top-width) solid;
      }
      .bleed-border-b {
        --tw-full-bleed-border-bottom-width: 1px;
        border-image: linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 100vw 0 100vw;
        border-bottom: var(--tw-full-bleed-border-bottom-width) solid;
      }
      .bleed-border-br-4 {
        --tw-full-bleed-border-bottom-width: 4px;
        border-image: linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 100vw 0 0;
        border-bottom: var(--tw-full-bleed-border-bottom-width) solid;
      }
      .bleed-border-tl-8 {
        --tw-full-bleed-border-top-width: 8px;
        border-image: linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 0 0 100vw;
        border-top: var(--tw-full-bleed-border-top-width) solid;
      }
    `)
  })
})

it('should add the `bleed-{color}` utilities', () => {
  const config = {
    content: [{ raw: String.raw`<div class="bleed-red-500 bleed-amber-200 bleed-amber-200/50"></div>` }],
  }

  return run(config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      .bleed-red-500 {
        --tw-full-bleed-color: #ef4444;
      }
      .bleed-amber-200 {
        --tw-full-bleed-color: #fde68a;
      }
      .bleed-amber-200\/50 {
        --tw-full-bleed-color: rgb(253 230 138 / 0.5);
      }
    `)
  })
})

it('should add the `bleed-none` utilities', () => {
  const config = {
    content: [{ raw: String.raw`<div class="bleed-none"></div>` }],
  }

  return run(config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      .bleed-none {
        --tw-full-bleed-border-top-width: 0px;
        --tw-full-bleed-border-bottom-width: 0px;
        border-image: none;
      }
    `)
  })
})

it('should accept theme variables for `bleedBorder` utilities', () => {
  const config = {
    content: [{ raw: String.raw`<div class="bleed-border-13 bleed-border-t-22"></div>` }],
    theme: {
      extend: {
        bleedBorder: {
          13: '13px',
          22: '5em'
        }
      }
    }
  }

  return run(config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      .bleed-border-13 {
        --tw-full-bleed-border-top-width: 13px;
        --tw-full-bleed-border-bottom-width: 13px;
        border-image: linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 100vw 0 100vw;
        border-top: var(--tw-full-bleed-border-top-width) solid;
        border-bottom: var(--tw-full-bleed-border-bottom-width) solid;
      }
      .bleed-border-t-22 {
        --tw-full-bleed-border-top-width: 5em;
        border-image: linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 100vw 0 100vw;
        border-top: var(--tw-full-bleed-border-top-width) solid;
      }
    `)
  })
})

it('should accept theme variables for `bleedColor` utilities', () => {
  const config = {
    content: [{ raw: String.raw`<div class="bleed-primary bleed-secondary"></div>` }],
    theme: {
      extend: {
        bleedColor: {
          primary: '#e0e0e0',
          secondary: '#a0a0a0'
        }
      }
    }
  }

  return run(config).then((result) => {
    expect(result.css).toMatchCss(String.raw`
      .bleed-primary {
        --tw-full-bleed-color: #e0e0e0;
      }
      .bleed-secondary {
        --tw-full-bleed-color: #a0a0a0;
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
        border-image: linear-gradient(var(--tw-full-bleed-color) 0 0) 1 / /0 100vw 0 100vw;
        border-top: var(--tw-full-bleed-border-top-width) solid;
      }
    `)
  })
})
