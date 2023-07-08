const request = require('supertest')
let MININGLIMIT = 0.8 // 80% of Rarity pool

// tool explorer by tool id https://wax.atomichub.io/explorer?search=1099523891477
// tx explorer https://waxblock.io/transaction/5fc32b353421cd5568be08afbc6f59862121e1076f780c9c4ebb2da1efe36053
// tx https://wax.greymass.com/v1/history/get_transaction?id=3eea81458a37fbefdb813c80bc76b14a9b682003a8894f032f5d1e853e6a90cf
// тут ищем последнюю транзакцию майнера https://waxblock.io/account/m.federation?code=m.federation&scope=m.federation&table=miners&lower_bound=yciky.c.wam&upper_bound=yciky.c.wam&limit=100#contract-tables
// по номеру Тх находим нужную Тх для калькуляции баунти https://waxblock.io/transaction/badb33a08eb439ace335ae9f75c160b83c48cb2196afcddf3b0e97a69bfcd143

// https://waxblock.io/transaction/6f33b2a265c75aae4ff756b36e9ad8abfcb17a1b455b437cad73728627f29764

// https://wax.greymass.com/v1/history/get_transaction?id=35bddd2b66a124c7bf88f3758d52de954f8ed894692b463c10991cfb25ecd449
//     venzu.wam
// landowner_share:  0.2505
// delta = bountyEst: -0.11041999999999999  - bountyAct: 2.5331  =  -2.64352  ( 2394.06 %)

async function GetRequest(name, timeout, statusCode, baseUrl) {
  console.log(name + ' ' + baseUrl)
  let date1 = Date.now()
  const response = await request(baseUrl).get('')
  let date2 = Date.now()
  let delay = date2 - date1
  if (delay > timeout) {
    delay = delay + ' ERROR!!!'
  }
  let statusCodeMsg = response.statusCode + '\tEST: ' + statusCode
  if (response.statusCode != statusCode) {
    //ERROR
    statusCodeMsg = statusCodeMsg + ' ERROR!!!'
    return 1
  }
  console.log('DELAY: ' + (date2 - date1) + '\tCODE: ' + statusCodeMsg)
  return response
}

async function testRarityPoosMining(testId, timeout, statusCode, baseUrl) {
  console.log('TEST STARTED ' + testId)
  let responceMiningTxs = await GetRequest('GET MINING TXs', 60000, 200, baseUrl)
  if (responceMiningTxs == 1) {
    return responceMiningTxs
  }
  let deltaTotal = 0
  let bauntyEstTotal = 0
  let bauntyActTotal = 0
  let landownerShareTotal = 0
  let TxTotal = 0

  let json = JSON.parse(responceMiningTxs.text)

  let responceRarityPools = ''
  let actions = json.actions
  // let actions = json.traces
  for (const value of actions) {
    // let key = json.actions.indexOf(value)

    if (value.act.account == 'notify.world') {
      let block_num = value.block_num
      let trx_id = value.trx_id
      let rarityPool = 0
      let timestamp = value.block_time
      // console.log(timestamp)
      console.log('https://wax.greymass.com/v1/history/get_transaction?id=' + trx_id)
      let miner = value.act.data.miner
      let pool_amounts = value.act.data.pool_amounts
      // if (miner != 'yciky.c.wam') {
      //   continue
      //   console.log(miner)
      // }

      /*
      responceRarityPools = await GetRequest(
        'GET RARITY POOLS BLOCK',
        10000,
        200,
        'https://waxnode.alienworlds.io/v2/history/get_deltas?code=m.federation&table=pools&scope=veles.world&block_num=' +
          block_num
      )
      if (responceRarityPools == 1) {
        continue
      }

      let jsonRarityPools = JSON.parse(responceRarityPools.text)

      let pool_buckets1 = []
      try {
        pool_buckets1 = jsonRarityPools.deltas[0].data.pool_buckets
      } catch (err) {
        // console.log(err.msg)
        console.log(
          'ERROR: Invalid Rarity Pools block:\n' +
            'https://waxnode.alienworlds.io/v2/history/get_deltas?code=m.federation&table=pools&scope=veles.world&block_num=' +
            block_num
        )
        console.log(jsonRarityPools.deltas)
        continue
      }
*/
      let pool_buckets = value.act.data.pool_amounts
      let landowner_share = Number(value.act.data.landowner_share.replace(' TLM', ''))
      let bag_items = value.act.data.bag_items
      let bountyEst = 0

      let land_id = value.act.data.land_id
      let planet_name = value.act.data.planet_name
      // parse Tx mining tools Bag (in one Bag 1-3 tools)
      let toolBag = []
      value.act.data.params.eases.forEach((valueEasy, i) => {
        let tool = []
        tool['Land'] = land_id.toString()
        tool['Rarity'] = valueEasy.first.toString()
        tool['Easy'] = valueEasy.second.toString()
        tool['Tool'] = value.act.data.bag_items[i].toString()
        // parse pools Buckets
        for (const bucket of pool_buckets) {
          if (valueEasy.first == bucket.key) {
            rarityPool = Number(bucket.value.replace(' TLM', ''))
            tool['RarityPool'] = rarityPool
            break
          }
        }

        tool['Bounty'] = (tool['RarityPool'] * tool['Easy']) / 1000
        tool['Planet'] = planet_name.toString()
        bountyEst += tool['Bounty']
        toolBag.push(tool)
      })

      // console.log(miner)
      // console.table(toolBag)
      // console.log('landowner_share: ', landowner_share)

      if (bountyEst > rarityPool) {
        bountyEst = rarityPool * MININGLIMIT
      }

      bountyEst = bountyEst - landowner_share
      let bountyAct = Number(value.act.data.bounty.replace(' TLM', ''))
      let delta = bountyEst - bountyAct
      deltaTotal += delta
      bauntyEstTotal += bountyEst
      bauntyActTotal += bountyAct
      TxTotal++

      if (delta >= 0) {
        continue
      }
      console.log(
        'delta = bountyEst:',
        bountyEst,
        ' - bountyAct:',
        bountyAct,
        ' = ',
        delta,
        ' (',
        Math.round((delta / bountyEst) * 100 * 100) / 100,
        '%)'
      )
      //      console.log('')
    }
  }
  console.log('')
  console.log('deltaTotal = ', deltaTotal)
  console.log(
    'deltaTotal = bauntyEstTotal: ',
    bauntyEstTotal,
    ' - bauntyActTotal: ',
    bauntyActTotal,
    ' = ',
    deltaTotal,
    ' (',
    Math.round((deltaTotal / bauntyEstTotal) * 100 * 100) / 100,
    '%)'
  )
  console.log('TxTotal ' + TxTotal)
  console.log('TEST FINISHED ' + testId)
  //   await sendMessage(OAUTH_TOKEN, CHANNEL, 'TEST FINISHED 0004');
}

async function main() {
  await testRarityPoosMining(
    '0001',
    10000,
    200,
    'https://waxnode.alienworlds.io/v2/history/get_actions?account=m.federation&skip=0&limit=1000'
    //'https://wax.greymass.com/v1/history/get_transaction?id=668b30b13323d7744e642acca28ae3407e3bebbd234be409eae5d768e0d64b21'
  )
}

main()
