import { twMerge } from 'tailwind-merge';

const CtaButton = (props: React.PropsWithChildren<{ className?: string; onClick?: (e: React.MouseEvent) => void }>) => {
  return (
    <button
      {...props}
      className={twMerge(
        'm-2 text-neutral-200 font-bold shadow-indigo-600 py-2 px-6 rounded-md bg-indigo-800 hover:brightness-110 hover:scale-[1.03] hover:drop-shadow-xl transition shadow-[8px_8px_15px_0px_var(--tw-shadow-color)_inset] text-xl',
        props.className
      )}
    >
      {props.children}
    </button>
  );
};

export default CtaButton;
