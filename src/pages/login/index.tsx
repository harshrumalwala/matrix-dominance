import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Field, Header, Button } from 'components';

const Login = () => {
  const history = useHistory();
  const [nickName, setNickName] = useState<string>('');
  const [nameInitials, setNameInitials] = useState<string>('');

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(nickName, nameInitials);
    history.push('/');
  };

  return (
    <>
      <Header>Login</Header>
      <Field
        id="nickName"
        label="Nick Name"
        onChange={setNickName}
        placeholder="Enter your Nick Name"
        type="text"
        value={nickName}
      />
      <Field
        id="nameInitials"
        label="Name Initials"
        onChange={setNameInitials}
        placeholder="Enter your Name Initials like AE for Albert Einstein"
        type="text"
        value={nameInitials}
        errorMessage="Should have 2 characters"
      />
      <Button onClick={handleLogin}>Login</Button>
    </>
  );
};

export default Login;
