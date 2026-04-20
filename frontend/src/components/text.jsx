export default function Text({
  as: Component = 'p', // p por padrão
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

// <Text size="xl" weight="bold" color="pink">
//   Olá queen
// </Text>

// <Text as="h1" size="lg" weight="medium" color="blue">
//   Título
// </Text>

// <Text className="underline">
//   Texto com estilo extra
// </Text>
