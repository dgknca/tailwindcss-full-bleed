# tailwindcss-full-bleed

A plugin that provides utilities for extended backgrounds and borders.

## [Demo](https://dgknca.github.io/tailwindcss-full-bleed)


## Installation

Install the plugin from npm:

```sh
npm install -D tailwindcss-full-bleed

or

yarn add -D tailwindcss-full-bleed
```

Then add the plugin to your `tailwind.config.js` file:

```js
// tailwind.config.js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('tailwindcss-full-bleed'),
    // ...
  ],
}
```

## Usage

| Class | Description |
| --- | --- |
| `bleed-{color}` | Any tailwind color to specify the bleed color. |
| `bleed-bg` | A background that extends to the left and right. |
| `bleed-bg-l` | A background that extends to the left. |
| `bleed-bg-r` | A background that extends to the right. |
| `bleed-border` | 1px top and bottom border that extends to the left and right. |
| `bleed-border-t` | 1px top border that extends to the left and right. |
| `bleed-border-b` | 1px bottom border that extends to the left and right. |
| `bleed-border-l` | 1px top and bottom border that extends to the left. |
| `bleed-border-r` | 1px top and bottom border that extends to the right. |
| `bleed-border-tl` | 1px top border that extends to the left. |
| `bleed-border-tr` | 1px top border that extends to the right. |
| `bleed-border-bl` | 1px bottom border that extends to the left. |
| `bleed-border-br` | 1px bottom border that extends to the right. |
| `bleed-border-br-2` | 2px bottom border that extends to the right. |
| `bleed-border-br-4` | 4px bottom border that extends to the right. |
| `bleed-border-br-8` | 8px bottom border that extends to the right. |
| `bleed-border-br-[14px]` | 14px bottom border that extends to the right. |
| `bleed-none` | To remove any full-bleeding. |


## Extending the Plugin

`bleed-{color}` and `bleed-border-{borderWidth}` values are using Tailwind's `colors` and `borderWidth` configuration. If you want to extend the classes provided by this plugin, you will need to extend the `colors` (or `bleedColors`) and `borderWidth` (or `bleedBorderWidth`) utilities in your `tailwind.config.js` file.

For example, to add a new color to the `bleed-{color}` utility, add the color to your `colors` configuration:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4f46e5'
        }
      }
    }
  },
  // ...
}
```

Similarly, to add a new border width to the `bleed-border` utility, add the width to your `borderWidth` configuration:

```js
module.exports = {
  theme: {
    extend: {
      borderWidth: {
        10: '10px'
      }
    }
  },
  // ...
}
```

If you want to add colors that only apply to bleed utilities, use `bleedColors` property instead:

```js
module.exports = {
  theme: {
    extend: {
      bleedColors: {
        primary: {
          DEFAULT: '#4f46e5' // <- only avaiable for bleed-{color} classes
        }
      }
    }
  },
  // ...
}
```

If the same color is avaiable in `colors`, `bleedColors` will override the color value for `bleed-{color}` classes. Use `bleedBorderWidth` property for bleed only border widths as well.