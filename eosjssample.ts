import { Api, JsonRpc, Serialize } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import { EosioAction } from './CommonTypes';
const fetch = require('node-fetch');

/**
 * getter for a simple RPC connection for READONLY actions from the blockchain eg. reading Multi-index tables.
 * @param eos_endpoint Specify the EOSIO api endpoint to interact with
 * @returns an RPC endpoint that can be use for table fetching etc.
 */
export const get_rpc = (eos_endpoint: string) => {
    return new JsonRpc(eos_endpoint, { fetch });
};

export const S = Serialize;

export type KeyConfig = {
    raw_keys: string[];
};

/**
 * A Getter for an API that can be used for signing and pushing transactions to the EOSIO blockchain.
 * @param eos_endpoint Specify the EOSIO api endpoint for the actions
 * @param private_keys An Array private keys to be used to sign the actions corresponding to the intended actors of the tranaction/action. Be careful with the keys and NEVER store them in you code that is then commit to git.
 * @returns the result of the blockchain transaction as either success or failure containing the blockchan assertion error details.
 */
export const transactWithKeys = async (
    eos_endpoint: string,
    actions: EosioAction[],
    config: KeyConfig,
    submit_to_blockchain: boolean
) => {
    const rpc = get_rpc(eos_endpoint);

  const signatureProvider = new JsSignatureProvider(config.raw_keys);

  const api = new Api({
      rpc,
      signatureProvider,
      textDecoder: new TextDecoder(),
      textEncoder: new TextEncoder(),
  });

  try {
      return await api.transact(
          {
              actions,
          },
          {
              blocksBehind: 3,
              expireSeconds: 180,
              broadcast: submit_to_blockchain,
          }
      );
  } catch (e: any) {
      if (e.type == 'invalid-json') {
          console.log('got the expected error:', e);
      } else {
          throw e;
      }
  }
};

export const getApi = (eos_endpoint: string) => {
    const rpc = get_rpc(eos_endpoint);

  const signatureProvider = new JsSignatureProvider([]);

  const api = new Api({
      rpc,
      signatureProvider,
      textDecoder: new TextDecoder(),
      textEncoder: new TextEncoder(),
  });

  return api;
};

export const isLoggingEnabled = (): boolean => {
    return process.env['LOGGING_VERBOSE'] == 'true';
};