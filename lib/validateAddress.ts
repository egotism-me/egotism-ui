import { Address } from "viem"

export type AddressConstraints = {
  startsWith: string,
  endsWith: string
}

export function validateAddress(address: Address, constraints: AddressConstraints): boolean {
  const addressSanitized = address.substring(2).toLowerCase();
  return (
    addressSanitized.startsWith(constraints.startsWith.toLowerCase()) && 
    addressSanitized.endsWith(constraints.endsWith.toLowerCase())
  );
}
