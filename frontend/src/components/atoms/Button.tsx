import { twMerge } from 'tailwind-merge'

const Button = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string
    styleType?: 'primary' | 'secondary' | 'danger'
  }
) => {
  const { styleType, className, children, ...otherProps } = props;
  const style = styleType ?? 'primary';
  let classesToApply = '';
  switch (style) {
    case 'primary':
      classesToApply = '';
      break;
    case 'secondary':
      classesToApply = 'bg-secondary shadow-secondary text-mainBg';
      break;
    default:
      classesToApply = 'bg-danger shadow-danger';
  }

  return (
    <button
      {...otherProps}
      className={twMerge(
        'm-2 text-neutral-200 shadow-indigo-600 rounded-md pb-1 px-2 bg-indigo-800 hover:brightness-110  hover:drop-shadow-xl transition shadow-[8px_8px_15px_0px_var(--tw-shadow-color)_inset] text-md',
        classesToApply,
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
