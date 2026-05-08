export default function Text({
  as: Component = 'p', // o as eh para definir o tipo de elemento html que sera renderizado
  children,
  size = 'md',
  weight = 'normal',
  color = 'text',
  className = '',
  fontFamily = 'var(--font-family)',
  ...props
}) {
  const sizes = {
    sm: 'text-sm leading-5',
    md: 'text-base leading-6',
    lg: 'text-lg leading-7',
    xl: 'text-xl leading-8',
    '2xl': 'text-2xl leading-9',
    '3xl': 'text-3xl leading-tight',
    '4xl': 'text-4xl leading-tight',
    '5xl': 'text-5xl leading-tight',
    '6xl': 'text-6xl leading-tight',
    '7xl': 'text-7xl leading-tight',
    '8xl': 'text-8xl leading-tight',
    '9xl': 'text-9xl leading-tight',
  };
  const weights = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
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
