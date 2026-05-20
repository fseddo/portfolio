/**
 * SVG mockup of a legislative-tracker dashboard for the Tracker card art.
 *
 * Everything (sidebar, top chrome, stats, bill list, split-pane detail) lives
 * in ONE `<svg>` with a single viewBox so the whole composition scales as a
 * unit — same pattern as {@link PipelineArt}, no flex sizing fights, no
 * per-card-size tuning of text. `preserveAspectRatio="xMinYMin slice"` is
 * cover-fit: the viewBox scales uniformly to FILL the art container with no
 * letterboxing, anchored to the top-left corner. Whichever dimension is the
 * larger scale factor wins, so content on the opposite edge (bottom on a
 * wide container, right side on a tall one) is clipped by the SVG viewport.
 * Trade-off accepted in exchange for un-distorted geometry at every size.
 *
 * Geometry: viewBox `0 0 500 380`. Sidebar = x 0–70, main = x 70–500.
 * Vertical bands: top bar 0–32, body 32–380 (cms-h, stats, list, resize,
 * detail).
 *
 * Styles live under `.art-cms` in globals.css.
 */

type Bill = {
  id: string;
  title: string;
  status: 'committee' | 'pending' | 'active' | 'stalled';
  statusLabel: string;
  upd: string;
};

const BILLS: readonly Bill[] = [
  { id: 'HR-2901', title: 'Energy Innovation Act', status: 'committee', statusLabel: 'In committee', upd: '2h' },
  { id: 'S-1142', title: 'Fed Reserve Reform', status: 'pending', statusLabel: 'Vote pending', upd: '5h' },
  { id: 'HR-3401', title: 'Climate Resilience', status: 'active', statusLabel: 'Active', upd: '1d' },
  { id: 'S-901', title: 'Trade Policy Update', status: 'stalled', statusLabel: 'Stalled', upd: '2d' },
  { id: 'HR-4188', title: 'Cyber Modernization', status: 'active', statusLabel: 'Active', upd: '3d' },
  { id: 'HR-2210', title: 'Rural Broadband Equity', status: 'committee', statusLabel: 'In committee', upd: '3d' },
  { id: 'HR-3877', title: 'Drug Pricing Reform', status: 'pending', statusLabel: 'Vote pending', upd: '5d' },
];


const NAV_ITEMS: readonly { label: string; active?: boolean }[] = [
  { label: 'Dash' },
  { label: 'Bills', active: true },
  { label: 'People' },
  { label: 'Cmtees' },
  { label: 'Reports' },
  { label: 'Alerts' },
];

const STEPPER: readonly { label: string; state: 'done' | 'now' | 'todo' }[] = [
  { label: 'Intro', state: 'done' },
  { label: 'Cmte', state: 'now' },
  { label: 'Markup', state: 'todo' },
  { label: 'Floor', state: 'todo' },
  { label: 'Vote', state: 'todo' },
];

const CO_SPONSORS = ['JA', 'MR', 'KL', 'TS', 'DP'];

export const TrackerArt = () => (
  <div className='art-cms'>
    <svg viewBox='0 0 500 380' preserveAspectRatio='xMinYMin slice' xmlns='http://www.w3.org/2000/svg'>
      {/* Sidebar background + divider */}
      <rect className='cms-side-bg' x='0' y='0' width='70' height='380' />
      <line className='cms-divider' x1='70' y1='0' x2='70' y2='380' />

      {/* User avatar in the actual top-left corner. */}
      <g>
        <circle className='cms-avatar' cx='20' cy='20' r='12' />
        <text x='20' y='23.5' className='cms-avatar-t'>EM</text>
      </g>

      {/* Divider between avatar and nav */}
      <line className='cms-nv-sep' x1='8' y1='40' x2='62' y2='40' />

      {/* Sidebar nav — generous vertical rhythm; 6 items so they don't need
          to scrunch. Hairline dividers between rows for visual separation. */}
      {NAV_ITEMS.map((item, i) => {
        const y = 60 + i * 26;
        const rowH = 22;
        return (
          <g key={item.label} className={item.active ? 'cms-nv act' : 'cms-nv'}>
            {item.active && <rect className='cms-nv-bg' x='2' y={y - rowH / 2} width='66' height={rowH} />}
            {item.active && <rect className='cms-nv-bar' x='0' y={y - rowH / 2} width='2' height={rowH} />}
            <text x='12' y={y + 3} className='cms-nv-t'>{item.label}</text>
            {i < NAV_ITEMS.length - 1 && (
              <line className='cms-nv-sep' x1='8' y1={y + rowH / 2} x2='62' y2={y + rowH / 2} />
            )}
          </g>
        );
      })}

      {/* Title row — just the section name. Export moves down to live near
          the count; Track moves into the detail pane's upper-right. */}
      <text x='80' y='26' className='cms-h-t'>Bills</text>

      {/* Active filter chips — narrower than before, with the × centered in
          its little parent disc. */}
      <g transform='translate(80, 38)'>
        <g>
          <rect className='cms-chip-bg' width='68' height='13' rx='6.5' />
          <text x='7' y='9' className='cms-chip-k'>TAG</text>
          <text x='22' y='9' className='cms-chip-v'>Energy</text>
          <circle className='cms-chip-x-bg' cx='60' cy='6.5' r='4' />
          <text x='60' y='9' className='cms-chip-x' textAnchor='middle'>×</text>
        </g>
        <g transform='translate(76, 0)'>
          <rect className='cms-chip-bg' width='76' height='13' rx='6.5' />
          <text x='7' y='9' className='cms-chip-k'>STATUS</text>
          <text x='32' y='9' className='cms-chip-v'>Active</text>
          <circle className='cms-chip-x-bg' cx='68' cy='6.5' r='4' />
          <text x='68' y='9' className='cms-chip-x' textAnchor='middle'>×</text>
        </g>
      </g>

      {/* Search row — search bar grows to fill, then the compact icon-only
          filter button, then Export, then the result count. Sits just above
          the bill list so search and results read as one unit. */}
      <g transform='translate(80, 58)'>
        <rect className='cms-search-bg' width='258' height='20' rx='3' />
        <circle className='cms-search-i' cx='10' cy='10' r='3.5' />
        <line className='cms-search-i' x1='12.5' y1='12.5' x2='15' y2='15' />
        <text x='22' y='13.5' className='cms-search-p'>Search bills…</text>
      </g>
      {/* Filter icon button — no label, just the stacked-lines glyph. */}
      <g transform='translate(346, 58)'>
        <rect className='cms-btn-bg' width='20' height='20' rx='3' />
        <line className='cms-btn-i' x1='5' y1='7' x2='15' y2='7' />
        <line className='cms-btn-i' x1='7' y1='10' x2='13' y2='10' />
        <line className='cms-btn-i' x1='9' y1='13' x2='11' y2='13' />
      </g>
      {/* Export button — lives next to the count since both relate to "what
          set of bills am I looking at right now". */}
      <g transform='translate(374, 58)'>
        <rect className='cms-btn-bg' width='44' height='20' rx='3' />
        <text x='22' y='13.5' className='cms-btn-t' textAnchor='middle'>Export</text>
      </g>
      {/* Bill count — sits just to the right of Export so the search/filter/
          export/count group reads as one tight cluster. */}
      <text x='426' y='72' className='cms-count'>
        <tspan className='cms-count-n'>47</tspan> bills
      </text>

      {/* Bill list — header + rows + scrollbar */}
      <g transform='translate(80, 86)'>
        <rect className='cms-table-bg' width='416' height='124' rx='4' />
        {/* header */}
        <text x='10' y='13' className='cms-th'>BILL · TITLE</text>
        <text x='250' y='13' className='cms-th'>STATUS</text>
        <text x='398' y='13' className='cms-th' textAnchor='end'>UPD</text>
        <line className='cms-th-rule' x1='8' y1='18' x2='400' y2='18' />

        {/* rows — render all 5 visible; scrollbar suggests more below */}
        {BILLS.map((bill, i) => {
          const y = 25 + i * 14;
          const isLive = i === 0;
          return (
            <g key={bill.id} className={isLive ? 'cms-tr live' : 'cms-tr'}>
              {isLive && <rect className='cms-tr-bg' x='4' y={y - 6} width='400' height='14' rx='2' />}
              <circle className={`cms-tr-dot ${bill.status}`} cx='12' cy={y + 1} r='2' />
              <text x='20' y={y + 4} className='cms-tr-nm'>
                <tspan className='cms-tr-id'>{bill.id}</tspan>
                {' — '}
                {bill.title}
              </text>
              <text x='250' y={y + 4} className={`cms-tr-st ${bill.status}`}>{bill.statusLabel}</text>
              <text x='398' y={y + 4} className='cms-tr-wn' textAnchor='end'>{bill.upd}</text>
            </g>
          );
        })}

        {/* scrollbar — track spans the row area, thumb sized to suggest the
            visible rows cover ~half of the matching set. Decorative only. */}
        <rect className='cms-scroll-track' x='406' y='22' width='4' height='98' rx='2' />
        <rect className='cms-scroll-thumb' x='406' y='22' width='4' height='46' rx='2' />
      </g>

      {/* Resize bar — decorative grip between list and detail */}
      <g transform='translate(80, 214)'>
        <rect className='cms-resz-bg' width='416' height='6' rx='1' />
        {/* grip dots — 5 small dots centered */}
        {[0, 1, 2, 3, 4].map((i) => (
          <circle key={i} className='cms-resz-dot' cx={196 + i * 6} cy='3' r='0.8' />
        ))}
      </g>

      {/* Detail pane */}
      <g transform='translate(80, 226)'>
        <rect className='cms-detail-bg' width='416' height='150' rx='4' />

        {/* Header line: id · | · title · Track button. Pipe + generous gaps
            so the groups breathe; Track sits in the upper-right corner of
            the pane as the primary call to action for this bill. */}
        <text x='10' y='17' className='cms-dt-id'>HR-2901</text>
        <line className='cms-dt-sep' x1='60' y1='6' x2='60' y2='20' />
        <text x='70' y='17' className='cms-dt-t'>
          Energy Innovation Act
        </text>
        <g transform='translate(362, 6)'>
          <rect className='cms-btn-p-bg' width='44' height='18' rx='3' />
          <text x='22' y='12.5' className='cms-btn-p-t' textAnchor='middle'>Track</text>
        </g>

        {/* Sponsor subtitle */}
        <text x='10' y='30' className='cms-dt-sub'>
          J. Avery <tspan className='mu'>(D-CA)</tspan> · Energy & Commerce
        </text>

        {/* Stepper — dots connected by lines, labels below */}
        <g transform='translate(14, 44)'>
          {STEPPER.map((step, i) => {
            const x = i * 95;
            return (
              <g key={step.label}>
                {i < STEPPER.length - 1 && (
                  <line
                    className={`cms-step-line ${STEPPER[i].state === 'done' ? 'done' : ''}`}
                    x1={x + 3}
                    y1='0'
                    x2={x + 92}
                    y2='0'
                  />
                )}
                <circle
                  className={`cms-step-dot ${step.state}`}
                  cx={x}
                  cy='0'
                  r={step.state === 'now' ? 3.5 : 2.8}
                />
                <text x={x} y='14' className={`cms-step-lbl ${step.state}`} textAnchor='middle'>
                  {step.label.toUpperCase()}
                </text>
              </g>
            );
          })}
        </g>

        {/* Summary */}
        <text x='10' y='80' className='cms-dt-sum'>
          <tspan className='it'>Authorizes</tspan> $3.1B for grid modernization & rural microgrid pilots.
        </text>

        {/* Co-sponsors */}
        <g transform='translate(10, 92)'>
          <text x='0' y='9' className='cms-dt-k'>CO-SPONSORS</text>
          {CO_SPONSORS.map((initials, i) => (
            <g key={initials} transform={`translate(${75 + i * 16}, 0)`}>
              <circle
                className={i === 0 ? 'cms-cosp-bg first' : 'cms-cosp-bg'}
                cx='8'
                cy='6'
                r='6.5'
              />
              <text x='8' y='8' className='cms-cosp-t' textAnchor='middle'>
                {initials}
              </text>
            </g>
          ))}
          <text x={75 + CO_SPONSORS.length * 16 + 6} y='9' className='cms-cosp-more'>+42</text>
        </g>

        {/* Activity items */}
        <g transform='translate(10, 118)'>
          <text x='0' y='0' className='cms-dt-at'>2h</text>
          <text x='24' y='0' className='cms-dt-av'>
            Markup scheduled <tspan className='mu'>· Thu 2:00 PM</tspan>
          </text>
          <text x='0' y='12' className='cms-dt-at'>1d</text>
          <text x='24' y='12' className='cms-dt-av'>
            Sen. Reyes <tspan className='mu'>signed on as co-sponsor</tspan>
          </text>
        </g>
      </g>
    </svg>
  </div>
);
