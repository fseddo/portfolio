import { cx } from '../../../../common/utils/cx';

const NAV_ITEMS = [
  'Dash',
  'Bills',
  'People',
  'Cmtees',
  'Reports',
  'Alerts',
  'Saved',
] as const;
const ACTIVE_NAV = 'Bills';

type BillRow = {
  badge: 'moss' | 'yellow' | 'red' | 'copper' | 'live';
  title: string;
  status: string;
  statusTone: 'moss' | 'yellow' | 'red' | 'copper';
  when: string;
};

const ROWS: ReadonlyArray<BillRow> = [
  {
    badge: 'live',
    title: 'HR-2901 — Energy Innovation Act',
    status: 'In committee',
    statusTone: 'copper',
    when: '2h',
  },
  {
    badge: 'yellow',
    title: 'S-1142 — Fed Reserve Reform',
    status: 'Vote pending',
    statusTone: 'yellow',
    when: '5h',
  },
  {
    badge: 'moss',
    title: 'HR-3401 — Climate Resilience',
    status: 'Active',
    statusTone: 'moss',
    when: '1d',
  },
  {
    badge: 'red',
    title: 'S-901 — Trade Policy Update',
    status: 'Stalled',
    statusTone: 'red',
    when: '2d',
  },
  {
    badge: 'moss',
    title: 'HR-4188 — Cyber Modernization',
    status: 'Active',
    statusTone: 'moss',
    when: '3d',
  },
];

const BADGE: Record<BillRow['badge'], string> = {
  moss: 'bg-moss',
  yellow: 'bg-[#D9A23A]',
  red: 'bg-[#C84A3A]',
  copper: 'bg-copper',
  live: 'bg-copper',
};
const STATUS: Record<BillRow['statusTone'], string> = {
  moss: 'text-moss',
  yellow: 'text-[#D9A23A]',
  red: 'text-[#C84A3A]',
  copper: 'text-copper',
};

export const TrackerArt = () => (
  <div className='absolute inset-0 grid grid-cols-[76px_1fr] overflow-hidden bg-[#100c08] font-mono'>
    {/* sidebar */}
    <aside className='flex flex-col items-stretch gap-1 border-r border-cream/[0.07] bg-[#0a0805] py-3'>
      <div className='mb-[6px] flex items-center gap-[6px] border-b border-cream/[0.06] px-3 pb-3 font-sans text-[10px] font-medium tracking-[0.04em] text-cream'>
        <span className='h-[6px] w-[6px] shrink-0 rounded-full bg-copper shadow-[0_0_6px_var(--color-copper)]' />
        LC.Tracker
      </div>
      {NAV_ITEMS.map((item) => {
        const active = item === ACTIVE_NAV;
        return (
          <div
            key={item}
            className={cx(
              'flex items-center gap-[7px] border-l-2 px-3 py-[6px] text-[9.5px] tracking-[0.06em]',
              active
                ? 'border-copper bg-copper/10 text-cream'
                : 'border-transparent text-cream/55'
            )}
          >
            <span
              className={cx(
                'h-[9px] w-[9px] shrink-0 rounded-[2px]',
                active
                  ? 'bg-copper shadow-[0_0_5px_var(--color-copper)]'
                  : 'bg-cream/20'
              )}
            />
            {item}
          </div>
        );
      })}
    </aside>

    {/* main */}
    <div className='flex min-w-0 flex-col'>
      <div className='flex h-7 shrink-0 items-center gap-2 border-b border-cream/[0.07] bg-[#0d0905] px-3'>
        <span className='min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[9px] tracking-[0.08em] text-cream/50'>
          Bills
          <span className='mx-[5px] text-cream/25'>/</span>
          <span className='text-copper'>119th</span>
          <span className='mx-[5px] text-cream/25'>/</span>Energy
        </span>
        <span className='ml-auto flex shrink-0 items-center gap-[5px] rounded-pill border border-cream/[0.07] bg-cream/[0.04] px-2 py-[3px] text-[9px] text-cream/35 before:block before:h-[5px] before:w-[5px] before:rounded-full before:border before:border-cream/40 before:content-[""]'>
          Search…
        </span>
        <span className='h-4 w-4 shrink-0 rounded-full bg-gradient-to-br from-copper to-copper-2' />
      </div>

      <div className='flex min-h-0 min-w-0 flex-1 flex-col gap-2 p-3'>
        <div className='flex items-center justify-between gap-2'>
          <div className='whitespace-nowrap font-sans text-[15px] tracking-[-0.01em] text-cream'>
            Active <span className='it'>bills.</span>
          </div>
          <div className='flex shrink-0 gap-1 text-[9px] text-cream/70'>
            <span className='rounded-[5px] border border-cream/10 bg-cream/[0.05] px-[9px] py-1 tracking-[0.06em]'>
              Filter
            </span>
            <span className='rounded-[5px] border border-cream/10 bg-cream/[0.05] px-[9px] py-1 tracking-[0.06em]'>
              Export
            </span>
            <span className='rounded-[5px] border border-transparent bg-copper px-[9px] py-1 tracking-[0.06em] text-white'>
              Track
            </span>
          </div>
        </div>

        <div className='grid grid-cols-3 gap-[6px]'>
          {(
            [
              ['In committee', '242'],
              ['Vote pending', '31', 'copper'],
              ['Stalled', '14'],
            ] as const
          ).map(([lb, vl, tone]) => (
            <div
              key={lb}
              className='flex min-w-0 items-baseline justify-between gap-[6px] rounded-[5px] border border-cream/[0.07] bg-cream/[0.04] px-[9px] py-[6px]'
            >
              <span className='whitespace-nowrap text-[8.5px] uppercase tracking-[0.1em] text-cream/50'>
                {lb}
              </span>
              <span
                className={cx(
                  'font-sans text-[15px] font-light leading-none tracking-[-0.02em]',
                  tone === 'copper' ? 'text-copper' : 'text-cream'
                )}
              >
                {vl}
              </span>
            </div>
          ))}
        </div>

        <div className='flex min-h-0 flex-col gap-[2px] overflow-hidden rounded-[5px] border border-cream/[0.07] bg-cream/[0.025] px-[10px] py-[6px]'>
          <div className='grid grid-cols-[1.6fr_1fr_44px] gap-2 border-b border-cream/[0.07] px-1 pb-1 text-[8px] uppercase tracking-[0.14em] text-cream/40'>
            <span>Bill · title</span>
            <span>Status</span>
            <span className='text-right'>Updated</span>
          </div>
          {ROWS.map((r) => (
            <div
              key={r.title}
              className={cx(
                'grid grid-cols-[1.6fr_1fr_44px] items-center gap-2 border-b border-dashed border-cream/[0.04] p-1 last:border-b-0',
                r.badge === 'live' &&
                  'rounded-[4px] border-solid border-copper/30 bg-copper/12'
              )}
            >
              <span className='flex min-w-0 items-center gap-[6px] overflow-hidden whitespace-nowrap text-ellipsis font-sans text-[10.5px] text-cream/85'>
                <span
                  className={cx(
                    'h-[5px] w-[5px] shrink-0 rounded-full',
                    BADGE[r.badge]
                  )}
                />
                {r.title}
              </span>
              <span
                className={cx(
                  'whitespace-nowrap text-[8.5px] tracking-[0.04em]',
                  STATUS[r.statusTone]
                )}
              >
                {r.status}
              </span>
              <span className='text-right text-[8.5px] text-cream/40'>
                {r.when}
              </span>
            </div>
          ))}
        </div>

        <div className='flex min-h-0 shrink-0 flex-col gap-[5px] overflow-hidden rounded-[5px] border border-cream/[0.07] bg-cream/[0.025] px-[10px] py-[7px]'>
          <div className='text-[8.5px] uppercase tracking-[0.14em] text-cream/50'>
            Activity · last 24h
          </div>
          <div className='grid grid-cols-3 gap-2'>
            {(
              [
                ['b', <><strong className='font-medium text-cream'>You</strong> tracked <span className='text-copper'>HR-2901</span></>, '12m'],
                ['', <><strong className='font-medium text-cream'>M. Chen</strong> exported committee roster</>, '38m'],
                ['c', <><strong className='font-medium text-cream'>System</strong> indexed 38 new bills</>, '1h'],
              ] as const
            ).map(([variant, content, time], i) => (
              <div
                key={i}
                className='flex min-w-0 items-center gap-[6px] text-[9px] leading-snug text-cream/65'
              >
                <span
                  className={cx(
                    'h-[14px] w-[14px] shrink-0 rounded-full',
                    variant === 'b'
                      ? 'bg-gradient-to-br from-copper to-copper-2'
                      : variant === 'c'
                        ? 'bg-gradient-to-br from-[#5C4F40] to-[#3A2F22]'
                        : 'bg-gradient-to-br from-moss to-[#3A4828]'
                  )}
                />
                <span className='min-w-0 flex-1 overflow-hidden whitespace-nowrap text-ellipsis'>
                  {content}
                </span>
                <span className='shrink-0 text-[8px] text-cream/40'>
                  {time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className='absolute left-[14px] top-3 z-[5] flex items-center gap-[7px] border border-cream/[0.07] bg-[#0a0805] px-2 py-[3px] font-mono text-[9.5px] uppercase tracking-[0.18em] text-cream/45'>
      <span className='h-1 w-1 rounded-full bg-copper shadow-[0_0_5px_var(--color-copper)] animate-[tk_2s_ease-in-out_infinite]' />
      Live · Tracker
    </div>
  </div>
);
