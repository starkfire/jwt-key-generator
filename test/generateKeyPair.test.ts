import { isCryptoKey } from "util/types";

import { ASYNC_ALGS } from "../src/algorithms";
import generateKeyPair from "../src/generateKeyPair";

describe("Test generateKeyPair()", () => {
    test("should return a CryptoKey", async () => {
        const secret = await generateKeyPair('RS256');

        expect(isCryptoKey(secret.publicKey)).toEqual(true);
        expect(isCryptoKey(secret.privateKey)).toEqual(true);
    });

    test("should return an error if an invalid algorithm is placed as an argument", async () => {
        try {
            await generateKeyPair('HS256');
        } catch (error) {
            if (error instanceof Error) {
                expect(error.message).toBe('Invalid Asymmetric Algorithm');
            }
        }
    });

    test("should work with every algorithm within RSA (algorithms.ts)", async () => {
        ASYNC_ALGS['RSA'].forEach(async (alg) => {
            let secret = await generateKeyPair(alg);

            expect(isCryptoKey(secret.publicKey)).toEqual(true);
            expect(isCryptoKey(secret.privateKey)).toEqual(true);
        });
    });

    test("should work with every algorithm within ECDSA (algorithms.ts)", async () => {
        ASYNC_ALGS['ECDSA'].forEach(async (alg) => {
            let secret = await generateKeyPair(alg);

            expect(isCryptoKey(secret.publicKey)).toEqual(true);
            expect(isCryptoKey(secret.privateKey)).toEqual(true);
        });
    });
});