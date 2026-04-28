export default function Text({
  as: Component = 'p', // o as eh para definir o tipo de elemento html que sera renderizado
  children,
  size = 'md',
  weight = 'normal',
  color = 'gray',
  className = '',
  ...props
}) {
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
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
