// tool explorer by tool id https://wax.atomichub.io/explorer?search=1099523891477
// tx explorer https://waxblock.io/transaction/5fc32b353421cd5568be08afbc6f59862121e1076f780c9c4ebb2da1efe36053
// tx https://wax.greymass.com/v1/history/get_transaction?id=3eea81458a37fbefdb813c80bc76b14a9b682003a8894f032f5d1e853e6a90cf
// тут ищем последнюю транзакцию майнера https://waxblock.io/account/m.federation?code=m.federation&scope=m.federation&table=miners&lower_bound=yciky.c.wam&upper_bound=yciky.c.wam&limit=100#contract-tables
// по номеру Тх находим нужную Тх для калькуляции баунти https://waxblock.io/transaction/badb33a08eb439ace335ae9f75c160b83c48cb2196afcddf3b0e97a69bfcd143
async function main() {
  const axios = require('axios')

  const accountName = 'm.federation'
  const afterDate = '2023-04-17T14:40:00Z'
  //const beforeDate = '2023-04-17T14:41:00Z'
  const beforeDate = new Date().toISOString()
  const limit = 1000
  let skip = 0
  let transactions = []

  async function getTransactions() {
    while (true) {
      const url = `https://waxnode.alienworlds.io/v2/history/get_actions?account=${accountName}&skip=${skip}&limit=${limit}&after=${afterDate}&before=${beforeDate}`
      const response = await axios.get(url)
      const json_data = response.data
      transactions = transactions.concat(json_data.actions)
      if (json_data.actions.length < limit) {
        break
      }
      skip += limit
    }
    console.log(`Total transactions: ${transactions.length}`)
  }

  getTransactions()
}

main()
