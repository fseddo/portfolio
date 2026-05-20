/**
 * Hand-drawn CMS dashboard for the Legislative Tracker card art. Styling for
 * every class below lives under `.art-cms` in globals.css — sizes are tuned
 * to the actual card render size, not the standalone preview. Don't bump.
 */
export const TrackerArt = () => (
  <div className='art-cms'>
    <aside className='cms-side'>
      <div className='logo'>
        <span className='lg' />
        LC.Tracker
      </div>
      <div className='nv'>
        <span className='ic' />
        Dash
      </div>
      <div className='nv act'>
        <span className='ic' />
        Bills
      </div>
      <div className='nv'>
        <span className='ic' />
        People
      </div>
      <div className='nv'>
        <span className='ic' />
        Cmtees
      </div>
      <div className='nv'>
        <span className='ic' />
        Reports
      </div>
      <div className='nv'>
        <span className='ic' />
        Alerts
      </div>
    </aside>
    <div className='cms-main'>
      <div className='cms-top'>
        <span className='cr'>
          Bills<span className='sep'>/</span>
          <span className='cu'>119th</span>
          <span className='sep'>/</span>Energy
        </span>
        <span className='sr'>Search…</span>
        <span className='us' />
      </div>
      <div className='cms-body'>
        <div className='cms-h'>
          <div className='tt'>
            Active <span className='it'>bills.</span>
          </div>
          <div className='ac'>
            <span className='bt'>Filter</span>
            <span className='bt'>Export</span>
            <span className='bt p'>Track</span>
          </div>
        </div>
        <div className='stats'>
          <div className='stat'>
            <span className='lb'>In committee</span>
            <span className='vl'>242</span>
          </div>
          <div className='stat'>
            <span className='lb'>Pending</span>
            <span className='vl'>
              <span className='cu'>31</span>
            </span>
          </div>
          <div className='stat'>
            <span className='lb'>Stalled</span>
            <span className='vl'>14</span>
          </div>
        </div>
        <div className='table'>
          <div className='th'>
            <span>Bill · title</span>
            <span>Status</span>
            <span style={{ textAlign: 'right' }}>Upd</span>
          </div>
          <div className='tr live'>
            <span className='nm'>
              <span className='b cu' />
              HR-2901 — Energy Innovation Act
            </span>
            <span className='st'>In committee</span>
            <span className='wn'>2h</span>
          </div>
          <div className='tr'>
            <span className='nm'>
              <span className='b y' />
              S-1142 — Fed Reserve Reform
            </span>
            <span className='st y'>Vote pending</span>
            <span className='wn'>5h</span>
          </div>
          <div className='tr'>
            <span className='nm'>
              <span className='b' />
              HR-3401 — Climate Resilience
            </span>
            <span className='st'>Active</span>
            <span className='wn'>1d</span>
          </div>
          <div className='tr'>
            <span className='nm'>
              <span className='b r' />
              S-901 — Trade Policy Update
            </span>
            <span className='st r'>Stalled</span>
            <span className='wn'>2d</span>
          </div>
          <div className='tr'>
            <span className='nm'>
              <span className='b' />
              HR-4188 — Cyber Modernization
            </span>
            <span className='st'>Active</span>
            <span className='wn'>3d</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);
