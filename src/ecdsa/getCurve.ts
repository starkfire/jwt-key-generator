export default function getCurve(alg: string) {
    if (alg == 'ES256' || alg == 'ES384') {
        return `P-${alg.slice(-3)}`;
    }

    if (alg == 'ES512') {
        return 'P-521';
    }
}