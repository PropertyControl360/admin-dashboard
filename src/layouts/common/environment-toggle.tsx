import React, { useState, useEffect, ChangeEvent } from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

const STORAGE_ENV = 'is_prod';

const EnvironmentToggle: React.FC = () => {
  const [isProd, setIsProd] = useState<boolean>(false);

  useEffect(() => {
    const savedEnv = localStorage.getItem(STORAGE_ENV);
    if (savedEnv !== null) {
      setIsProd(JSON.parse(savedEnv));
    }
  }, []);

  const handleToggle = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    setIsProd(newValue);
    localStorage.setItem(STORAGE_ENV, JSON.stringify(newValue));
    window.location.reload();
  };

  return (
    <FormControlLabel
      control={<Switch checked={isProd} onChange={handleToggle} />}
      label={isProd ? 'Production' : 'UAT'}
    />
  );
};

export default EnvironmentToggle;
