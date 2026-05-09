export default function Input({
  as: Component = 'input', // o nome input vem do html
  size = 'md',
  variant = 'default',
  className = '',
  ...props
}) {
  const sizes = {
    sm: 'text-sm px-3 py-1.5 rounded-md',
    md: 'text-base px-3 py-2 rounded-lg',
    lg: 'text-lg px-4 py-3 rounded-xl',
  };

  const variants = {
    default:
      'border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/30',
    error:
      'border border-red-500 bg-white text-gray-900 placeholder:text-gray-400 focus:border-red-600 focus:ring-2 focus:ring-red-500/30',
  };

  const base =
    'w-full font-sans outline-none transition-[border-color,box-shadow] disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500'; // base é a classe base que sera aplicada a todos os inputs

  const classes = `
      ${base}
      ${sizes[size]}
      ${variants[variant]}
      ${className}
    `;

  return (
    <Component
      className={classes.trim()}
      {...props}
    />
  );
}

// ex de implementacao:
//
// <Input type="email" placeholder="seu@email.com" />
//
// <Input type="password" size="lg" />
//
// <Input variant="error" aria-invalid />
//
// <Input as="textarea" rows={4} placeholder="Mensagem" />
