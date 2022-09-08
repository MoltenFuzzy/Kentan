import { useState, useEffect } from 'react';

function registration() {
  const [name, setName] = useState('');

  useEffect(() => {
    setName('test');
  }, []);

  return <div>{name}</div>;
}

export default registration;
