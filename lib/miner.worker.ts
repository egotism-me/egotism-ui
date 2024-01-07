import { expose } from 'comlink';
import { AddressConstraints, validateAddress } from './validateAddress';
import { Address, Hex, getAddress } from 'viem';
import secp256k1 from 'secp256k1';
import keccak from 'keccak';
import randomBytes from 'random-bytes';

const minerWorker = {
  times: 0n,
  runMiner
}

export type MinerWorker = typeof minerWorker;

export type MinerResult = {
  address: Address,
  privateKey: string
}

async function runMiner(constraints: AddressConstraints): Promise<MinerResult> {
  minerWorker.times = 0n;
  let address = '';
  let privateKey;

  while (!validateAddress(address as Hex, constraints)) {
    privateKey = await randomBytes(32);
    const publicKey = secp256k1.publicKeyCreate(privateKey, false).slice(1);
    address = getAddress('0x' + keccak('keccak256').update(Buffer.from(publicKey)).digest().subarray(-20).toString('hex'));
    minerWorker.times++;
  }

  return {
    address: address as Address,
    privateKey: (privateKey as Buffer).toString('hex')
  }
}

expose(minerWorker);
