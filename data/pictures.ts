export const pictures = [
    "https://lh5.googleusercontent.com/qCOpa9SbI1Kj8DFuwIb8K6ugKW1KUnAhM9RfeQKv09tB-aK_ZNwEeVUBFoderrzW0NDgpaLWIG98OlvqxI2ptNv9OlPL-6TRoWnec28HAumLd3PJaQkWulzqpic3gJVmcMQqttaV",
    "https://lh3.googleusercontent.com/y60KH8wArPNVy4kslnWZFX_rDIxxPNmMLsWTwz9GiGnfCmygzsgk2ZItVZ74vBPHyqhT6nzSiWZU8TxFJEo8FN20wtnEPkGDrNksVfP2wmz66xRANzAAdOy11VBosgRmTykIsBMs",
    "https://lh6.googleusercontent.com/SI1hK2Mw3X7s-1wMOy1v-DTpFcN5M5J9NNIVOSFgBHZ-tsYK475-yX7HxN2N1VRNnqIK3fVusbUpyWD101cqE0_PltqLhJkHiuXL5PQHRbX9Mng7otIF92kJFNoU-KR0zCy2SNhI",
    "https://lh3.googleusercontent.com/D6MX2fCTNwPEnFDfYHkmXio03WH2qH5tZwLNnVuzO-k7z72QrYzKzpen9i6zx61qWxF-kLzTWr0yOl5S8PBMUQTL8P4gj5j5akyTra58Pd_G0bXhHCaIzVTODSC6SNc_jeGgHbVe",
    "https://lh5.googleusercontent.com/JYnPN_W7uPmuiaCD3S4a-I7QU0WF-zSlpzdjzP6l2GIAd8-d9MjUxzYz344E0gCI3maFloWkJjlB8Pwqi_mzV-sxngYHy4FINKkW1uw1W-wDUdkF4wWdk0PjOj6Jgf_xYBqoGS5E",
    "https://lh3.googleusercontent.com/btCz3utaa4Er2-KBhQDhlqi0vnQRHsNC6wucOd-cDvfNJCuJDEb29PMq51jv9sp0EItKCrJI1L-fC59atYO5MLKvvF1OYLnVVbAh_hDQenJNPoqBevCZmFZ_Rj-JMQxC8otq46jZ",
    "https://lh5.googleusercontent.com/DBrdB0sjNOkm2_UCEuJkFalCXFiskasX4A0BPJx9nnmLDQPlCXJ1cx9ofDCsaLjFRKqk14SJ2kniDT1llIsi_rq1L4-JViW7E77DEZ9RiB3LcFAEBhb4EuBwt3ldEPgqI1aIRDA5",
    "https://lh5.googleusercontent.com/TXN2hGLRkhFXNfyJ8ZnO19C2membdl99naBc2R2KM_ZXZCWowl_pr5L8Odk3gR726mco_J3zCw6fN6gwGFlwBuMPfLJObCveHG-u5tyDanJeXmE33OIeMI_ZlIESvzUPVy8csSAY",
    "https://lh6.googleusercontent.com/xk7xMJuNlVZW0TCvDbq5oJiP6haVj5hHi2TLp_Thhh_rQiiHLsLktzkW4bnmS0gURQU81yPo2wkly8E03GyIlpF-xpTGWaOmgkWafKHGiG7AQUAvBwbL-cCGyyQCHhdHgX-wSq00",
    "https://lh3.googleusercontent.com/acW3eyYzKyFoOoc5sURXL2-16ALQwRlkd-rrDNsxZ9zYWRaHiJPCGcYqu6LqTthKbzK7_04g7uZ5wEagYhi2GkhfPcbGustTx1iGj8SU2151uUmH3mA4_u3A1Fj8Y5SAqVu3U8Bx"
]

export const getRandomPicture = () => {
    return pictures[Math.floor(Math.random() * pictures.length)]
}

console.log(getRandomPicture())