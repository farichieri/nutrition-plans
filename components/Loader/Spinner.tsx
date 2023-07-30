import { FC } from "react";

const fixedClass =
  " animate-spin pointer-events-none fill-black dark:fill-white  ";

interface Props {
  customClass?: string;
}

const LINES_NUMBER = 13;

const Spinner: FC<Props> = ({ customClass }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={fixedClass + customClass}
    >
      <g className="spinner_OSmW">
        {Array.from(Array(LINES_NUMBER).keys()).map((index) => (
          <rect
            key={index}
            x="11"
            y="1"
            width="1.5"
            height="5"
            rx="1"
            transform={`rotate(${index * 30} 12 12)`}
            opacity={1 - index / LINES_NUMBER}
          />
        ))}
      </g>
      <style jsx>{`
        .spinner_OSmW {
          transform-origin: center;
        }
        @keyframes spinner_T6mA {
          8.3% {
            transform: rotate(30deg);
          }
          16.6% {
            transform: rotate(60deg);
          }
          25% {
            transform: rotate(90deg);
          }
          33.3% {
            transform: rotate(120deg);
          }
          41.6% {
            transform: rotate(150deg);
          }
          50% {
            transform: rotate(180deg);
          }
          58.3% {
            transform: rotate(210deg);
          }
          66.6% {
            transform: rotate(240deg);
          }
          75% {
            transform: rotate(270deg);
          }
          83.3% {
            transform: rotate(300deg);
          }
          91.6% {
            transform: rotate(330deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </svg>
  );
};

export default Spinner;

// <svg
//   className={fixedClass + customClass}
//   xmlns="http://www.w3.org/2000/svg"
//   fill="none"
//   viewBox="0 0 24 24"
// >
//   <circle
//     className="opacity-25"
//     cx="12"
//     cy="12"
//     r="10"
//     stroke="currentColor"
//     strokeWidth="4"
//   ></circle>
//   <path
//     className="opacity-75"
//     fill="currentColor"
//     d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//   ></path>
// </svg>

{
  /* <rect x="11" y="1" width="2" height="6" opacity=".14" />
<rect
  x="11"
  y="1"
  width="2"
  height="6"
  transform="rotate(30 12 12)"
  opacity=".29"
/>
<rect
  x="11"
  y="1"
  width="2"
  height="6"
  transform="rotate(60 12 12)"
  opacity=".43"
/>
<rect
  x="11"
  y="1"
  width="2"
  height="6"
  transform="rotate(90 12 12)"
  opacity=".57"
/>
<rect
  x="11"
  y="1"
  width="2"
  height="6"
  transform="rotate(120 12 12)"
  opacity=".71"
/>
<rect
  x="11"
  y="1"
  width="2"
  height="6"
  transform="rotate(150 12 12)"
  opacity=".86"
/>
<rect x="11" y="1" width="2" height="6" transform="rotate(180 12 12)" />
<rect x="11" y="1" width="2" height="6" transform="rotate(210 12 12)" />
<rect x="11" y="1" width="2" height="6" transform="rotate(240 12 12)" />
<rect x="11" y="1" width="2" height="6" transform="rotate(270 12 12)" />
<rect x="11" y="1" width="2" height="6" transform="rotate(300 12 12)" />
<rect x="11" y="1" width="2" height="6" transform="rotate(330 12 12)" />
<rect x="11" y="1" width="2" height="6" transform="rotate(360 12 12)" /> */
}
