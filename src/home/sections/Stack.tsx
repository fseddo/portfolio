import { STACK_CATEGORIES } from '../data/stack';
import { Eyebrow } from '../../common/atoms/Eyebrow';
import { SectionHeading } from '../../common/atoms/SectionHeading';

export const Stack = () => (
  <section
    id='stack'
    className='border-t border-line px-14 pt-[140px] pb-[120px] max-[1100px]:px-6 max-[1100px]:pt-[100px] max-[1100px]:pb-[80px]'
  >
    <div className='mx-auto max-w-[1440px]'>
      <Eyebrow>№ 05 — Stack</Eyebrow>
      <SectionHeading className='rv mt-6 text-[clamp(48px,6vw,88px)]'>
        A worked-in <span className='it'>toolbelt.</span>
      </SectionHeading>

      <div className='mt-20 grid grid-cols-4 gap-12 max-[1100px]:mt-14 max-[1100px]:grid-cols-2 max-[1100px]:gap-10 max-[640px]:grid-cols-1'>
        {STACK_CATEGORIES.map((cat) => (
          <div key={cat.label} className='rv'>
            <div className='mb-5 border-b border-line pb-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-copper'>
              {cat.label}
            </div>
            <ul className='flex list-none flex-col gap-[14px]'>
              {cat.items.map((item) => (
                <li
                  key={item}
                  className='font-sans text-[17px] leading-none text-ink-mid transition-[color,padding-left] duration-250 hover:pl-[6px] hover:text-ink'
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);
