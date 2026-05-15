import type { ReactNode } from 'react';

export type Snippet = {
  title: ReactNode;
  tabTitle: ReactNode;
  tabBlurb: string;
  blurb: string;
  pill: string;
  // Pre-rendered code HTML using <span class="k|s|f|t|c"> syntax tokens and
  // <span class="marker" data-n="N">N</span> numbered marker pills.
  // Static, author-controlled content; rendered via dangerouslySetInnerHTML.
  codeHtml: string;
  annotations: ReadonlyArray<string>;
};

const It = ({ children }: { children: ReactNode }) => (
  <span className='it'>{children}</span>
);
const Cu = ({ children }: { children: ReactNode }) => (
  <span className='text-copper'>{children}</span>
);

export const SNIPPETS: ReadonlyArray<Snippet> = [
  {
    title: (
      <>
        useStableCallback —{' '}
        <Cu>
          <It>escape hatch.</It>
        </Cu>
      </>
    ),
    tabTitle: <It>useStableCallback</It>,
    tabBlurb: 'Escape hatch for stale closures.',
    blurb: "For the rare case where useCallback's deps array fights you.",
    pill: 'TypeScript',
    codeHtml: `<span class="k">import</span> { useRef, useCallback, useLayoutEffect } <span class="k">from</span> <span class="s">'react'</span>

<span class="c">// Stable function ref that always calls the latest version.</span>
<span class="k">export function</span> <span class="f">useStableCallback</span>&lt;<span class="t">T</span> <span class="k">extends</span> (...args: <span class="t">any</span>[]) =&gt; <span class="t">any</span>&gt;<span class="marker" data-n="1">1</span>(
  callback: <span class="t">T</span>
): <span class="t">T</span> {
  <span class="k">const</span> ref = <span class="f">useRef</span>(callback)<span class="marker" data-n="2">2</span>

  <span class="f">useLayoutEffect</span>(() =&gt; {<span class="marker" data-n="3">3</span>
    ref.current = callback
  })

  <span class="k">return</span> <span class="f">useCallback</span>(
    ((...args) =&gt; ref.current(...args)) <span class="k">as</span> <span class="t">T</span>,<span class="marker" data-n="4">4</span>
    []
  )
}`,
    annotations: [
      'Generic <code>T extends fn</code> preserves the original signature — full type safety on args and return.',
      "Ref over state — we don't want a re-render when the callback changes, just keep the latest accessible.",
      '<code>useLayoutEffect</code>: synchronous, so the ref is updated before any child reads it via this hook in the same commit.',
      "Empty deps means the returned function reference never changes. Stable forever — that's the point.",
    ],
  },
  {
    title: (
      <>
        invariant —{' '}
        <Cu>
          <It>a type-safe assert.</It>
        </Cu>
      </>
    ),
    tabTitle: (
      <>
        Type-safe <It>invariant</It>
      </>
    ),
    tabBlurb: 'Asserts at runtime, narrows in TS.',
    blurb:
      "Most invariant helpers throw at runtime but don't narrow types. This one does both.",
    pill: 'TypeScript',
    codeHtml: `<span class="k">export function</span> <span class="f">invariant</span>(
  condition: <span class="k">unknown</span>,<span class="marker" data-n="1">1</span>
  message: <span class="t">string</span> | (() =&gt; <span class="t">string</span>)
): <span class="k">asserts</span> condition {<span class="marker" data-n="2">2</span>
  <span class="k">if</span> (condition) <span class="k">return</span>
  <span class="k">const</span> resolved = <span class="k">typeof</span> message === <span class="s">'function'</span> ? <span class="f">message</span>() : message<span class="marker" data-n="3">3</span>
  <span class="k">throw new</span> <span class="f">Error</span>(<span class="s">\`Invariant: \${resolved}\`</span>)
}

<span class="c">// usage</span>
<span class="f">invariant</span>(user, <span class="s">'expected user to exist'</span>)<span class="marker" data-n="4">4</span>
user.email <span class="c">// ✓ narrowed: User | null → User</span>`,
    annotations: [
      '<code>unknown</code> not <code>boolean</code> — accepts truthy/falsy values without forcing callers to write <code>!!user</code>.',
      'The magic line. <code>asserts condition</code> tells TypeScript "if this returns, condition was truthy" — every call site narrows for free.',
      'Lazy message evaluation. Expensive stringifying or fetching is deferred to the failure path only.',
      'After this call, TypeScript treats <code>user</code> as non-nullable for the rest of the scope. No <code>!</code> assertions.',
    ],
  },
  {
    title: (
      <>
        Query keys —{' '}
        <Cu>
          <It>co-located &amp; safe.</It>
        </Cu>
      </>
    ),
    tabTitle: (
      <>
        Query key <It>factory</It>
      </>
    ),
    tabBlurb: 'Co-located TanStack cache keys.',
    blurb: 'A small pattern that makes TanStack Query refactors painless.',
    pill: 'TanStack',
    codeHtml: `<span class="k">export const</span> billsKeys = {
  all: [<span class="s">'bills'</span>] <span class="k">as const</span>,<span class="marker" data-n="1">1</span>
  lists: () =&gt; [...billsKeys.all, <span class="s">'list'</span>] <span class="k">as const</span>,
  list: (filters: <span class="t">BillFilters</span>) =&gt;<span class="marker" data-n="2">2</span>
    [...billsKeys.lists(), filters] <span class="k">as const</span>,
  details: () =&gt; [...billsKeys.all, <span class="s">'detail'</span>] <span class="k">as const</span>,
  detail: (id: <span class="t">string</span>) =&gt;
    [...billsKeys.details(), id] <span class="k">as const</span>,
}

<span class="c">// usage</span>
<span class="f">useQuery</span>({ queryKey: billsKeys.<span class="f">detail</span>(id), queryFn })<span class="marker" data-n="3">3</span>
queryClient.<span class="f">invalidateQueries</span>({ queryKey: billsKeys.<span class="f">lists</span>() })<span class="marker" data-n="4">4</span>`,
    annotations: [
      '<code>as const</code> on the root tuple gives every derived key a literal type — typos surface at compile time.',
      'Filters get folded into the key as a structured value. TanStack hashes it, so any subset can be invalidated.',
      'Reading a single bill: keys are co-located with the queries that use them. No string concat, no constants file.',
      'Invalidate every list query in one call without touching individual filter combinations. Refactor-safe.',
    ],
  },
];
