import React, { useEffect, useRef, useState } from 'react';

export default function Typer() {
  const inputEl = useRef(null);
  const [text, setText] = useState('foobar');

  useEffect(() => {
    if (inputEl.current) {
      inputEl.current.focus();
    }
  });

  return (
    <div
      style={{
        alignItems: 'flex-end',
        display: 'flex',
        flexDirection: 'column',
        fontSize: '4rem',
        padding: '1rem',
        position: 'absolute',
        right: 0,
        top: 0,
      }}
    >
      <div>{text}</div>
      <input
        onChange={e => setText(e.target.value.slice(-5))}
        ref={inputEl}
        style={{
          fontFamily: 'Source Code Pro',
          fontSize: '4rem',
          maxWidth: '16rem',
        }}
        type="text"
        value={text}
      />
    </div>
  );
}
