import { cx } from '../../common/utils/cx';
import { STACK } from '../data/portfolio';
import { BodySection, SectionHead } from './BodySection';

const STAGGER = ['', 'rv-s', 'rv-m', 'rv-l'] as const;

export const Stack = () => (
  <BodySection id='stack'>
    <SectionHead
      eyebrow='Stack'
      title={<>Technologies.</>}
      noteLine1='№ 04'
      noteLine2='Daily tools, in order'
    />

    <div className='grid grid-cols-4 gap-8 max-[900px]:grid-cols-2'>
      {STACK.map((cat, i) => (
        <div key={cat.label} className={cx('rv', STAGGER[i])}>
          <div className='mb-[14px] flex items-baseline justify-between border-b border-ink pb-[10px] font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink'>
            <span>{cat.label}</span>
            <span className='font-normal text-ink-light'>{cat.items.length}</span>
          </div>
          <ul>
            {cat.items.map((item) => (
              <li
                key={item}
                className='cursor-default text-[13.5px] leading-[2] text-ink-mid transition-colors duration-150 hover:text-ink'
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </BodySection>
);
