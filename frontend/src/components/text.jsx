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
    '5xl': 'text-5xl',
    '6xl': 'text-6xl',
    '7xl': 'text-7xl',
    '8xl': 'text-8xl',
    '9xl': 'text-9xl',
    '10xl': 'text-10xl',
  };

  const weights = {
    normal: 'font-normal',
    medium: 'font-medium',
    bold: 'font-bold',
  };

  const colors = {
    gray: 'text-gray-400',
    black: 'text-black',
    pink: 'text-pink-500',
    blue: 'text-blue-500',
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
