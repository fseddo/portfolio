import type { HTMLAttributes } from 'react';
import type { TechStatus } from '../../home/data/satellite';
import { cx } from '../utils/cx';

type ChipSize = 'sm' | 'md';

type TechChipProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  name: string;
  years: string;
  status: TechStatus;
  size?: ChipSize;
};

// Status drives both the chip background/border AND the dot color.
// Keys match TechStatus exactly — adding a new status is a compile error
// here until the map is updated.
const STATUS_CHIP: Record<TechStatus, string> = {
  daily: 'text-cream bg-copper/20 border-copper/45',
  exploring:
    'text-[rgba(181,198,144,0.95)] bg-moss/25 border-moss/50',
  occasional:
    'text-cream/55 bg-cream/[0.04] border-cream/[0.12]',
  default:
    'text-cream/[0.78] bg-cream/5 border-cream/[0.12]',
};

const STATUS_DOT: Record<TechStatus, string> = {
  daily: 'bg-copper shadow-[0_0_8px_var(--color-copper)]',
  exploring: 'bg-moss shadow-[0_0_8px_rgba(90,109,58,0.7)]',
  occasional: 'bg-cream/40',
  default: 'bg-cream/40',
};

const SIZE_CHIP: Record<ChipSize, string> = {
  sm: 'text-[11px] px-3 py-[7px] gap-2',
  md: 'text-[13px] px-[18px] py-[10px] gap-[10px]',
};

const SIZE_YRS: Record<ChipSize, string> = {
  sm: 'text-[9.5px]',
  md: 'text-[10.5px]',
};

export const TechChip = ({
  name,
  years,
  status,
  size = 'md',
  className,
  ...rest
}: TechChipProps) => (
  <span
    {...rest}
    className={cx(
      'inline-flex shrink-0 items-center whitespace-nowrap rounded-pill border font-mono uppercase tracking-[0.08em] backdrop-blur-md transition-colors duration-250 ease-soft-out',
      SIZE_CHIP[size],
      STATUS_CHIP[status],
      'hover:border-transparent hover:bg-copper hover:text-white',
      className
    )}
  >
    <span
      className={cx(
        'h-[5px] w-[5px] shrink-0 rounded-full',
        STATUS_DOT[status]
      )}
    />
    {name}
    <span
      className={cx(
        'font-mono tracking-[0.12em] text-cream/40',
        SIZE_YRS[size]
      )}
    >
      {years}
    </span>
  </span>
);
