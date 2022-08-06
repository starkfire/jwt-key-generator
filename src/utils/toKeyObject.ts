import { KeyObject } from "node:crypto";
import { isCryptoKey } from "util/types";

export default function toKeyObject(key: CryptoKey) {
    if (!isCryptoKey(key)) {
        throw new Error('Input key should be CryptoKey');
    }

    return KeyObject.from(key);
}