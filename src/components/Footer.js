import React from 'react';
import Nav from './Nav';

export default function Footer() {
  return (
    <footer>
      {' '}
      <p> &copy; Miami Slices {new Date().getFullYear()}</p>
    </footer>
  );
}
