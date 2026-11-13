import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const variantStyles = {
  primary:
    'rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700 hover:scale-[1.02]',
  secondary:
    'rounded-xl border border-slate-300/80 bg-white/70 text-slate-950 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-blue-500/10 dark:hover:text-blue-200',
  dark:
    'rounded-xl bg-slate-950 text-white hover:bg-slate-800 hover:scale-[1.02] dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200',
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
