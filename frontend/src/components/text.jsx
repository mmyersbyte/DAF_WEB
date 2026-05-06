export default function Text({
  as: Component = 'p', // o as eh para definir o tipo de elemento html que sera renderizado
  children,
  size = 'md',
  weight = 'normal',
  color = 'gray',
  className = '',
  fontFamily = 'var(--font-family)',
  ...props
}) {
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
    '6xl': 'text-6xl',
    '7xl': 'text-7xl',
    '8xl': 'text-8xl',
    '9xl': 'text-9xl',
  };
  const weights = {
    normal: 'font-normal',
    medium: 'font-medium',
    bold: 'font-bold',
  };

  const colors = {
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
  const classes = `
      font-sans
      ${sizes[size]}
      ${weights[weight]}
      ${colors[color]}
      ${className}
      ${fontFamily}
    `;

  return (
    <Component
      className={classes.trim()}
      {...props}
    >
      {children}
    </Component>
  );
}

// ex de implementacao:

// <Text size="xl" weight="bold" color="pink">
//   oiiiii
// </Text>

// <Text as="h1" size="lg" weight="medium" color="blue">
//   hum
// </Text>

// <Text className="underline">
//   sos
// </Text>
