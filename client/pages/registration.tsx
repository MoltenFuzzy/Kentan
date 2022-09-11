import { useState, useEffect } from 'react';

export function registration() {
  const [name, setName] = useState('');

  useEffect(() => {
    setName('test');
  }, []);

  return <div>Registration</div>;
}
