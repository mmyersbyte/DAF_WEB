export default function Button({
  as: Component = 'button', // as permite renderizar como <button> ou <a> (link com cara de botao)
  children,
  size = 'md',
  variant = 'primary',
  type = 'button', // type='button' evita submit acidental em formularios; em <a> nao eh aplicado
  className = '',
  ...props
}) {
  const sizes = {
    sm: 'text-sm px-4 py-1.5 min-h-[2rem]',
    md: 'text-base px-5 py-2 min-h-[2.5rem]',
    lg: 'text-lg px-6 py-3 min-h-[3rem]',
  };

  const variants = {
    primary:
      'bg-gradient-to-r from-violet-600 to-indigo-400 text-white shadow-md hover:brightness-110 active:brightness-95',
    secondary:
      'bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400',
    outline:
      'border-2 border-violet-600 bg-transparent text-violet-700 hover:bg-violet-50 active:bg-violet-100',
    danger:
      'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
  };

  // classes comuns a todos os botoes: alinhamento, foco acessivel, estado disabled
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full font-sans font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

  const classes = `
      ${base}
      ${sizes[size]}
      ${variants[variant]}
      ${className}
    `;

  // <a> nao aceita type="button"; por isso espalhamos type so quando for elemento button
  const domProps =
    Component === 'button' ? { type, ...props } : props;

  return (
    <Component className={classes.trim()} {...domProps}>
      {children}
    </Component>
  );
}

// ex de implementacao:
//
// <Button>Entrar</Button>
//
// <Button size="lg" variant="secondary">Cancelar</Button>
//
// <Button variant="outline" type="submit">Salvar</Button>
//
// <Button variant="danger" disabled>Excluir</Button>
//
// <Button as="a" href="/docs" variant="outline">Documentacao</Button>
