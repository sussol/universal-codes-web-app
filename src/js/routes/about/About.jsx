import React, { PureComponent } from 'react';

export class About extends PureComponent {
  render() {
    return (
      <div>
        <h2>Why?</h2>
        <p>
          We were reluctant to publish a Universal Code server of our own,
          as after all, we’ve read this cartoon: <br />
          <a href="https://xkcd.com/927/">https://xkcd.com/927/</a>
        </p>

        <p>
          However, to our (limited) knowledge none of the existing universal codes
          do what we needed them to do. Which is to:
        </p>
        <ul>
          <li>Code items on their generic name, not their trade name (good-bye GTINs etc..)</li>
          <li>Code items based on their strength and dosage formulation (good-bye https://www.unspsc.org/)</li>
          <li>Not include the pack size (good-bye <a href="http://www.upc-search.org">http://www.upc-search.org</a>) as we want to aggregate data across pack sizes</li>
          <li>Have a freely available API so that applications can obtain codes as needed.</li>
        </ul>

        <h2>How?</h2>
        <p>You can browser universal codes on this site, or use the API at <a href="https://sussol.github.io/universal-drug-codes-server/">https://sussol.github.io/universal-drug-codes-server/</a></p>

        <h2>How much?</h2>
        <p>It’s free.<br />
        Please don’t abuse the service, or we will have to change this policy.</p>

        <h2>Contact?</h2>
        <p>
          Feel free to email <a href="mailto:info@msupply.org.nz">info@msupply.org.nz </a>
          with suggestions or requests for additions or deletions
        </p>

        <h2>Plans for the future</h2>
        <p>
          We intend to expand this service to also return reference pricing,
          Defined daily doses, DDD factors, WHO EML categories etc
        </p>
      </div>
    );
  }
}
