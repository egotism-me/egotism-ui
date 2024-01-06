import { expose } from 'comlink';

export interface MinerWorker {
  runMiner: typeof runMiner
}

const minerWorker: MinerWorker = {
  runMiner
}

async function runMiner(): Promise<bigint> {
  let sum = 0n;
  for (let i = 0n; i < 100_000_000; i++) {
    sum += i;
  }
  return sum
}

expose(minerWorker);
