import React from 'react';
import styles from '../../styles/Account.module.css';
import AccountContext from '../../utils/AccountContext';
import OrgSelection from './OrgSelection';
import Form from '../../components/Form';
import emailjs from 'emailjs-com';

const STAGES = Object.freeze({
  DEFAULT: 'DEFAULT',
  CREATION: 'CREATION',
  JOINING: 'JOINING',
});

export default function Onboarding({ user }) {
  const [stage, setStage] = React.useState(STAGES.DEFAULT);
  const [selectedToJoin, setSelectedToJoin] = React.useState(undefined);

  const { account, setAccount } = React.useContext(AccountContext);
  
  const formatMessage = (data) => {
    // Edit this method to make a new string that is more readable containing changes made to the data.
    return JSON.parse(JSON.stringify(data));
  }
  
//START HERE
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
      emailjs.send('service_2cqk6gm', 'template_6z1qve1', {'message': formatMessage(data)}, 'user_4ilUAq4zJ8J7iYZTlGs2l');
    } else {
      console.error('Post Failed');
    }
  };
//END HERE
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
      content = <Form onSubmit={handleSubmitOrg} />;
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
