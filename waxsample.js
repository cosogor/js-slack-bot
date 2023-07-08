/*
raintrainwax
EOS56UTWgnjG6r5Bk8yxQjvNKarGHWCvN2iYYs6rAQ3cm3fVzBfG4
PVT_K1_DEZn8zQmetDMBSJd2UzAYw5dqT6t3cbQTVo1M6H4GSU4X1yKS
 */

const { Api, JsonRpc } = require('eosjs')
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig') // development only

const fetch = require('node-fetch') //node only
const { TextDecoder, TextEncoder } = require('util') //node only

const privateKey = 'PVT_K1_DEZn8zQmetDMBSJd2UzAYw5dqT6t3cbQTVo1M6H4GSU4X1yKS'
const signatureProvider = new JsSignatureProvider([privateKey])

const rpc = new JsonRpc('https://wax.greymass.com', { fetch }) //required to read blockchain state
const api = new Api({
  rpc,
  signatureProvider,
  textDecoder: new TextDecoder(),
  textEncoder: new TextEncoder(),
}) //required to submit transactions

var resp = rpc.get_block(1)

const waxjs = require('@waxio/waxjs/dist')
const wax = new waxjs.WaxJS({
  rpcEndpoint: 'https://wax.greymass.com',
  userAccount: '3m1q4.wam',
  pubKeys: [
    'EOS6rjGKGYPBmVGsDDFAbM6UT5wQ9szB9m2fEcqHFMMcPge983xz9',
    'EOS7wTCoctybwrQWuE2tWYGwdLEGRXE9rrzALeBLUhWfbHXysFr9W',
  ],
})

/*
Импортируем библиотеку WaxJS с помощью команды require("@wax/waxjs").
Создаем экземпляр WaxJS, указывая адрес ноды для подключения. В данном примере мы используем ноду https://wax.greymass.com.
Устанавливаем приватный ключ, который будет использоваться для авторизации.
Получаем публичный ключ из приватного ключа с помощью метода ecc.privateToPublic.
Авторизуемся в сети WAX, передавая приватный и публичный ключи с помощью метода authenticate.
Создаем объект data, который будет содержать данные для отправки в контракт.
Определяем параметры для отправки транзакции в объекте params. Мы указываем имя контракта, имя действия, аккаунт, от имени которого будет отправлена транзакция, и данные для отправки в контракт.
Отправляем транзакцию с помощью метода api.transact. Мы передаем в него параметры, которые мы определили ранее в объекте params. Если тран

Приватный ключ для WaxJS можно получить с помощью кошельков, поддерживающих сеть WAX, например,
WAX Cloud Wallet или Anchor Wallet.

WAX Cloud Wallet:
Откройте WAX Cloud Wallet и войдите в свой аккаунт.
Выберите вкладку "Мой профиль".
Нажмите кнопку "Приватный ключ" рядом с вашим аккаунтом, чтобы скопировать ваш приватный ключ в буфер обмена.
Anchor Wallet:

Откройте Anchor Wallet и войдите в свой аккаунт.
Нажмите на кнопку "More" в правом верхнем углу.
Выберите "Export Private Key".
Введите пароль для вашего кошелька и нажмите кнопку "Decrypt".
Копируйте ваш приватный ключ.
Если у вас уже есть приватный ключ, вы можете использовать его для авторизации в WaxJS. Чтобы это сделать, вам нужно использовать метод authenticate и передать в него ваш приватный ключ. Вот пример:

const wax = require("@wax/waxjs");
const waxjs = new wax.WaxJS("https://wax.greymass.com", null, null, false);
const privateKey = "ВАШ ПРИВАТНЫЙ КЛЮЧ";
waxjs.authenticate(privateKey);
// теперь вы можете использовать waxjs для отправки транзакций и других действий
Обратите внимание, что приватный ключ - это секретная информация, которую необходимо хранить в безопасности. Никогда не передавайте свой приватный ключ кому-либо и не храните его в открытом виде.



import * as waxjs from "@waxio/waxjs/dist";
// мпортируем библиотеку WaxJS
const wax = require('@waxio/waxjs')

const wax = new waxjs.WaxJS({
  rpcEndpoint: 'https://wax.greymass.com',
  userAccount: '3m1q4.wam',
  pubKeys: ['EOS6rjGKGYPBmVGsDDFAbM6UT5wQ9szB9m2fEcqHFMMcPge983xz9','EOS7wTCoctybwrQWuE2tWYGwdLEGRXE9rrzALeBLUhWfbHXysFr9W']
});

// Создаем экземпляр WaxJS и указываем адрес ноды для подключения
const waxjs = new wax.WaxJS('https://wax.greymass.com', null, null, false)

// Устанавливаем приватный ключ, который будет использоваться для авторизации
const privateKey = 'PUB_K1_88teJHjYESZFKigGvQgsXcBMbg9LrNWdgEe2XAAcW2rioKxzzN'

// Получаем публичный ключ из приватного ключа
const publicKey = waxjs.eosjs().ecc.privateToPublic(privateKey)

// Авторизуемся, передавая приватный и публичный ключи
waxjs.authenticate(privateKey, privateKey, [publicKey])

// Создаем объект, который будет содержать данные для отправки в контракт
const data = {
  receiver: 'yciky.c.wam',
  message: 'Hello, WaxJS!',
}

// Определяем параметры для отправки транзакции
const params = {
  actions: [
    {
      account: 'm.federation',
      name: 'claimmines',
      authorization: [
        {
          actor: 'raintrainwax',
          permission: 'active',
        },
      ],
      data: data,
    },
  ],
  blocksBehind: 3,
  expireSeconds: 30,
}

// Отправляем транзакцию с помощью метода api.transact
waxjs.api
  .transact(params)
  .then((result) => {
    console.log('Transaction broadcasted!')
    console.log(result)
  })
  .catch((error) => {
    console.error(error)
  })
 */
