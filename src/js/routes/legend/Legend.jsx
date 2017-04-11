import React, { PureComponent } from 'react';

export class Legend extends PureComponent {
  render() {
    return (
      <div>
        <h2>Legend for EML coding</h2>
        <p><strong>1. Characters 1-4:</strong> Drug name</p>
        <p><strong>2. Characters 5-8:</strong> Drug strength; First character Hundreds, then tens,
          then units then tenths. When strength given in thousands, the strength
          was considered to move up in standard unit (mcg to mg, mg to g etc.).
          When drug strength presented in percentage form, the first character
          is strengths in tens, then units, then tenths and a hundredths in final column.
          Where no strength indicated 0000 coded.
        </p>
        <p><strong>3. Characters 9-11:</strong> Drug formulation</p>
        <p>
          <strong>4. Characters 12-14: </strong>
          Describe either salt form (coded), duration of transdermal
          patches or volume or oral liquid / injection where required.
          (See Table 2). Where no descriptive requirement exists, 000 given.
        </p>
      </div>
    );
  }
}
