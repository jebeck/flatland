import React from "react";

export default function SVGContainer({ children }) {
  return (
    <div
      style={{
        maxHeight: "90vh",
        minHeight: "90vh",
        maxWidth: "90vw",
        minWidth: "90vw",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: "100%", width: "100%" }}
        viewBox="0 0 1920 1080"
      >
        <defs>
          <filter id="shadow">
            <feDropShadow
              dx="5"
              dy="5"
              floodColor="#000000"
              stdDeviation="7.5"
            />
          </filter>
          <clipPath id="bg-clip">
            <path d="M181.4 42.219h1560.331c4.537 0 8.215 3.886 8.215 8.68v939.898c0 4.794-3.678 8.68-8.215 8.68H181.4c-4.537 0-8.215-3.886-8.215-8.68V50.899c0-4.794 3.678-8.68 8.215-8.68z" />
          </clipPath>
          <rect id="bg" height={1080} width={1920} />
        </defs>
        <use clipPath="url(#bg-clip)" fill="#4A4659" xlinkHref="#bg" />
        {children}
      </svg>
    </div>
  );
}
