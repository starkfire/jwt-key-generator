import { KeyObject } from "node:crypto";
import { isCryptoKey } from "util/types";

export default function toKeyObject(key: CryptoKey) {
    try {
        if (!isCryptoKey(key)) {
            throw new Error('Input key should be CryptoKey');
        }

        return KeyObject.from(key);
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        }
    }
}