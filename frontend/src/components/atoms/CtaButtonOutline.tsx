import { twMerge } from 'tailwind-merge';
import CtaButton from './CtaButton';

const CtaButtonOutline = (
  props: React.PropsWithChildren<{ className?: string; onClick: (e: React.MouseEvent) => void }>
) => {
  return (
    <CtaButton className={twMerge("bg-transparent border shadow-none rounded-md", props.className)} onClick={props.onClick}>
      {props.children}
    </CtaButton>
  );
};

export default CtaButtonOutline;
