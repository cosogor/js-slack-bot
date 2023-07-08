// git clone --recurse-submodules --remote-submodules git@github.com:Alien-Worlds/alienworlds-contracts.git
// yarn

/*
As the user has no tools in the bag, he might need to add them directly on chain with setBag action, if he can't see the button to do it
https://waxblock.io/account/m.federation?action=setbag#contract-actions

 */
https://waxnode.alienworlds.io/v2/history/get_actions?account=m.federation&skip=0&limit=100

const { Api, JsonRpc } = require('eosjs')
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig') // development only
const { TextDecoder, TextEncoder } = require('util') //node only
const fetch = require('node-fetch') //node only

let rpcEndpoint = 'https://wax.greymass.com'
let userAccount = '3m1q4.wam'
let pubKeys = [
  'EOS6rjGKGYPBmVGsDDFAbM6UT5wQ9szB9m2fEcqHFMMcPge983xz9',
  'EOS7wTCoctybwrQWuE2tWYGwdLEGRXE9rrzALeBLUhWfbHXysFr9W',
]
const privateKey = 'PVT_K1_DEZn8zQmetDMBSJd2UzAYw5dqT6t3cbQTVo1M6H4GSU4X1yKS'
const privateKeys = [privateKey]

const signatureProvider = new JsSignatureProvider(privateKeys)
const rpc = new JsonRpc(rpcEndpoint, { fetch }) //required to read blockchain state
const api = new Api({
  rpc,
  signatureProvider,
  textDecoder: new TextDecoder(),
  textEncoder: new TextEncoder(),
})

async function getblock(blockNum) {
  console.log(await rpc.get_block(blockNum)) //get the first block
}
async function gettransaction() {
  console.log(
    await rpc.history_get_transaction(
      'a10e7959a2dc410232ba94e282ad5f6b6ff418030fdfe3e445ab7aa3b7dbab39',
      0
    )
  )
}
async function getaccount(blockNum) {
  console.log(await rpc.get_account('raintrainwax'))
}
async function gettablerows(contract, scope, table) {
  let responce = await rpc.get_table_rows({
    json: true, // Get the response as json
    code: contract, // Contract that we target
    scope: scope, // Account that owns the data
    table: table, // Table name
    limit: 100, // Maximum number of rows that we want to get
    reverse: false, // Optional: Get reversed data
    show_payer: true, // Optional: Show ram payer
  })
  let jsn = JSON.parse(str)
  console.log(JSON.stringify(jsn) + '\n')
}
//getblock(46632826)
//gettransaction()
// etaccount()

let str =
  '{"rows":[{"data":{"rates":[{"key":"Abundant","value":"88.79999999999999716"},{"key":"Common","value":"9.40000000000000036"},{"key":"Epic","value":"0.31000000000000000"},{"key":"Legend' +
  'ary","value":"0.06000000000000000"},{"key":"Mythical","value":"0.02000000000000000"},{"key":"Rare","value":"1.39999999999999991"}],"pool_buckets":[{"key":"Abundant","value":"0.4170 TL' +
  'M"},{"key":"Common","value":"0.4373 TLM"},{"key":"Epic","value":"0.8373 TLM"},{"key":"Legendary","value":"0.5530 TLM"},{"key":"Mythic","value":"0.0000 TLM"},{"key":"Mythical","value":' +
  '"0.2417 TLM"},{"key":"Rare","value":"1.7030 TLM"}]},"payer":"m.federation"}],"more":false,"next_key":""}'
let jsn = JSON.parse(str)

gettablerows('m.federation', 'eyeke.world', 'pools')
gettablerows('m.federation', 'kavian.world', 'pools')
gettablerows('m.federation', 'magor.world', 'pools')
gettablerows('m.federation', 'naron.world', 'pools')
gettablerows('m.federation', 'neri.world', 'pools')
gettablerows('m.federation', 'veles.world', 'pools')

/*

script
const { Api, JsonRpc } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');
const fetch = require('node-fetch');
const util = require('util');

// Задаём частную подпись ключа аккаунта отправителя
const privateKeys = ['PRIVATE_KEY_HERE'];

// Это URL-адрес ноды EOSIO для вызова API JSON-RPC
const rpc = new JsonRpc('https://api.eosnewyork.io', { fetch });

// Сгенерируем провайдер учётных записей из нашей частной подписи
const signatureProvider = new JsSignatureProvider(privateKeys);

// Инициализируем API от eojs-js используя наш Провайдер и информацию о конфигурации сети (сеть EOS mainnet)
const api = new Api({ rpc, signatureProvider, textDecoder: new util.TextDecoder(), textEncoder: new util.TextEncoder() });

(async () => {
  try {
    const resultWithConfiguredAuthority = await api.transact({
      actions: [{
        account: 'mycontract',
        name: 'transfer',
        authorization: [{
          actor: 'senderaccount',
          permission: 'active',
        }],
        data: {
          from: 'senderaccount',
          to: 'receiveraccount',
          quantity: '1.0000 EOS',
          memo: '',
        },
      }]
    }, {
      blocksBehind: 3,
      expireSeconds: 30,
      broadcast:true,
      sign:true
    });

    console.log(resultWithConfiguredAuthority);
  } catch (e) {
    console.log('\nCaught exception:\n', e);
    if (e instanceof RpcError) console.log(JSON.stringify(e.json, null, 2));
  }
})();


В этом примере мы сначала инициализировали объект API от `eosjs`, задали подписку ключа аккаунта отправителя затем определили объект action для выполнения на контракте. Когда мы вызываем `transact` функцию от `eosjs`, передавая ей `actions`, она отправляет транзакцию этих действий через RPC-канал к узлу EOS.

Обратите внимание на то, что мы указали активное разрешение (`permission`) в массиве авторизации представляющее учётную запись отправителя. Также была задана блокировка написанными ранее действиями за последние три блока и временной лимит окончания действия после 30 секунд.

Этот фрагмент кода поможет Вам вызвать любой другой метод на контракте!
 */
