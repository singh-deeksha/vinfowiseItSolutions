import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const variantStyles = {
  primary:
    'rounded-xl bg-[#c6953b] text-[#fffdf8] hover:bg-[#b98731]',
  secondary:
    'rounded-xl border border-[#cbdcda] bg-[#fffdf8] text-[#554632] hover:border-[#76a5aa] hover:bg-[#eaf2f0] hover:text-[#46797e]',
  dark:
    'rounded-xl bg-[#e5efee] text-[#466b70] hover:bg-[#d5e6e4]',
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
