export default function getRSAType(alg: string) {
    if (alg.length == 5 && alg.substr(0, 2) == 'RS') {
        return 'RSASSA-PKCS1-v1_5';
    }

    if (alg.length == 5 && alg.substr(0, 2) == 'PS') {
        return 'RSA-PSS';
    }

    if (alg.substr(-4) == 'OAEP' || alg.substr(-8, 4) == 'OAEP') {
        return 'RSA-OAEP';
    }

    return null;
}