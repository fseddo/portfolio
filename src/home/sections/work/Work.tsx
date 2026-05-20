import { useState } from 'react';
import { PROJECTS, type ProjectId } from '../../data/portfolio';
import { BodySection, SectionHead } from '../BodySection';
import { WorkSlot } from './WorkSlot';

export const Work = () => {
  // Only one case study can be open at a time. `null` = all cards visible.
  const [openId, setOpenId] = useState<ProjectId | null>(null);

  return (
    <BodySection id='work'>
      <SectionHead
        eyebrow='Selected work'
        title={<>Projects.</>}
        noteLine1='№ 02'
        noteLine2='Three of many'
      />

      <div className='grid grid-cols-2 gap-6 max-[900px]:grid-cols-1'>
        {PROJECTS.map((project) => (
          <WorkSlot
            key={project.id}
            project={project}
            casing={openId === project.id}
            onOpen={() => setOpenId(project.id)}
            onClose={() => setOpenId(null)}
          />
        ))}
      </div>
    </BodySection>
  );
};
