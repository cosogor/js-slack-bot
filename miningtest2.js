const request = require('supertest')
TxArray = [
  '5fc32b353421cd5568be08afbc6f59862121e1076f780c9c4ebb2da1efe36053',
  '0ca8de2340f78ecff409d94236c6efd19c0e176d25f9e242c8168fc78b3beedc',
  '94c31cc78fe4a331d8b85daa4419655c1be8913e6b33dc517182216e909e613e',
  'c6d18668796ffc538bd265d72b5c1257d345d4a06cf378179c08f714ce6c9ef4',
  '8ac025e5364dd88620194402596240b735f4a69b46b50f6a02df45e658a6ffc3',
  '58a2f5d582c188f2b46061ab12886c8042a3a17fbb845eb26aed0377af96091b',
  '46faf23aa638df51ad595f8341dc7169a10382e0c056b9b64fcb1cb4d6cd3e5c',
  '342404310dd16658687fa2689d92a3c94c355d8971e3cb4d5c5c0585823607f9',
  'a01c1fd6f26e6102beb516307a8c474748461f3ce3bbf9f36e0431666acba4a0',
  'cb5c35c791f894b48dc590f20d7cb595ccb40e68ca6bf46ccd4c1c32755359a9',
  'd6da4fd45de64cc775a298fc2c4801eb974a511d5078ee39a6137a7bdab15b50',
  '4a7a564abd4291fbbc93e41a91e0290f2a1efe74158f933e6d9bfc058efbcf0b',
  'f743d0aaba56e4144583225a436fd1e0154cbc3c8a90927ccd38de26c236405e',
  'b111e327a05763120c4475003b69a619ed26b0302930a96503dee5aba9f77579',
  '103d27e955a95d7340baab99360bda33064c909d895dc1760ad1635a68d2a522',
  'ef505ff4c30b0831980fa2eb8d6768f3a15394f2606dc45bb5046c51f8ef8e18',
  '7dd25628119953d8be211d30de9ca86389a3de8df542c4657766141b25b89cf3',
  '760a588d9b895870c4b3ccad860fc211843b37c3da8b4ccd7e4397a14bf20eba',
  '44b79bcba3154a27e5c691e127a35afe2080cdb4c9c3f9cf945c15ef6bfeb1e3',
  '68a0ec5452bd935d29af358d9e010bc1b02e0fdaa740515476789cf85f745902',
  'e096e4ff82989d4a9c465d5009ea1388f4b7db54e696e631c7ad0491924df4e4',
  'eb900fb85824f8570ecd71bfd9a4274850dd6b256ee9d3fcdd59737a8c67a9cf',
  '6cdcdcaf683d988706880525da5c1460e928ab9cfdb95f00a4bde872b7940c6f',
  '6dde5f5e520b66aeb9df8f3ef1a8ee7bdb9b4e9f28473618f2d4485f47d8dc0c',
  '8e7cb8ca8d3b73e4a632ed2ed7bbb0e4273ad5d90bb2a78d1fe482660117a221',
  '628e00056c813cec543b341c371b11a4d90a6c7c2b75f3be5c733bda3134a32c',
  'd35c28029f3f0bfb7dfc46643a677f704df7ee2c7d9e030f416879b64593e5ae',
  '672fbaca2e137b76dd633194a2a403ab49cb6a517b3f824077f0253ffdce0c24',
  '3e81b6b5a082d39002cec3216caae5c79c86ac30c677024ab7c41831d5e96c77',
  '3cf39a4ed6d4bce7172db40c798b54544ebcd40df8b38214b626c498f535d26f',
  '6ea7625ce1d079db1a10896962b715d63fece8aebca6053da3a67866dcb91588',
  '6f15a169aefb12840d5847f7d992040ee473dc7bd2d74f8496a4c554df1f9195',
  '8f0ddfbc7df1213b0f9707df361234d051619b16e4797ed858c7b5f26ae1b174',
  'a26fd379ab9bbbf7b4b0deaee76192cc51a6ed50a30abfe359853008df6c7964',
  '767d0bd6849769507ac7425c18e98a0596bc9382532d94cb7b6f1ce1963da58c',
  '9b8ff432723d7a1b1114910081c4575baf847bfae2266f9efceb4955a012a4ac',
  '96e3abd3b0f13b14bd3a6043230e7186f265bb25027807fd1de55e89224e7228',
  '46b494a9343cc4db3d2d21fa5d1619ec12c00c8b6076424e265309239e24ff0f',
  '1f6cf6397c9a2f98dd5b3b0dbc4870a2cc0223ecad5b0127ab49dfde0b10c966',
  '971c07648670416fef75fdc65be245bc4c88f85c7995c6547e4fee1cea8cc4ed',
  '8543f148331e63a8df4bad92963fdcfa01b608ac2507b1797024fbd41433c291',
  '5cff1f7e8b99851c90501c671a914c23b3b5e0ffd636f4eafb059987a9ac930f',
  'acbfa0afd9cb69d56b2657492f93c83ab308998f65274696f6d5693c74d6bbc9',
  '5697c32aff7cd5a31341700e4eb186a648e22cf628cf509f2275289d0d4e7a74',
  '57aba79da4509dc3026802fb59a1ab9ca669f9d73d315c0f4e6100958b5d3545',
  'f96d87dcc06f2d78d3c59f79f755c37ba5c7cac8c4fd3f4b6e86fa4c1ce67953',
  '95ec647978cf7f2df45cb09b4a86c37a1bd1d3e3c423ca7034f9e78cbaeff545',
  '4b8fa1bc328098d277063e9458c6c3a65b06d154cbb826bb0d1d24b415fde7fb',
  '57cbe8c0e9bf2c72f5e910b0d89d2de0941e9f7e78f1116e54aef0c6fac5b358',
  '05210e4c79d0fa5f37e51a52f682cdb1a3e2e6970f2fd69dc6f30c2d2acb5f8a',
  'f22cc54c8891d173a444448550f1aad25fa9e73baed57335359ae279e17482c2',
  '78f2fcf95a6fc5aac442d616c89140f3fac99d6d6a67ab8618aeee41c73aa125',
  'dffdf0028d64bc5b8ccf779fe8ffc170abe35a81830f111cf48755410cc4ad04',
  'd267dba8c7743513928d5f7540cc0bd562244460fea583ca99beb59492f466f0',
  'd9ff7c5c2318ec243c57c91e88b5b0b8a78f229cc9ff8827abd6fdb1c9ea6505',
  '63145a6067a8f196823036e9dfd19970817dba782d393ca7b8d2fa98ee473e4b',
  'be5b43efc4a1d7fbb079e47055c0e151f3169968b876d19029f41c0219be5cc4',
  '6f3a07cc9290917a3d0fffbe114cb61ed57b69aeddc61f1a730fa272ceea715b',
  '10c03aaf83543fa7f818de0140533780c51d212d5f8b0c891e03f2243767b8e5',
  'da1d9e382029d01e50faadbabb0a3ecaf76456aa32d4e5ca559067d5f0d7cee2',
  'af13f8f3d9cff99d526a5dfb6a6e2c37b8489d037df360adbb42a35f11313781',
  'd683112f19185a7c438cce48f0d5360ca73cb50623704f3ea1abebf58449e593',
  '8e7ca390d2f5073593910aafafcc52fa02b5adcf08d3f0efdf5574db5d46d093',
  '619b0a12f9010d4ddebacc630cc6a6de40b964866fff4b56951d4f2241e57af8',
  '194603d070f31b0882479db3349ffd413e63769e1c9d863dd644f615672e5a28',
  '18fa4dc59c3c630c8094670487b4c5d829eb7f0a7ee11bef61d683ac509c4046',
  '0ee9344121a61e4597e2b7030d219046b67d2ff204c348b689effc219b74f2e9',
  '0af4e5524424970fb960abf2ff04489112901d73b17b966039513fc79bc83785',
  '5686b0f797ac80b742b3729388d47e1b922b6f146f152c95179162646f2a0e32',
  '15d5f79f5fe25ea411b4ba633feb53c7c42fef1c75a357bcc79720b91a978737',
  '33380ebbb1393069826158b5d5827d50e9ced9ab3fb871ada4f463694ce706f2',
  'acf135386e696ee6ae418ab37118a46df065e44be9488db183d2117e0728858f',
  'da62f7985a09fc00f195bf9b16118dc7d2b0cabcbb049f37e66bc94b692dd67e',
  'd8ebaf80dca12a83958f6e2b9926296e217a04cd3dd49037bc01b997372408d7',
  '5afa9d8d8128846962687ebf9b3282e5536f67f7f4544c822a325811d9798288',
  'ee8fc0b7eb0e4d7e82373c2823669e92c437626ca49de039ec213ee91afb2016',
  '5a67366245194dfe870881f729292b166630b1a6fe60cab0b1eeafd8859af7c5',
  'b4732086a78fb2c99411a1d576467874eaf4386f3c681130e53cf3ee6ca0b407',
  '05a5bfe6a93f5997b649c4973f3ce906fa0b5cbca617197ece880214aef88aaa',
  'a3d113cd83838023070a150b87750fe2559051edd82f2bf0f355273e2b6de2d2',
  '967b2afaf5a4ce1e5dfb674c67c6419e5a23c19792db10b6d8cad19ebd3416b0',
  'f6b0f8a221b4f702fda56f1a05107acfe238faff3e583f493fb18d694295ab47',
  '73b3cd54c6ba69e781222d6ad0a99273da471d4e06bb337f278a0d35c94a64e0',
  'a715e2a579eab28cc6973f1d91c99d6b6b3e2af09d0b68871199f15ce133297b',
  'ec64a42b7fb03d566a1261bcfef65c0b33886960440b8c4e463121dd0031687e',
  '101e21c4eb6b3fad6dafbc2006308b9bef01f8f6db003f3eccbd6f2da1ff504f',
  '73567012c5279db16e58ea0ed5be7900f87233c6564f8e3dab671b3bc77ff278',
  '1e827d1da46b15425f08ac176bdc501ba7d17c155a80f82f7c3b1485d515d2ea',
  '64a052a9c9ec58ab9a5f916b975f562c2f335824b5ca81aaf281d4f51ac8a31a',
  'd42faa69f105f42cb4d47d31dad8a546993c08edf56169f17eb657200d3a1544',
  'bed9c912e7e7f668386ee958860999e813eaf0dd55eebb065c1c0c3c3732ce17',
  '63423f994eeab8848e2e9eafdeaa48b1a20828d1f63348606117fd5375974fb8',
  '5dfb982ac5f4d2c8d8706fc23924f23db259a0b056acdc784efa070cb64a7cf9',
  'adf13dd64986233259a8e7fdcf564ab119ba25ea7f272606a56dab8d25b41df7',
  '8122beeec493536b76bb72ec94bd4906f1da511a623696f83507361b37bb8e93',
  'c1897ce4735b4a316967ca5d6973c37941f22c13043207f809ee96c7b7ad92e5',
  'fc2b08b3f64daedb191d00ded4a958743f5e37534997efc421a9a849e5074aea',
  '65711ee47863239b45873d4b1d3b8d8c19396fb65ee67ac0da5e2ea36bc95f7c',
  '55d796833059dd6a11e20f7440c7feef6b7a0366d696569d82ba15bb95fe0696',
  '4e559a4eaf48ac4abe5592638f020390bf4e6b680b19d4237caf6d41a2c491b0',
]

DeltaArray = [
  '120.37',
  '1.63',
  '61.39',
  '69.59',
  '35.20',
  '119.42',
  '32.42',
  '66.82',
  '0.39',
  '1.21',
  '52.57',
  '117.14',
  '24.45',
  '125.36',
  '26.55',
  '121.17',
  '114.67',
  '107.26',
  '129.30',
  '14.53',
  '79.48',
  '63.08',
  '15.97',
  '30.15',
  '19.97',
  '11.55',
  '24.02',
  '72.58',
  '11.66',
  '11.76',
  '18.58',
  '18.33',
  '111.33',
  '128.26',
  '18.18',
  '26.11',
  '25.82',
  '26.07',
  '64.09',
  '40.38',
  '15.11',
  '9.89', // '11.46',
  '0.54',
  '1.26',
  '0.44',
  '9.89',
  '9.86',
  '9.91',
  '10.04',
  '9.79',
  '20.74',
  '20.74',
  '20.72',
  '20.73',
  '20.73',
  '2.31',
  '2.50',
  '2.53',
  '2.60',
  '2.61',
  '4.41',
  '4.48',
  '4.37',
  '4.26',
  '4.37',
  '10.75',
  '10.68',
  '10.72',
  '10.64',
  '10.78',
  '28.15', // '30.24',
  '241.52', // '7.62',
  '220.97', // '7.63',
  '214.14', // '7.66',
  '242.53', // '7.58',
  '10.98', // '12.27',
  '82.83', // '12.13',
  '213.86', // '12.31',
  '186.09', // '12.27',
  '172', // '12.27',
  '121.04', // '17.23',
  '19.61', // '17.22',
  '59.61', // '17.11',
  '26.12', // '17.22',
  '41.53', // '17.19',
  '847.89', // '7.65',
  '488.85', // '7.70',
  '573.63', // '7.55',
  '615.96', // '7.56',
  '665.38', // '7.60',
  '879.83', //'12.24',
  '604.27', //'12.25',
  '335.51', // '12.22',
  '367.3', // '12.25',
  '186.73', // '12.10',
  '1171.32', // '17.20',
  '172.52', // '17.17',
  '186.11', // '17.23',
  '146.91', // '17.10',
  '172.01', // '17.10',
]

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
  console.log(' DELAY: ' + (date2 - date1) + '\tCODE: ' + statusCodeMsg)
  return response
}

async function testRarityPoosMining(testId, timeout, statusCode, baseUrl) {
  console.log('TEST STARTED ' + testId)
  let responceMiningTxs = await GetRequest('GET MINING TXs', 10000, 200, baseUrl)
  if (responceMiningTxs == 1) {
    return responceMiningTxs
  }
  let deltaTotal = 0
  let bauntyEstTotal = 0
  let bauntyActTotal = 0
  let TxTotal = 0

  let json = JSON.parse(responceMiningTxs.text)

  let responceRarityPools = ''
  // let actions = json.actions
  let actions = json.traces
  for (const value of actions) {
    // let key = json.actions.indexOf(value)

    if (value.act.account == 'notify.world') {
      let block_num = value.block_num

      responceRarityPools = await GetRequest(
        'GET RARITY POOLS BLOCK',
        10000,
        200,
        'https://waxnode.alienworlds.io/v2/history/get_deltas?code=m.federation&table=pools&scope=veles.world&block_num=' +
          block_num
      )
      if (responceMiningTxs == 1) {
        continue
      }
      let jsonRarityPools = JSON.parse(responceRarityPools.text)
      let pool_buckets = []
      try {
        pool_buckets = jsonRarityPools.deltas[0].data.pool_buckets
      } catch (err) {
        // console.log(err.msg)
        console.log(
          'ERROR: Invalid Rarity Pools block:\n' +
            'https://waxnode.alienworlds.io/v2/history/get_deltas?code=m.federation&table=pools&scope=veles.world&block_num=' +
            block_num
        )
        console.log(jsonRarityPools.deltas[0].data)
        continue
      }
      let miner = value.act.data.miner
      let landowner_share = value.act.data.landowner_share
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
            tool['RarityPool'] = Number(bucket.value.replace(' TLM', ''))
            break
          }
        }

        tool['Bounty'] = (tool['RarityPool'] * tool['Easy']) / 1000
        tool['Planet'] = planet_name.toString()
        bountyEst += tool['Bounty']
        toolBag.push(tool)
      })
      console.table(toolBag)
      let bountyAct = Number(value.act.data.bounty.replace(' TLM', ''))
      let delta = bountyEst - bountyAct
      deltaTotal += delta
      bauntyEstTotal += bountyEst
      bauntyActTotal += bountyAct
      TxTotal++
      console.log(
        'delta =',
        bountyEst,
        ' - ',
        bountyAct,
        ' = ',
        delta,
        ' (',
        Math.round((delta / bountyEst) * 100 * 100) / 100,
        '%)'
      )
    }
  }

  console.log('deltaTotal = ', deltaTotal)
  console.log(
    'deltaTotal =',
    bauntyEstTotal,
    ' - ',
    bauntyActTotal,
    ' = ',
    deltaTotal,
    ' (',
    (deltaAct = Math.round((deltaTotal / bauntyEstTotal) * 100 * 100) / 100),
    '%)'
  )
  console.log('TxTotal ' + TxTotal)
  console.log('TEST FINISHED ' + testId)
  return deltaAct
  //   await sendMessage(OAUTH_TOKEN, CHANNEL, 'TEST FINISHED 0004');
}

async function main() {
  for (const Tx of TxArray) {
    let i = TxArray.indexOf(Tx)
    let deltaAct = ''
    deltaAct = await testRarityPoosMining(
      '0001',
      10000,
      200,
      //  'https://waxnode.alienworlds.io/v2/history/get_actions?account=m.federation&skip=0&limit=200'
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
