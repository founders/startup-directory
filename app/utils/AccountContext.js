import { createContext } from 'react';

const AccountContext = createContext({
  account: undefined,
  setAccount: undefined,
});

export default AccountContext;
