import { FC } from "react";

const fixedClass = " pointer-events-none ";

interface Props {
  customClass?: string;
}

const USDAIcon: FC<Props> = ({ customClass }) => {
  return (
    <svg
      className={customClass + fixedClass}
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="613.000000pt"
      height="419.000000pt"
      viewBox="0 0 613.000000 419.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,419.000000) scale(0.100000,-0.100000)"
        fill="#000000"
        stroke="none"
      >
        <path
          fill="#004785"
          d="M4997 3587 c-479 -1117 -468 -1094 -532 -1154 -30 -29 -55 -55 -55
-58 0 -3 84 -5 187 -5 l188 0 -38 31 c-27 22 -37 38 -37 59 0 35 32 125 99
280 l50 115 313 2 313 3 78 -189 c42 -104 77 -197 77 -206 0 -9 -16 -33 -35
-52 -19 -19 -35 -37 -35 -39 0 -2 126 -4 280 -4 154 0 280 3 280 8 -1 4 -21
20 -46 36 -31 19 -53 44 -71 80 -15 28 -187 420 -383 870 -196 451 -361 821
-366 823 -5 1 -125 -269 -267 -600z m294 -273 c66 -159 123 -295 126 -301 4
-10 -49 -13 -247 -13 -236 0 -252 1 -246 18 28 75 241 590 243 588 2 -1 57
-133 124 -292z"
        />
        <path
          fill="#004785"
          d="M2005 4154 c-105 -23 -222 -83 -287 -148 -117 -115 -165 -290 -122
-451 44 -171 164 -278 484 -433 233 -112 287 -166 298 -297 10 -128 -48 -236
-155 -291 -231 -120 -507 28 -620 331 l-22 60 1 -155 c0 -85 3 -189 7 -230 l6
-74 82 -33 c157 -64 221 -76 398 -77 148 0 166 2 232 26 99 36 157 71 231 142
191 183 214 513 47 704 -57 65 -132 111 -387 235 -203 99 -239 121 -280 164
-72 78 -86 169 -39 261 47 93 135 136 263 131 73 -4 94 -9 160 -42 94 -46 167
-122 216 -224 19 -40 35 -73 37 -73 4 0 -6 333 -11 366 -4 27 -13 35 -62 57
-130 58 -342 81 -477 51z"
        />
        <path
          fill="#004785"
          d="M35 4100 l40 -41 5 -632 5 -632 27 -69 c91 -235 296 -360 613 -373
345 -14 550 109 634 380 l25 82 6 625 c4 344 7 626 8 627 1 1 16 18 33 38 l31
35 -158 0 -159 0 27 -23 c14 -12 30 -31 36 -42 5 -12 12 -257 16 -585 8 -606
4 -664 -43 -773 -30 -69 -100 -139 -174 -173 -58 -27 -70 -29 -192 -29 -112 0
-136 3 -177 22 -63 29 -134 97 -165 156 -50 100 -53 136 -53 765 0 635 -2 617
57 661 l28 20 -255 1 -254 0 39 -40z"
        />
        <path
          fill="#004785"
          d="M2889 4105 l31 -36 0 -809 0 -809 -30 -34 c-16 -19 -30 -37 -30 -41
0 -10 678 -7 795 4 283 27 488 114 656 280 100 99 157 184 200 295 44 113 59
194 59 320 0 401 -257 720 -665 824 -136 35 -236 41 -648 41 l-399 0 31 -35z
m836 -135 c239 -77 389 -239 456 -495 24 -93 29 -269 10 -375 -52 -292 -216
-481 -478 -552 -61 -16 -118 -22 -265 -25 l-188 -5 0 742 0 742 198 -4 c169
-5 207 -8 267 -28z"
        />
        <path
          fill="#005941"
          d="M60 2017 l0 -122 468 0 c257 0 559 -6 672 -13 281 -17 770 -51 855
-58 93 -8 78 5 -50 46 -452 143 -1050 229 -1842 264 l-103 4 0 -121z"
        />
        <path
          fill="#005941"
          d="M5325 2129 c-1908 -57 -3646 -372 -4813 -870 -158 -68 -452 -211
-452 -220 0 -4 77 19 170 52 820 284 1996 535 3120 663 739 85 1354 120 2147
120 l553 1 0 133 0 132 -237 -2 c-131 0 -350 -5 -488 -9z"
        />
        <path
          fill="#005941"
          d="M290 1729 c-124 -3 -226 -7 -227 -8 -2 0 -3 -57 -3 -126 l0 -125 24
10 c79 30 529 102 1056 170 173 22 331 43 350 47 l35 6 -44 8 c-125 24 -726
33 -1191 18z"
        />
        <path
          fill="#005941"
          d="M5090 1673 c-580 -24 -947 -48 -1365 -88 -1313 -126 -2475 -354
-3452 -676 l-213 -70 0 -420 0 -419 3000 0 3000 0 0 840 0 840 -452 -2 c-249
-1 -482 -3 -518 -5z"
        />
      </g>
    </svg>
  );
};

export default USDAIcon;