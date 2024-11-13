import React from 'react';
import { useSelector } from 'react-redux';

export function Dashboard() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  console.log(isAuthenticated)
  return (
    <div>
      {isAuthenticated ? (
        <h1>Welcome, {user.username}!</h1>
      ) : (
        <h1>Please log in to access this page.</h1>
      )}
    </div>
  );
}
