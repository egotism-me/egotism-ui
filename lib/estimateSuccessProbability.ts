import { AddressConstraints } from "./validateAddress";

// return how many calls needed for successProbability
export function estimateSuccessProbability(constraints: AddressConstraints, attempts: bigint): number {
  const bits = constraints.startsWith.length + constraints.endsWith.length;
  let difficulty = Math.pow(16, bits);

  return 1 - Math.pow(1 - 1 / difficulty, Number(attempts));
}
