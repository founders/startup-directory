import React from 'react';
import styles from '../../styles/Account.module.css';

import OrgSelection from './OrgSelection';

const STAGES = Object.freeze({
  DEFAULT: 'DEFAULT',
  CREATION: 'CREATION',
  JOINING: 'JOINING',
});

export default function Onboarding({ user }) {
  const [stage, setStage] = React.useState(STAGES.DEFAULT);
  const [selectedToJoin, setSelectedToJoin] = React.useState(undefined);

  let content = (
    <div className={styles.actionGrid}>
      <div>
        <h2>List Your Startup</h2>
        <p>
          Create a new startup listing to post job listings, share your
          developments and join a community of UIUC founders.
        </p>
        <button onClick={() => setStage(STAGES.CREATION)}>Create A Page</button>
      </div>
      <div>
        <h2>Already on the directory?</h2>
        <p>
          If your company has already been listed on the directory click below
          to join your organization as a team member.
        </p>
        <button onClick={() => setStage(STAGES.JOINING)}>
          Join Your Teammates
        </button>
      </div>
    </div>
  );

  switch (stage) {
    case STAGES.DEFAULT:
      break;
    case STAGES.JOINING:
      content = (
        <>
          <p>
            Search for and select the startup you want to join as a member. Your
            teammates with accounts can approve your request to join.
          </p>
          <OrgSelection updateSelected={setSelectedToJoin} />
        </>
      );
      break;
    case STAGES.CREATION:
      content = <>FORM HERE</>;
    default:
      break;
  }

  return (
    <>
      {content}
      {stage !== STAGES.DEFAULT && (
        <header className={styles.onboardingHeader}>
          <button onClick={() => setStage(STAGES.DEFAULT)}>&larr; Back</button>
          {getRightButton(stage)}
        </header>
      )}
    </>
  );

  function getRightButton(stage) {
    const handleSubmitOrg = async () => {
      console.log('lookie here');
      console.log(user.email);
      const res = await fetch('/api/accounts/org', {
        method: 'POST',
        body: JSON.stringify({
          email: user.email,
          org: {
            name: 'apple',
            email: 'apple@google.com',
            description: 'we overcharge for computers',
            founded: '5/12/2020',
          },
        }),
      });
    };
    switch (stage) {
      case STAGES.JOINING:
        return (
          <button
            className={styles.onboardingButtonSmall}
            disabled={!selectedToJoin}
          >
            {!selectedToJoin ? (
              'Select an existing startup'
            ) : (
              <>{`Request to Join ${selectedToJoin?.name} `}&rarr;</>
            )}
          </button>
        );
      case STAGES.CREATION:
        return (
          <button
            className={styles.onboardingButtonSmall}
            onClick={handleSubmitOrg}
          >
            Submit
          </button>
        );
      default:
        return <></>;
    }
  }
}
