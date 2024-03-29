import React from 'react';
import styles from '../../styles/Account.module.css';
import AccountContext from '../../utils/AccountContext';
import OrgSelection from './OrgSelection';
import Form from '../../components/Form';

const STAGES = Object.freeze({
  DEFAULT: 'DEFAULT',
  CREATION: 'CREATION',
  JOINING: 'JOINING',
});

export default function Onboarding({ user }) {
  const [stage, setStage] = React.useState(STAGES.DEFAULT);
  const [selectedToJoin, setSelectedToJoin] = React.useState(undefined);

  const { account, setAccount } = React.useContext(AccountContext);

  const handleSubmitOrg = async (submission) => {
    const { formData } = submission;

    const res = await fetch('/api/accounts/org', {
      method: 'POST',
      body: JSON.stringify({
        email: user.email,
        org: {
          ...formData,
          email: user.email,
        },
      }),
    });
    const json = await res.json();
    if (json?.data?.id) {
      setAccount({ ...account, orgId: json.data.id });
    } else {
      console.error('Post Failed');
    }
    return json;
  };

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
      content = <Form onSubmit={handleSubmitOrg} isOnboarding />;
    default:
      break;
  }

  return (
    <>
      {content}
      {stage !== STAGES.DEFAULT && (
        <header className={styles.onboardingHeader}>
          <button onClick={() => setStage(STAGES.DEFAULT)}>&larr; Back</button>
          {{
            [STAGES.JOINING]: (
              <a
                href={`mailto:team@founders.illinois.edu?subject=[Directory] Request to Join ${selectedToJoin?.name}&body=Founders Team,%0D%0AUser ${account.email} would like to join the ${selectedToJoin?.name} organization.`}
              >
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
              </a>
            ),
            [STAGES.CREATION]: (
              <button
                className={styles.onboardingButtonSmall}
                onClick={handleSubmitOrg}
              >
                Submit
              </button>
            ),
          }[stage] ?? <></>}
        </header>
      )}
    </>
  );
}
