import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const variantStyles = {
  primary:
    'rounded-xl bg-[#c6953b] text-[#fffdf8] shadow-lg shadow-[#9c762f]/20 hover:bg-[#b98731] hover:scale-[1.02]',
  secondary:
    'rounded-xl border border-[#d7d4c7] bg-[#fffdf8] text-[#554632] hover:border-[#9ba98d] hover:bg-[#edf0e7] hover:text-[#65785b]',
  dark:
    'rounded-xl bg-[#e6ebdf] text-[#4c5d44] hover:bg-[#d8e1cf] hover:scale-[1.02]',
};

export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  icon = true,
  className = '',
  ...props
}) {
  const baseClasses = `focus-ring inline-flex min-h-11 max-w-full items-center justify-center gap-2 px-5 py-3 text-center text-sm font-semibold leading-5 transition duration-200 ${variantStyles[variant] || variantStyles.primary} ${className}`;

  const content = icon ? (
    <>
      <span className="min-w-0">{children}</span>
      <ArrowRight aria-hidden="true" className="shrink-0" size={17} />
    </>
  ) : (
    children
  );

  if (to) {
    return (
      <Link to={to} className={baseClasses} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={baseClasses} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button className={baseClasses} {...props}>
      {content}
    </button>
  );
}
