const themeColors = require('./src/theme/colors.js')
const { fontSize } = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      ...themeColors,
      blue: { ...themeColors.blue },
      grey: { ...themeColors.grey },
    },
    fontFamily: {
      sans: ['"Roboto"', 'sans-serif'],
    },
    fontSize: {
      ...fontSize,
      20: '20px',
    },
    screens: {
      xl2: { max: '1535px' }, // => @media (max-width: 1535px) { ... }
      xl: { max: '1279px' }, // => @media (max-width: 1279px) { ... }
      lg: { max: '1023px' }, // => @media (max-width: 1023px) { ... }
      // Excluded
      // 'md': { max: '767px' }, // => @media (max-width: 767px) { ... }
      // 'sm': { max: '639px' }, // => @media (max-width: 639px) { ... }
    },
    boxShadow: {
      card: '0px 2px 8px rgba(167, 167, 167, 0.25)',
    },
  },
  variants: {
    appearance: [],
  },
  corePlugins: [
    'preflight', // Tailwind's base/reset styles
    // 'container'	The container component
    // 'accessibility',	The sr-only and not-sr-only utilities
    // 'alignContent', // The align-content utilities like content-end
    'alignItems', // The align-items utilities like items-center
    // 'alignSelf', // The align-self utilities like self-end
    // 'animation', // The animation utilities like animate-none
    // 'appearance', // The appearance utilities like appearance-none
    // 'backdropBlur', // The backdrop-blur utilities like backdrop-blur-md
    // 'backdropBrightness', // The backdrop-brightness utilities like backdrop-brightness-100
    // 'backdropContrast', // The backdrop-contrast utilities like backdrop-contrast-100
    // 'backdropFilter', // The backdrop-filter utilities like backdrop-filter
    // 'backdropGrayscale', // The backdrop-grayscale utilities like backdrop-grayscale-0
    // 'backdropHueRotate', // The backdrop-hue-rotate utilities like backdrop-hue-rotate-180
    // 'backdropInvert', // The backdrop-invert utilities like backdrop-invert-0
    // 'backdropOpacity', // The backdrop-opacity utilities like backdrop-opacity-50
    // 'backdropSaturate', // The backdrop-saturate utilities like backdrop-saturate-100
    // 'backdropSepia', // The backdrop-sepia utilities like backdrop-sepia-0
    // 'backgroundAttachment', // The background-attachment utilities like bg-local
    // 'backgroundBlendMode', // The background-blend-mode utilities like bg-blend-color-burn
    // 'backgroundClip', // The background-clip utilities like bg-clip-padding
    'backgroundColor', // The background-color utilities like bg-green-700
    // 'backgroundImage', // The background-image utilities like bg-gradient-to-br
    // 'backgroundOpacity', // The background-color opacity utilities like bg-opacity-25
    // 'backgroundPosition', // The background-position utilities like bg-left-top
    // 'backgroundRepeat', // The background-repeat utilities like bg-repeat-x
    // 'backgroundSize', // The background-size utilities like bg-cover
    // 'blur', // The blur utilities like blur-md
    // 'borderCollapse', // The border-collapse utilities like border-collapse
    'borderColor', // The border-color utilities like border-green-700
    // 'borderOpacity', // The border-color opacity utilities like border-opacity-25
    'borderRadius', // The border-radius utilities like rounded-l-3xl
    // 'borderStyle', // The border-style utilities like border-dotted
    'borderWidth', // The border-width utilities like border-l-2
    // 'boxDecorationBreak', // The box-decoration-break utilities like decoration-slice
    'boxShadow', // The box-shadow utilities like shadow-lg
    // 'boxSizing', // The box-sizing utilities like box-border
    // 'brightness', // The brightness utilities like brightness-100
    // 'clear', // The clear utilities like clear-right
    // 'contrast', // The contrast utilities like contrast-100
    'cursor', // The cursor utilities like cursor-wait
    'display', // The display utilities like table-column-group
    // 'divideColor', // The between elements border-color utilities like divide-gray-500
    // 'divideOpacity', // The divide-opacity utilities like divide-opacity-50
    // 'divideStyle', // The divide-style utilities like divide-dotted
    // 'divideWidth', // The between elements border-width utilities like divide-x-2
    // 'dropShadow', // The drop-shadow utilities like drop-shadow-lg
    // 'fill', // The fill utilities like fill-current
    // 'filter', // The filter utilities like filter
    // 'flex', // The flex utilities like flex-auto
    'flexDirection', // The flex-direction utilities like flex-row-reverse
    'flexGrow', // The flex-grow utilities like flex-grow-0
    'flexShrink', // The flex-shrink utilities like flex-shrink-0
    'flexWrap', // The flex-wrap utilities like flex-wrap-reverse
    // 'float', // The float utilities like float-left
    // 'fontFamily', // The font-family utilities like font-serif
    'fontSize', // The font-size utilities like text-3xl
    // 'fontSmoothing', // The font-smoothing utilities like antialiased
    // 'fontStyle', // The font-style utilities like italic
    // 'fontVariantNumeric', // The font-variant-numeric utilities like lining-nums
    'fontWeight', // The font-weight utilities like font-medium
    // 'gap', // The gap utilities like gap-x-28
    // 'gradientColorStops', // The gradient-color-stops utilities like via-green-700
    // 'grayscale', // The grayscale utilities like grayscale-0
    // 'gridAutoColumns', // The grid-auto-columns utilities like auto-cols-min
    // 'gridAutoFlow', // The grid-auto-flow utilities like grid-flow-col
    // 'gridAutoRows', // The grid-auto-rows utilities like auto-rows-min
    // 'gridColumn', // The grid-column utilities like col-span-6
    // 'gridColumnEnd', // The grid-column-end utilities like col-end-7
    // 'gridColumnStart', // The grid-column-start utilities like col-start-7
    // 'gridRow', // The grid-row utilities like row-span-3
    // 'gridRowEnd', // The grid-row-end utilities like row-end-4
    // 'gridRowStart', // The grid-row-start utilities like row-start-4
    // 'gridTemplateColumns', // The grid-template-columns utilities like grid-cols-7
    // 'gridTemplateRows', // The grid-template-rows utilities like grid-rows-4
    // 'height', // The height utilities like h-64
    // 'hueRotate', // The hue-rotate utilities like hue-rotate-180
    // 'inset', // The inset utilities like bottom-10
    // 'invert', // The invert utilities like invert-0
    // 'isolation', // The isolation utilities like isolate
    'justifyContent', // The justify-content utilities like justify-center
    // 'justifyItems', // The justify-items utilities like justify-items-end
    // 'justifySelf', // The justify-self utilities like justify-self-end
    // 'letterSpacing', // The letter-spacing utilities like tracking-normal
    'lineHeight', // The line-height utilities like leading-9
    // 'listStylePosition', // The list-style-position utilities like list-inside
    // 'listStyleType', // The list-style-type utilities like list-disc
    'margin', // The margin utilities like ml-8
    // 'maxHeight', // The max-height utilities like max-h-32
    // 'maxWidth', // The max-width utilities like max-w-5xl
    'minHeight', // The min-height utilities like min-h-full
    // 'minWidth', // The min-width utilities like min-w-full
    // 'mixBlendMode', // The mix-blend-mode utilities like mix-blend-color-burn
    // 'objectFit', // The object-fit utilities like object-fill
    // 'objectPosition', // The object-position utilities like object-left-top
    // 'opacity', // The opacity utilities like opacity-50
    // 'order', // The order utilities like order-8
    // 'outline', // The outline utilities like outline-white
    // 'overflow', // The overflow utilities like overflow-y-auto
    // 'overscrollBehavior', // The overscroll-behavior utilities like overscroll-y-contain
    'padding', // The padding utilities like pr-4
    // 'placeContent', // The place-content utilities like place-content-between
    // 'placeholderColor', // The placeholder color utilities like placeholder-red-600
    // 'placeholderOpacity', // The placeholder color opacity utilities like placeholder-opacity-25
    // 'placeItems', // The place-items utilities like place-items-end
    // 'placeSelf', // The place-self utilities like place-self-end
    // 'pointerEvents', // The pointer-events utilities like pointer-events-none
    'position', // The position utilities like absolute
    // 'resize', // The resize utilities like resize-y
    // 'ringColor', // The ring-color utilities like ring-green-700
    // 'ringOffsetColor', // The ring-offset-color utilities like ring-offset-green-700
    // 'ringOffsetWidth', // The ring-offset-width utilities like ring-offset-2
    // 'ringOpacity', // The ring-opacity utilities like ring-opacity-50
    // 'ringWidth', // The ring-width utilities like ring-2
    // 'rotate', // The rotate utilities like rotate-180
    // 'saturate', // The saturate utilities like saturate-100
    // 'scale', // The scale utilities like scale-x-95
    // 'sepia', // The sepia utilities like sepia-0
    // 'skew', // The skew utilities like -skew-x-1
    // 'space', // The "space-between" utilities like space-x-4
    // 'stroke', // The stroke utilities like stroke-current
    // 'strokeWidth', // The stroke-width utilities like stroke-1
    // 'tableLayout', // The table-layout utilities like table-auto
    // 'textAlign', // The text-align utilities like text-center
    'textColor', // The text-color utilities like text-green-700
    // 'textDecoration', // The text-decoration utilities like line-through
    // 'textOpacity', // The text-opacity utilities like text-opacity-50
    // 'textOverflow', // The text-overflow utilities like overflow-ellipsis
    'textTransform', // The text-transform utilities like lowercase
    // 'transform', // The transform utility (for enabling transform features)
    // 'transformOrigin', // The transform-origin utilities like origin-bottom-right
    // 'transitionDelay', // The transition-delay utilities like delay-200
    // 'transitionDuration', // The transition-duration utilities like duration-200
    // 'transitionProperty', // The transition-property utilities like transition-colors
    // 'transitionTimingFunction', // The transition-timing-function utilities like ease-in
    // 'translate', // The translate utilities like -translate-x-full
    // 'userSelect', // The user-select utilities like select-text
    // 'verticalAlign', // The vertical-align utilities like align-middle
    // 'visibility', // The visibility utilities like visible
    // 'whitespace', // The whitespace utilities like whitespace-pre
    'width', // The width utilities like w-0.5
    // 'wordBreak', // The word-break utilities like break-words
    // 'zIndex', // The z-index utilities like z-30
  ],
}
