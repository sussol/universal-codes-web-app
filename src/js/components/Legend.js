import React from 'react';

export const Legend = () => (
  <div>
    <h2>Legend for EML coding</h2>
    <p>In previous iterations of our universal code server we had considered using a
      structured code. However, we have decided it is bad practice to overload a code
      with meaning. Information such as strength, dose form, ATC code, WHO code etc will
      be provided via other fields returned by the API in future versions.
    </p>
    <p>The two properties of our codes that matter are:</p>
    <ul>
      <li>Uniqueness</li>
      <li>Immutability - once an item is assigned a code, it ain{"'"}t ever going to change.</li>
      <li>(and less so) Readability - they are short and unambiguous when read by a human,
        which will occasionally be useful. We do, however, expect most {'"reading"'} of the codes
        to be done by machines, the two points above are all that matter.
      </li>
    </ul>
  </div>
);
