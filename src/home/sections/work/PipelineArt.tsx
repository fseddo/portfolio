/**
 * Animated SVG ingest diagram for the Signal Pipeline card art.
 *
 * Geometry: viewBox 400×250. Sources sit on the left at y=45/90/135/180; all
 * four bezier feeds (`pf1`–`pf4`) converge on (240,125). Three concentric
 * copper rings pulse around (240–278, 125). A short trunk from (293,125) to
 * (360,125) runs into the "ES Index" pill. `animateMotion` carries six
 * circle signals — four along the feeds (3.4s, staggered 0/0.7/1.4/2.1s) and
 * two along the trunk (1.4s, staggered 0/0.7s).
 *
 * Styles live under `.art-pipe` in globals.css.
 */
export const PipelineArt = () => (
  <div className='art-pipe'>
    <span className='corner'>Signal pipeline</span>
    <span className='ticker'>Thousands / week</span>
    <span className='src s1'>
      <span className='d' />
      Twitter
    </span>
    <span className='src s2'>
      <span className='d' />
      Facebook
    </span>
    <span className='src s3'>
      <span className='d' />
      News RSS
    </span>
    <span className='src s4'>
      <span className='d' />
      Email
    </span>
    <span className='tunnel-out'>ES Index</span>

    <svg viewBox='0 0 400 250' preserveAspectRatio='none'>
      <path id='pf1' className='feed' d='M 88 45  C 150 45, 200 110, 240 125' />
      <path id='pf2' className='feed' d='M 88 90  C 160 90, 210 118, 240 125' />
      <path id='pf3' className='feed' d='M 88 135 C 160 135, 210 132, 240 125' />
      <path id='pf4' className='feed' d='M 88 180 C 160 180, 210 142, 240 125' />
      <ellipse className='ring r1' cx='240' cy='125' rx='22' ry='48' />
      <ellipse className='ring r2' cx='260' cy='125' rx='16' ry='38' />
      <ellipse className='ring r3' cx='278' cy='125' rx='11' ry='28' />
      <ellipse cx='293' cy='125' rx='6' ry='18' fill='rgba(184,90,42,.35)' />
      <path id='trunk' className='trunk' d='M 293 125 L 360 125' />

      <circle r='3' className='signal'>
        <animateMotion dur='3.4s' repeatCount='indefinite' rotate='auto' begin='0s'>
          <mpath href='#pf1' />
        </animateMotion>
      </circle>
      <circle r='3' className='signal warm'>
        <animateMotion dur='3.4s' repeatCount='indefinite' rotate='auto' begin='0.7s'>
          <mpath href='#pf2' />
        </animateMotion>
      </circle>
      <circle r='3' className='signal dim'>
        <animateMotion dur='3.4s' repeatCount='indefinite' rotate='auto' begin='1.4s'>
          <mpath href='#pf3' />
        </animateMotion>
      </circle>
      <circle r='3' className='signal moss'>
        <animateMotion dur='3.4s' repeatCount='indefinite' rotate='auto' begin='2.1s'>
          <mpath href='#pf4' />
        </animateMotion>
      </circle>
      <circle r='3.5' className='signal'>
        <animateMotion dur='1.4s' repeatCount='indefinite' begin='0s'>
          <mpath href='#trunk' />
        </animateMotion>
      </circle>
      <circle r='3.5' className='signal warm'>
        <animateMotion dur='1.4s' repeatCount='indefinite' begin='0.7s'>
          <mpath href='#trunk' />
        </animateMotion>
      </circle>
    </svg>

    <div className='stat-line'>
      <span>4 sources · dedupe · verify</span>
      <span className='cu'>→ index</span>
    </div>
  </div>
);
