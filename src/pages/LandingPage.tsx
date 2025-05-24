
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to Arabic landing page as default
    navigate('/ar', { replace: true });
  }, [navigate]);

  return null; // This component will immediately redirect
};

export default LandingPage;
