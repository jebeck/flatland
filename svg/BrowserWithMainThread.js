import React from "react";

export default function BrowserWithMainThread() {
  return (
    <>
      <defs>
        <filter id="a">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" />
          <feOffset dy="2" result="offsetblur" />
          <feFlood floodColor="#000" />
          <feComposite in2="offsetblur" operator="in" />
        </filter>
        <radialGradient
          id="b"
          gradientUnits="userSpaceOnUse"
          cx="985.472"
          cy="531.723"
          r="391.573"
        >
          <stop offset="0" stopColor="#FFF" />
          <stop offset="1" stopColor="#FA9499" />
        </radialGradient>
      </defs>
      <path d="M1741.731 34.219c9.056 0 16.215 7.563 16.215 16.68v939.898c0 9.117-7.159 16.68-16.215 16.68H181.4c-9.056 0-16.215-7.563-16.215-16.68V50.899c0-9.117 7.159-16.68 16.215-16.68h1560.331zm0 8H181.4c-4.537 0-8.215 3.886-8.215 8.68v939.898c0 4.794 3.678 8.68 8.215 8.68h1560.331c4.537 0 8.215-3.886 8.215-8.68V50.899c0-4.794-3.678-8.68-8.215-8.68z" />
      <path
        d="M523.917 92.24l1226.529-.74m-1491.569 0h-85.192m85.192-37v36.802M523.917 54.5v36.802m-265.04-38.024h265.04"
        stroke="#000"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M195.006 72.196c-3.482 0-6.304-2.856-6.304-6.38 0-3.523 2.822-6.379 6.304-6.379 3.481 0 6.304 2.856 6.304 6.379 0 3.524-2.823 6.38-6.304 6.38z"
        fill="#FF5A52"
      />
      <path
        d="M195.006 72.196c-3.482 0-6.304-2.856-6.304-6.38 0-3.523 2.822-6.379 6.304-6.379 3.481 0 6.304 2.856 6.304 6.379 0 3.524-2.823 6.38-6.304 6.38z"
        stroke="#FF5A52"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M216.281 72.196c-3.481 0-6.304-2.856-6.304-6.38 0-3.523 2.823-6.379 6.304-6.379 3.482 0 6.304 2.856 6.304 6.379 0 3.524-2.822 6.38-6.304 6.38z"
        fill="#E6C029"
      />
      <path
        d="M216.281 72.196c-3.481 0-6.304-2.856-6.304-6.38 0-3.523 2.823-6.379 6.304-6.379 3.482 0 6.304 2.856 6.304 6.379 0 3.524-2.822 6.38-6.304 6.38z"
        stroke="#E6C029"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <g>
        <path
          d="M237.943 72.196c-3.482 0-6.304-2.856-6.304-6.38 0-3.523 2.822-6.379 6.304-6.379 3.481 0 6.303 2.856 6.303 6.379 0 3.524-2.822 6.38-6.303 6.38z"
          fill="#53C22B"
        />
        <path
          d="M237.943 72.196c-3.482 0-6.304-2.856-6.304-6.38 0-3.523 2.822-6.379 6.304-6.379 3.481 0 6.303 2.856 6.303 6.379 0 3.524-2.822 6.38-6.303 6.38z"
          stroke="#53C22B"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
      <g>
        <path
          d="M985.472 149.081c219.523 0 397.573 171.261 397.573 382.641 0 211.381-178.05 382.642-397.573 382.642-219.522 0-397.572-171.261-397.572-382.642 0-211.38 178.05-382.641 397.572-382.641z"
          filter="url(#a)"
          fill="rgba(0,0,0,0.75)"
        />
        <path
          d="M985.472 908.364c-216.259 0-391.572-168.628-391.572-376.641 0-208.014 175.313-376.642 391.572-376.642 216.26 0 391.573 168.628 391.573 376.642 0 208.013-175.313 376.641-391.573 376.641z"
          fill="url(#b)"
        />
        <path
          d="M985.472 908.364c-216.259 0-391.572-168.628-391.572-376.641 0-208.014 175.313-376.642 391.572-376.642 216.26 0 391.573 168.628 391.573 376.642 0 208.013-175.313 376.641-391.573 376.641z"
          stroke="black"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <g>
          <text
            fontFamily="Source Code Pro"
            fontSize="120"
            fontWeight="bold"
            color="black"
            transform="translate(984.972 520.848)"
          >
            <tspan x="-103.35" y="-156.852">
              the{" "}
            </tspan>{" "}
            <tspan x="-151.725" y="39.148">
              main{" "}
            </tspan>{" "}
            <tspan x="-209.025" y="235.148">
              thread
            </tspan>
          </text>
        </g>
      </g>
    </>
  );
}
