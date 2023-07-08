const request = require('supertest')

// https://wax.greymass.com/v1/history/get_transaction?id=8f8469e8d497968981873a10dd1964cfdc29fd3490d9a2c83cf533e6431a9faa
//     v334a.c.wam
// ┌─────────┬────────────┬────────────┬──────┬─────────┬─────────────┬────────────┬──────────┬───────────┬────────┬───────────┬───────────────┬───────────────┐
// │ (index) │   Rarity   │   RP       │ Easy │ EasyMax │ BntBRUTO    │ LComission │  LShare  │ LShareEST │ Bounty │ BntEST    │    Planet     │     Miner     │
// ├─────────┼────────────┼────────────┼──────┼─────────┼─────────────┼────────────┼──────────┼───────────┼────────┼───────────┼───────────────┼───────────────┤
// │    0    │ 'Abundant' │   0.3425   │ '68' │  '68'   │   0.0233    │   '2500'   │ '0.0091' │  0.0058   │ 0.0275 │  0.0175   │ 'veles.world' │ 'v334a.c.wam' │
// │    1    │  'Common'  │   0.1982   │ '68' │  '68'   │   0.0135    │   '2500'   │ '0.0091' │  0.0034   │ 0.0275 │  0.0101   │ 'veles.world' │ 'v334a.c.wam' │
// └─────────┴────────────┴────────────┴──────┴─────────┴─────────────┴────────────┴──────────┴───────────┴────────┴───────────┴───────────────┴───────────────┘
// landowner_share:  0.0091
// delta = BntEST: 0.0277  - bountyAct: 0.0275  =  0.0001999999999999988  ( 0.72 %)

TxArray = [
  '72e3148dabda5e42008130d58b151b2a873d180b0ec6ff2fe41c48c9011022fc',
  '15c83186819c12b5a82505f7d48f3f9bde25ace0420ab3e08d23bcf1067358b6',
  '668b30b13323d7744e642acca28ae3407e3bebbd234be409eae5d768e0d64b21',
  '72e3148dabda5e42008130d58b151b2a873d180b0ec6ff2fe41c48c9011022fc',
]

function trunk4(num) {
  return parseFloat(num.toFixed(4))
}
function round2(num) {
  return Math.round(num * 10000) / 100
}
DeltaArray = ['0', '0', '0', '0']
let MININGLIMIT = 800 // 80% of Rarity pool

// RP * Easy = Bounty + Share
// tool explorer by tool id https://wax.atomichub.io/explorer?search=1099523891477
// tx explorer https://waxblock.io/transaction/5fc32b353421cd5568be08afbc6f59862121e1076f780c9c4ebb2da1efe36053
// tx https://wax.greymass.com/v1/history/get_transaction?id=3eea81458a37fbefdb813c80bc76b14a9b682003a8894f032f5d1e853e6a90cf
// тут ищем последнюю транзакцию майнера
// https://waxblock.io/account/m.federation?code=m.federation&scope=m.federation&table=miners&lower_bound=yciky.c.wam&upper_bound=yciky.c.wam&limit=100#contract-tables

// по номеру Тх находим нужную Тх для калькуляции баунти https://waxblock.io/transaction/badb33a08eb439ace335ae9f75c160b83c48cb2196afcddf3b0e97a69bfcd143

// https://waxblock.io/transaction/6f33b2a265c75aae4ff756b36e9ad8abfcb17a1b455b437cad73728627f29764

// https://wax.greymass.com/v1/history/get_transaction?id=35bddd2b66a124c7bf88f3758d52de954f8ed894692b463c10991cfb25ecd449
//     venzu.wam
// landowner_share:  0.2505
// delta = BntEST: -0.11041999999999999  - bountyAct: 2.5331  =  -2.64352  ( 2394.06 %)

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
    //ERROR handler
    statusCodeMsg = statusCodeMsg + ' ERROR!!!'
    return 1
  }
  console.log('DELAY: ' + (date2 - date1) + '\tCODE: ' + statusCodeMsg)
  return response
}

function optimizeEases(eases_) {
  let optimised_eases_ = []
  optimised_eases_[0] = Object.assign({}, eases_[0])
  for (i = 1; i < eases_.length; i++) {
    for (j = 0; j < optimised_eases_.length; j++) {
      if (eases_[i].first == optimised_eases_[j].first) {
        optimised_eases_[j].second = optimised_eases_[j].second + eases_[i].second
      } else {
        optimised_eases_[j + 1] = Object.assign({}, eases_[i])
        break
      }
    }
  }
  return optimised_eases_
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
  let actions
  if (json.actions != undefined) {
    actions = json.actions
  } else {
    actions = json.traces
  }

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
      // let pool_amounts = value.act.data.pool_amounts

      let pool_buckets = value.act.data.pool_amounts
      let landowner_share = Number(value.act.data.landowner_share.replace(' TLM', ''))
      let bag_items = value.act.data.bag_items
      let bountyEst = 0
      let bountyAct = Number(value.act.data.bounty.replace(' TLM', ''))

      let land_id = value.act.data.land_id
      let planet_name = value.act.data.planet_name
      // parse Tx mining tools Bag (in one Bag 1-3 tools)
      let toolBag = []
      let eases = []
      let optimized_eases = []

      eases = value.act.data.params.eases
      optimized_eases = optimizeEases(eases)
      // use eases for 1-hand miner algorithm (nonactual for now).
      // use optimized_eases for 3-hand miner algorithm (actual for now).

      for (i = 0; i < eases.length; i++) {
        let tool = []
        let valueEasy = eases[i]
        // tool['Land'] = land_id.toString()
        // tool['Tool'] = value.act.data.bag_items[i].toString()
        tool['Rarity'] = valueEasy.first.toString()
        // parse pools Buckets
        for (const bucket of pool_buckets) {
          if (valueEasy.first == bucket.key) {
            rarityPool = Number(bucket.value.replace(' TLM', ''))
            tool['RP'] = rarityPool
            break
          }
        }
        tool['Easy'] = valueEasy.second.toString()

        if (tool['Easy'] > MININGLIMIT) {
          tool['EsyMax'] = MININGLIMIT
        } else {
          tool['EsyMax'] = tool['Easy'].toString()
        }
        tool['BntBrt'] = trunk4((tool['RP'] * tool['EsyMax']) / 1000)
        // Landowner comission
        tool['LCmn'] = value.act.data.params.commission.toString()
        // Landowner share
        tool['LShare'] = value.act.data.landowner_share.toString().replace(' TLM', '')
        tool['LShEST'] = trunk4((tool['BntBrt'] * value.act.data.params.commission) / 10000)
        tool['Bounty'] = bountyAct
        tool['BntEST'] = trunk4(tool['BntBrt'] - tool['LShEST'])

        tool['Planet'] = planet_name.toString()
        tool['Miner'] = miner

        bountyEst += tool['BntBrt']
        toolBag.push(tool)
      }

      bountyEst = bountyEst - landowner_share

      let delta = bountyEst - bountyAct
      deltaTotal += delta
      bauntyEstTotal += bountyEst
      bauntyActTotal += bountyAct
      TxTotal++

      // if (delta >= 0) {continue}

      // if (toolBag[0].Easy <= 800 || toolBag[1].Easy <= 800) {
      //   continue
      // }

      console.log()
      // console.log(miner)
      console.table(toolBag)
      console.log('landowner_share: ', landowner_share)

      console.log(
        'delta = bountyEst:',
        bountyEst,
        ' - bountyAct:',
        bountyAct,
        ' = ',
        delta,
        ' (',
        round2(delta / bountyEst),
        '%)'
      )
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
    round2(deltaTotal / bauntyEstTotal),
    '%)'
  )
  console.log('TxTotal parced ' + TxTotal)
  console.log('TEST FINISHED ' + testId)
  //   await sendMessage(OAUTH_TOKEN, CHANNEL, 'TEST FINISHED 0004');
  return deltaTotal
}

async function main() {
  await testRarityPoosMining(
    '0001',
    10000,
    200,
    'https://waxnode.alienworlds.io/v2/history/get_actions?account=m.federation&skip=0&limit=1000'
  )
}

async function main2() {
  for (const Tx of TxArray) {
    let i = TxArray.indexOf(Tx)
    let deltaAct = 0
    deltaAct = await testRarityPoosMining(
      '0001',
      10000,
      200,
      'https://wax.greymass.com/v1/history/get_transaction?id=' + Tx
    )
    if (Math.abs(deltaAct) != DeltaArray[i]) {
      console.log(i, 'ERROR deltaAct: ', Math.abs(deltaAct), '\tdeltaEst: ', DeltaArray[i])
      break
    } else {
      console.log(i, 'OK deltaAct: ', Math.abs(deltaAct), '\tdeltaEst: ', DeltaArray[i])
    }
  }
}

main()
