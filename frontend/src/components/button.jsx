export default function Button({
  as: Component = 'button', // as permite renderizar como <button> ou <a> (link com cara de botao
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
      'bg-[var(--color-primary)] text-white shadow-md hover:bg-[var(--color-primary-dark)] active:brightness-95',
    secondary:
      'bg-[var(--color-primary-light)] text-[var(--color-text)] hover:brightness-95 active:brightness-90',
    outline:
      'border-2 border-[var(--color-primary)] bg-transparent text-[var(--color-primary-dark)] hover:bg-[var(--color-primary-light)] active:brightness-95',
    danger:
      'bg-[var(--color-danger)] text-white hover:brightness-95 active:brightness-90',
  };

  // classes comuns a todos os botoes: alinhamento, foco acessivel, estado disabled
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full font-sans font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

  const classes = `
      ${base}
      ${sizes[size]}
      ${variants[variant]}
      ${className}
    `;

  // <a> nao aceita type="button"; por isso espalhamos type so quando for elemento button
  const domProps = Component === 'button' ? { type, ...props } : props;

  return (
    <Component
      className={classes.trim()}
      {...domProps}
    >
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
