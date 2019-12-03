import React from 'react';

export default function Credit({ asset, author, link }) {
  return (
    <div
      style={{
        bottom: '1rem',
        fontSize: '0.875rem',
        position: 'absolute',
        right: '1rem',
      }}
    >
      {`${asset} by ${author} (`}
      <a
        href={link}
        rel="noopener noreferrer"
        style={{ color: '#9AB0E5' }}
        target="_blank"
      >
        source
      </a>
      )
    </div>
  );
}
