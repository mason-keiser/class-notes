import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function MainPage() {
  return (
    <div>
      <Link>
        <h3 to="/notebooks">Notebooks</h3>
      </Link>
      <Button outline color="success">New Note</Button>
      <h1>CLASS NOTE</h1>
    </div>
  );
}