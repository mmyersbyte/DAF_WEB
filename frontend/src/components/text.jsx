export default function Text({
  as: Component = 'p',
  children,
  size = 'md',
  weight = 'normal',
  color = 'gray',
  className = '',
  fontFamily = 'var(--font-family)',
  ...props
}) {
  const sizes = {
    // Escala semantica
    caption: 'text-sm leading-5',
    body: 'text-lg leading-7',
    lead: 'text-xl leading-8',
    title: 'text-3xl leading-10 tracking-tight',
    subtitle: 'text-2xl leading-9 tracking-tight',
    display: 'text-4xl leading-tight tracking-tight md:text-5xl',

    // Escala tradicional (mantida por compatibilidade)
    sm: 'text-base leading-6',
    md: 'text-lg leading-7',
    lg: 'text-xl leading-8',
    xl: 'text-2xl leading-9',
    '2xl': 'text-3xl leading-10',
    '3xl': 'text-4xl leading-tight',
    '4xl': 'text-5xl leading-tight',
    '5xl': 'text-6xl leading-tight',
    '6xl': 'text-7xl leading-none',
    '7xl': 'text-8xl leading-none',
    '8xl': 'text-9xl leading-none',
    '9xl': 'text-9xl leading-none',
  };
  const weights = {
    normal: 'font-normal',
    medium: 'font-medium',
    bold: 'font-bold',
  };

  const colors = {
    gray: 'text-gray-700',
    primary: 'text-[var(--color-primary)]',
    primaryDark: 'text-[var(--color-primary-dark)]',
    primaryLight: 'text-[var(--color-primary-light)]',

    accent: 'text-[var(--color-accent)]',

    success: 'text-[var(--color-success)]',
    danger: 'text-[var(--color-danger)]',

    text: 'text-[var(--color-text)]',
    muted: 'text-gray-400',

    border: 'text-[var(--color-border)]',
  };
  const classes = [
    'font-sans',
    sizes[size] ?? sizes.md,
    weights[weight] ?? weights.normal,
    colors[color] ?? colors.gray,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const inlineStyle = {
    fontFamily,
    ...(props.style || {}),
  };

  return (
    <Component
      {...props}
      className={classes}
      style={inlineStyle}
    >
      {children}
    </Component>
  );
}

//
// ex de implementacao:
//
// <Text>swodke</Text>
//
// <Text size="lg">Texto grande</Text

// usando "as" para renderizar como <h1>, <h2>, <h3>, <h4>, <h5>, <h6>
//ex: <Text as="h1">Titulo principal</Text>
