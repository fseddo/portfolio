import type { WorkCardData } from './cards';
import { getCase } from '../../data/cases';
import { cx } from '../../../common/utils/cx';
import { WorkCard } from './WorkCard';
import { CasePanel } from './CasePanel';

type WorkSlotProps = {
  data: WorkCardData;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const WorkSlot = ({ data, isOpen, onOpen, onClose }: WorkSlotProps) => (
  <div
    className={cx(
      'relative flex flex-col rv',
      data.wide && 'col-span-full'
    )}
  >
    <WorkCard data={data} isHidden={isOpen} onOpenCase={onOpen} />
    <CasePanel
      data={getCase(data.id)}
      wide={!!data.wide}
      isOpen={isOpen}
      onClose={onClose}
    />
  </div>
);
