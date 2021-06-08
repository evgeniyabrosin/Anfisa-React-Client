import { CSSProperties, ReactElement } from 'react'

interface Props {
  style?: CSSProperties
}

export const SettingsSvg = ({ style }: Props): ReactElement => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
  >
    <path
      d="M8 11C9.65685 11 11 9.65685 11 8C11 6.34315 9.65685 5 8 5C6.34315 5 5 6.34315 5 8C5 9.65685 6.34315 11 8 11Z"
      stroke="#18A0FB"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.67946 2.7596L6.50011 1.87535C6.43684 1.82775 6.36315 1.79587 6.28514 1.78234C6.20712 1.7688 6.12701 1.774 6.05139 1.7975C5.68614 1.91188 5.33177 2.0585 4.99248 2.23562C4.92224 2.27246 4.86178 2.32548 4.81607 2.39029C4.77036 2.45511 4.74072 2.52987 4.7296 2.60839L4.52111 4.06783C4.44164 4.13827 4.36384 4.21154 4.28771 4.28762C4.2116 4.36374 4.13832 4.44156 4.06786 4.52109L4.06783 4.52111L2.60865 4.72978C2.53025 4.74087 2.4556 4.77042 2.39087 4.81602C2.32613 4.86161 2.27316 4.92194 2.23631 4.99203C2.05891 5.33118 1.91201 5.68542 1.79734 6.05058C1.77373 6.1263 1.76846 6.20654 1.78197 6.2847C1.79548 6.36285 1.82738 6.43667 1.87504 6.50006L2.7596 7.67946C2.75322 7.78546 2.75001 7.89228 2.74998 7.99992C2.74998 8.10755 2.75319 8.2144 2.7596 8.32046L2.7596 8.3205L1.87535 9.49984C1.82775 9.56312 1.79587 9.6368 1.78234 9.71482C1.7688 9.79283 1.774 9.87295 1.7975 9.94856C1.91188 10.3138 2.0585 10.6682 2.23562 11.0075C2.27246 11.0777 2.32548 11.1382 2.39029 11.1839C2.45511 11.2296 2.52987 11.2592 2.60839 11.2704L4.06782 11.4788C4.13827 11.5583 4.21153 11.6361 4.28762 11.7122C4.36373 11.7884 4.44155 11.8616 4.52109 11.9321L4.52111 11.9321L4.72978 13.3913C4.74086 13.4697 4.77042 13.5444 4.81601 13.6091C4.86161 13.6738 4.92194 13.7268 4.99202 13.7636C5.33117 13.941 5.68542 14.0879 6.05058 14.2026C6.1263 14.2262 6.20654 14.2315 6.28469 14.218C6.36285 14.2045 6.43667 14.1726 6.50006 14.1249L7.67945 13.2404C7.78546 13.2467 7.89228 13.2499 7.99991 13.25C8.10755 13.25 8.2144 13.2468 8.32046 13.2404L8.3205 13.2404L9.49984 14.1246C9.56312 14.1722 9.6368 14.2041 9.71482 14.2176C9.79283 14.2312 9.87295 14.226 9.94856 14.2025C10.3138 14.0881 10.6682 13.9415 11.0075 13.7643C11.0777 13.7275 11.1382 13.6745 11.1839 13.6097C11.2296 13.5448 11.2592 13.4701 11.2704 13.3916L11.4788 11.9321C11.5583 11.8617 11.6361 11.7884 11.7122 11.7123C11.7884 11.6362 11.8616 11.5584 11.9321 11.4789L11.9321 11.4788L13.3913 11.2702C13.4697 11.2591 13.5443 11.2295 13.6091 11.1839C13.6738 11.1383 13.7268 11.078 13.7636 11.0079C13.941 10.6688 14.0879 10.3145 14.2026 9.94938C14.2262 9.87366 14.2315 9.79342 14.218 9.71526C14.2045 9.63711 14.1726 9.56329 14.1249 9.4999L13.2404 8.3205C13.2467 8.2145 13.2499 8.10768 13.25 8.00004C13.25 7.89241 13.2468 7.78556 13.2404 7.6795L13.2404 7.67946L14.1246 6.50011C14.1722 6.43684 14.2041 6.36315 14.2176 6.28514C14.2312 6.20712 14.226 6.12701 14.2025 6.05139C14.0881 5.68614 13.9415 5.33178 13.7643 4.99248C13.7275 4.92225 13.6745 4.86178 13.6097 4.81607C13.5448 4.77036 13.4701 4.74072 13.3916 4.7296L11.9321 4.52111C11.8617 4.44165 11.7884 4.36384 11.7123 4.28771C11.6362 4.2116 11.5584 4.13832 11.4789 4.06786L11.4788 4.06783L11.2702 2.60865C11.2591 2.53025 11.2295 2.4556 11.1839 2.39087C11.1383 2.32613 11.078 2.27316 11.0079 2.23631C10.6688 2.05891 10.3145 1.91201 9.94937 1.79734C9.87366 1.77373 9.79341 1.76846 9.71526 1.78197C9.63711 1.79548 9.56329 1.82738 9.49989 1.87504L8.3205 2.7596C8.2145 2.75322 8.10768 2.75001 8.00004 2.74998C7.8924 2.74998 7.78556 2.75319 7.6795 2.7596L7.67946 2.7596Z"
      stroke="#18A0FB"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
