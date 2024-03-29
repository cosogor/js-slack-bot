// Kanth lakshmi
// the configured was:
//     JSON
// https://ipfs.io/ipfs/QmWuzETbQwb43kibxTZEUrTbiH4inGzSN9ECBtN16XnbRf
//     image in JSON:
// https://ipfs.io/ipfs/QmaQhWW5CQ2Zau8AwoZLNGFV7mDg1tzUQJ5Mup59jiTd1X

console.log('TEST!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
const request = require('supertest')
const fs = require('fs')
const path = require('path')
const webdriver = require('selenium-webdriver')
require('chromedriver')
const { sendMessage } = require('./slackr')

// test for test fail
// test("Error check", () => {
//     expect(0.1 * 0.2 ).toBe(0.02);
// });

let errors = 0
let missionsJsonFile = 'missionsJson.json'
let actualResultNFTDirectory = '_ActualResult'
let estimatedResultNFTDirectory = '_EstimatedResult'
const missionsURL =
  'https://missions-api.alienworlds.io/missions?page%5Blimit%5D=100&page%5Bnumber%5D=0&page%5Border%5D=desc'

let missionsJson =
  '{"data":[{"id":"1214","type":"mission","attributes":{"boardingTime":1661333359,"description":"Leaders are always a target - Transport a Federation admiral securely to the new planet government space station","duration":1209600,"endTime":1662564559,"launchTime":1661354959,"missionPower":-3579580598726950912,"missionType":5,"name":"Install the Admiral","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmWuzETbQwb43kibxTZEUrTbiH4inGzSN9ECBtN16XnbRf","reward":180000000,"spaceshipCost":2000000,"totalShips":4062}},{"id":"1213","type":"mission","attributes":{"boardingTime":1661322942,"description":"Important keys have been stolen by rebel forces. Recover a ledger device from a rebel stronghold without anyone realising","duration":604800,"endTime":1661942142,"launchTime":1661337342,"missionPower":-4592590886424018944,"missionType":8,"name":"Retrieve Ledger","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmPPZwSYjGgJKD3zARGTLUVCshdjSBj1mVBuRfodTwvSat","reward":150000000,"spaceshipCost":400000,"totalShips":49324}},{"id":"1212","type":"mission","attributes":{"boardingTime":1661279316,"description":"Space is scary enough even without the unpredictable melting pot of interspecies quarrels. Negotiate with a Alien Terrorist intent on blowing themselves up in a Space station.","duration":1209600,"endTime":1662510516,"launchTime":1661300916,"missionPower":-7651186002140069888,"missionType":3,"name":"The Negotiator","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmbsHuZH1Cgsppfr7WPArcujWkUrqDfsKywRRNTfH7VcXg","reward":200000000,"spaceshipCost":2000000,"totalShips":9713}},{"id":"1211","type":"mission","attributes":{"boardingTime":1661259214,"description":"A breakaway group of Reptilians have set up a rogue cell in a uncharted region. Examine the situation and make sure the Reptilian Diplomat is guarded on their mission of peace","duration":604800,"endTime":1661878414,"launchTime":1661273614,"missionPower":-7901034114885615616,"missionType":1,"name":"Reptilian Peace","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmaX32NUecni5qEPPCfoT1iQQHRdm7XMEKRHR8hNSM2dMK","reward":130000000,"spaceshipCost":400000,"totalShips":36464}},{"id":"1210","type":"mission","attributes":{"boardingTime":1661240131,"description":"Important keys have been stolen by rebel forces. Recover a ledger device from a rebel stronghold without anyone realising","duration":604800,"endTime":1661859331,"launchTime":1661254531,"missionPower":8941280076012453888,"missionType":8,"name":"Retrieve Ledger","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmPPZwSYjGgJKD3zARGTLUVCshdjSBj1mVBuRfodTwvSat","reward":150000000,"spaceshipCost":400000,"totalShips":41758}},{"id":"1209","type":"mission","attributes":{"boardingTime":1661234929,"description":"Another Liberation celebration event - Provide additional security to the ceremonial opening of the interplanetary space hub orbiting the planet","duration":2419200,"endTime":1663682929,"launchTime":1661263729,"missionPower":4321103124539375616,"missionType":7,"name":"Space Hub Opening","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmP43h1pgZUNgqKaQdznfTdnvExsBu9CXZVcptisu6Z2QB","reward":600000000,"spaceshipCost":10000000,"totalShips":1229}},{"id":"1208","type":"mission","attributes":{"boardingTime":1661185198,"description":"Brave adventurers are among the first to set up home on a newly discovered planet - Transport 10000 colonists to the new planet","duration":7257600,"endTime":1668485998,"launchTime":1661228398,"missionPower":9162760480865910784,"missionType":5,"name":"New Start","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"Qme2VkoTSrZfSbjaJxmQLFKUHrpUuhoFQ4F92YAU9vq69t","reward":750000000,"spaceshipCost":50000000,"totalShips":177}},{"id":"1207","type":"mission","attributes":{"boardingTime":1661162005,"description":"A breakaway group of Reptilians have set up a rogue cell in a uncharted region. Examine the situation and make sure the Reptilian Diplomat is guarded on their mission of peace","duration":604800,"endTime":1661781205,"launchTime":1661176405,"missionPower":1974746417893212160,"missionType":1,"name":"Reptilian Peace","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmaX32NUecni5qEPPCfoT1iQQHRdm7XMEKRHR8hNSM2dMK","reward":130000000,"spaceshipCost":400000,"totalShips":40037}},{"id":"1206","type":"mission","attributes":{"boardingTime":1661157321,"description":"Important keys have been stolen by rebel forces. Recover a ledger device from a rebel stronghold without anyone realising","duration":604800,"endTime":1661776521,"launchTime":1661171721,"missionPower":-3950813542659129344,"missionType":8,"name":"Retrieve Ledger","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmPPZwSYjGgJKD3zARGTLUVCshdjSBj1mVBuRfodTwvSat","reward":150000000,"spaceshipCost":400000,"totalShips":46689}},{"id":"1205","type":"mission","attributes":{"boardingTime":1661153349,"description":"Leaders are always a target - Transport a Federation admiral securely to the new planet government space station","duration":1209600,"endTime":1662384549,"launchTime":1661174949,"missionPower":3294259374515552256,"missionType":5,"name":"Install the Admiral","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmWuzETbQwb43kibxTZEUrTbiH4inGzSN9ECBtN16XnbRf","reward":180000000,"spaceshipCost":2000000,"totalShips":5445}},{"id":"1204","type":"mission","attributes":{"boardingTime":1661131362,"description":"The eternal battle continues and Reptilians and Greys are fighting over Trilium, send in your peacekeeper droids","duration":2419200,"endTime":1663579362,"launchTime":1661160162,"missionPower":-6895263996769730560,"missionType":2,"name":"Peacekeepers","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmREjwMToyDHxx87C1CN9U1JEFLVCcnkpufFsgFQMTTbtm","reward":300000000,"spaceshipCost":10000000,"totalShips":1723}},{"id":"1203","type":"mission","attributes":{"boardingTime":1661081304,"description":"Space is scary enough even without the unpredictable melting pot of interspecies quarrels. Negotiate with a Alien Terrorist intent on blowing themselves up in a Space station.","duration":1209600,"endTime":1662312504,"launchTime":1661102904,"missionPower":7201766665695002624,"missionType":3,"name":"The Negotiator","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmbsHuZH1Cgsppfr7WPArcujWkUrqDfsKywRRNTfH7VcXg","reward":200000000,"spaceshipCost":2000000,"totalShips":8947}},{"id":"1202","type":"mission","attributes":{"boardingTime":1661074512,"description":"Important keys have been stolen by rebel forces. Recover a ledger device from a rebel stronghold without anyone realising","duration":604800,"endTime":1661693712,"launchTime":1661088912,"missionPower":3165607420546252800,"missionType":8,"name":"Retrieve Ledger","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmPPZwSYjGgJKD3zARGTLUVCshdjSBj1mVBuRfodTwvSat","reward":150000000,"spaceshipCost":400000,"totalShips":34429}},{"id":"1201","type":"mission","attributes":{"boardingTime":1661064795,"description":"A breakaway group of Reptilians have set up a rogue cell in a uncharted region. Examine the situation and make sure the Reptilian Diplomat is guarded on their mission of peace","duration":604800,"endTime":1661683995,"launchTime":1661079195,"missionPower":-5184306966754754560,"missionType":1,"name":"Reptilian Peace","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmaX32NUecni5qEPPCfoT1iQQHRdm7XMEKRHR8hNSM2dMK","reward":130000000,"spaceshipCost":400000,"totalShips":37813}},{"id":"1200","type":"mission","attributes":{"boardingTime":1660991703,"description":"Important keys have been stolen by rebel forces. Recover a ledger device from a rebel stronghold without anyone realising","duration":604800,"endTime":1661610903,"launchTime":1661006103,"missionPower":-7366349935555379200,"missionType":8,"name":"Retrieve Ledger","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmPPZwSYjGgJKD3zARGTLUVCshdjSBj1mVBuRfodTwvSat","reward":150000000,"spaceshipCost":400000,"totalShips":46772}},{"id":"1199","type":"mission","attributes":{"boardingTime":1660975717,"description":"Another Liberation celebration event - Provide additional security to the ceremonial opening of the interplanetary space hub orbiting the planet","duration":2419200,"endTime":1663423717,"launchTime":1661004517,"missionPower":4934324088001789952,"missionType":7,"name":"Space Hub Opening","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmP43h1pgZUNgqKaQdznfTdnvExsBu9CXZVcptisu6Z2QB","reward":600000000,"spaceshipCost":10000000,"totalShips":1873}},{"id":"1198","type":"mission","attributes":{"boardingTime":1660973339,"description":"Leaders are always a target - Transport a Federation admiral securely to the new planet government space station","duration":1209600,"endTime":1662204539,"launchTime":1660994939,"missionPower":1112297265319378944,"missionType":5,"name":"Install the Admiral","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmWuzETbQwb43kibxTZEUrTbiH4inGzSN9ECBtN16XnbRf","reward":180000000,"spaceshipCost":2000000,"totalShips":6643}},{"id":"1197","type":"mission","attributes":{"boardingTime":1660967585,"description":"A breakaway group of Reptilians have set up a rogue cell in a uncharted region. Examine the situation and make sure the Reptilian Diplomat is guarded on their mission of peace","duration":604800,"endTime":1661586785,"launchTime":1660981985,"missionPower":719694204262940672,"missionType":1,"name":"Reptilian Peace","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmaX32NUecni5qEPPCfoT1iQQHRdm7XMEKRHR8hNSM2dMK","reward":130000000,"spaceshipCost":400000,"totalShips":47202}},{"id":"1196","type":"mission","attributes":{"boardingTime":1660908894,"description":"Important keys have been stolen by rebel forces. Recover a ledger device from a rebel stronghold without anyone realising","duration":604800,"endTime":1661528094,"launchTime":1660923294,"missionPower":5775295310645428224,"missionType":8,"name":"Retrieve Ledger","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmPPZwSYjGgJKD3zARGTLUVCshdjSBj1mVBuRfodTwvSat","reward":150000000,"spaceshipCost":400000,"totalShips":43547}},{"id":"1195","type":"mission","attributes":{"boardingTime":1660883293,"description":"Space is scary enough even without the unpredictable melting pot of interspecies quarrels. Negotiate with a Alien Terrorist intent on blowing themselves up in a Space station.","duration":1209600,"endTime":1662114493,"launchTime":1660904893,"missionPower":-627566536617361408,"missionType":3,"name":"The Negotiator","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmbsHuZH1Cgsppfr7WPArcujWkUrqDfsKywRRNTfH7VcXg","reward":200000000,"spaceshipCost":2000000,"totalShips":7463}},{"id":"1194","type":"mission","attributes":{"boardingTime":1660870375,"description":"A breakaway group of Reptilians have set up a rogue cell in a uncharted region. Examine the situation and make sure the Reptilian Diplomat is guarded on their mission of peace","duration":604800,"endTime":1661489575,"launchTime":1660884775,"missionPower":-8820973372885172224,"missionType":1,"name":"Reptilian Peace","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmaX32NUecni5qEPPCfoT1iQQHRdm7XMEKRHR8hNSM2dMK","reward":130000000,"spaceshipCost":400000,"totalShips":45846}},{"id":"1193","type":"mission","attributes":{"boardingTime":1660826087,"description":"Important keys have been stolen by rebel forces. Recover a ledger device from a rebel stronghold without anyone realising","duration":604800,"endTime":1661445287,"launchTime":1660840487,"missionPower":4620096091868626944,"missionType":8,"name":"Retrieve Ledger","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmPPZwSYjGgJKD3zARGTLUVCshdjSBj1mVBuRfodTwvSat","reward":150000000,"spaceshipCost":400000,"totalShips":48290}},{"id":"1192","type":"mission","attributes":{"boardingTime":1660825350,"description":"The eternal battle continues and Reptilians and Greys are fighting over Trilium, send in your peacekeeper droids","duration":2419200,"endTime":1663273350,"launchTime":1660854150,"missionPower":-7722401757086613504,"missionType":2,"name":"Peacekeepers","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmREjwMToyDHxx87C1CN9U1JEFLVCcnkpufFsgFQMTTbtm","reward":300000000,"spaceshipCost":10000000,"totalShips":1095}},{"id":"1191","type":"mission","attributes":{"boardingTime":1660793330,"description":"Leaders are always a target - Transport a Federation admiral securely to the new planet government space station","duration":1209600,"endTime":1662024530,"launchTime":1660814930,"missionPower":848453971038175232,"missionType":5,"name":"Install the Admiral","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmWuzETbQwb43kibxTZEUrTbiH4inGzSN9ECBtN16XnbRf","reward":180000000,"spaceshipCost":2000000,"totalShips":7870}},{"id":"1190","type":"mission","attributes":{"boardingTime":1660789180,"description":"The Delta Solaris star has recorded unusual activity - A huge solar flare is expected to hit the planet - position a deflector shield to prevent damage to mining rigs","duration":7257600,"endTime":1668089980,"launchTime":1660832380,"missionPower":1910986458139721728,"missionType":6,"name":"Solar Flare","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmSN6B2oDTXDMektfBsNGrFC2n9Kzby8hxBgUi8ZuRV6B6","reward":750000000,"spaceshipCost":50000000,"totalShips":202}},{"id":"1189","type":"mission","attributes":{"boardingTime":1660773166,"description":"A breakaway group of Reptilians have set up a rogue cell in a uncharted region. Examine the situation and make sure the Reptilian Diplomat is guarded on their mission of peace","duration":604800,"endTime":1661392366,"launchTime":1660787566,"missionPower":8841427081158983680,"missionType":1,"name":"Reptilian Peace","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmaX32NUecni5qEPPCfoT1iQQHRdm7XMEKRHR8hNSM2dMK","reward":130000000,"spaceshipCost":400000,"totalShips":44180}},{"id":"1188","type":"mission","attributes":{"boardingTime":1660743278,"description":"Important keys have been stolen by rebel forces. Recover a ledger device from a rebel stronghold without anyone realising","duration":604800,"endTime":1661362478,"launchTime":1660757678,"missionPower":-4613987956749762560,"missionType":8,"name":"Retrieve Ledger","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmPPZwSYjGgJKD3zARGTLUVCshdjSBj1mVBuRfodTwvSat","reward":150000000,"spaceshipCost":400000,"totalShips":49843}},{"id":"1187","type":"mission","attributes":{"boardingTime":1660716505,"description":"Another Liberation celebration event - Provide additional security to the ceremonial opening of the interplanetary space hub orbiting the planet","duration":2419200,"endTime":1663164505,"launchTime":1660745305,"missionPower":5882684960296402944,"missionType":7,"name":"Space Hub Opening","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmP43h1pgZUNgqKaQdznfTdnvExsBu9CXZVcptisu6Z2QB","reward":600000000,"spaceshipCost":10000000,"totalShips":2147}},{"id":"1186","type":"mission","attributes":{"boardingTime":1660685283,"description":"Space is scary enough even without the unpredictable melting pot of interspecies quarrels. Negotiate with a Alien Terrorist intent on blowing themselves up in a Space station.","duration":1209600,"endTime":1661916483,"launchTime":1660706883,"missionPower":-1026870703225307136,"missionType":3,"name":"The Negotiator","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmbsHuZH1Cgsppfr7WPArcujWkUrqDfsKywRRNTfH7VcXg","reward":200000000,"spaceshipCost":2000000,"totalShips":6803}},{"id":"1185","type":"mission","attributes":{"boardingTime":1660675958,"description":"A breakaway group of Reptilians have set up a rogue cell in a uncharted region. Examine the situation and make sure the Reptilian Diplomat is guarded on their mission of peace","duration":604800,"endTime":1661295158,"launchTime":1660690358,"missionPower":106554100404977664,"missionType":1,"name":"Reptilian Peace","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmaX32NUecni5qEPPCfoT1iQQHRdm7XMEKRHR8hNSM2dMK","reward":130000000,"spaceshipCost":400000,"totalShips":38797}},{"id":"1184","type":"mission","attributes":{"boardingTime":1660660467,"description":"Important keys have been stolen by rebel forces. Recover a ledger device from a rebel stronghold without anyone realising","duration":604800,"endTime":1661279667,"launchTime":1660674867,"missionPower":4056774672631463936,"missionType":8,"name":"Retrieve Ledger","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmPPZwSYjGgJKD3zARGTLUVCshdjSBj1mVBuRfodTwvSat","reward":150000000,"spaceshipCost":400000,"totalShips":49022}},{"id":"1183","type":"mission","attributes":{"boardingTime":1660613321,"description":"Leaders are always a target - Transport a Federation admiral securely to the new planet government space station","duration":1209600,"endTime":1661844521,"launchTime":1660634921,"missionPower":6146474348174639104,"missionType":5,"name":"Install the Admiral","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmWuzETbQwb43kibxTZEUrTbiH4inGzSN9ECBtN16XnbRf","reward":180000000,"spaceshipCost":2000000,"totalShips":6094}},{"id":"1182","type":"mission","attributes":{"boardingTime":1660578748,"description":"A breakaway group of Reptilians have set up a rogue cell in a uncharted region. Examine the situation and make sure the Reptilian Diplomat is guarded on their mission of peace","duration":604800,"endTime":1661197948,"launchTime":1660593148,"missionPower":2181503904770949120,"missionType":1,"name":"Reptilian Peace","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmaX32NUecni5qEPPCfoT1iQQHRdm7XMEKRHR8hNSM2dMK","reward":130000000,"spaceshipCost":400000,"totalShips":42781}},{"id":"1181","type":"mission","attributes":{"boardingTime":1660577656,"description":"Important keys have been stolen by rebel forces. Recover a ledger device from a rebel stronghold without anyone realising","duration":604800,"endTime":1661196856,"launchTime":1660592056,"missionPower":-2752847136432324608,"missionType":8,"name":"Retrieve Ledger","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmPPZwSYjGgJKD3zARGTLUVCshdjSBj1mVBuRfodTwvSat","reward":150000000,"spaceshipCost":400000,"totalShips":43495}},{"id":"1180","type":"mission","attributes":{"boardingTime":1660519338,"description":"The eternal battle continues and Reptilians and Greys are fighting over Trilium, send in your peacekeeper droids","duration":2419200,"endTime":1662967338,"launchTime":1660548138,"missionPower":8784826431382224896,"missionType":2,"name":"Peacekeepers","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmREjwMToyDHxx87C1CN9U1JEFLVCcnkpufFsgFQMTTbtm","reward":300000000,"spaceshipCost":10000000,"totalShips":1585}},{"id":"1179","type":"mission","attributes":{"boardingTime":1660494848,"description":"Important keys have been stolen by rebel forces. Recover a ledger device from a rebel stronghold without anyone realising","duration":604800,"endTime":1661114048,"launchTime":1660509248,"missionPower":1775148240992206848,"missionType":8,"name":"Retrieve Ledger","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmPPZwSYjGgJKD3zARGTLUVCshdjSBj1mVBuRfodTwvSat","reward":150000000,"spaceshipCost":400000,"totalShips":34533}},{"id":"1178","type":"mission","attributes":{"boardingTime":1660487273,"description":"Space is scary enough even without the unpredictable melting pot of interspecies quarrels. Negotiate with a Alien Terrorist intent on blowing themselves up in a Space station.","duration":1209600,"endTime":1661718473,"launchTime":1660508873,"missionPower":7643891926155919360,"missionType":3,"name":"The Negotiator","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmbsHuZH1Cgsppfr7WPArcujWkUrqDfsKywRRNTfH7VcXg","reward":200000000,"spaceshipCost":2000000,"totalShips":5982}},{"id":"1177","type":"mission","attributes":{"boardingTime":1660481537,"description":"A breakaway group of Reptilians have set up a rogue cell in a uncharted region. Examine the situation and make sure the Reptilian Diplomat is guarded on their mission of peace","duration":604800,"endTime":1661100737,"launchTime":1660495937,"missionPower":-4685149805293338624,"missionType":1,"name":"Reptilian Peace","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmaX32NUecni5qEPPCfoT1iQQHRdm7XMEKRHR8hNSM2dMK","reward":130000000,"spaceshipCost":400000,"totalShips":36051}},{"id":"1176","type":"mission","attributes":{"boardingTime":1660457294,"description":"Another Liberation celebration event - Provide additional security to the ceremonial opening of the interplanetary space hub orbiting the planet","duration":2419200,"endTime":1662905294,"launchTime":1660486094,"missionPower":-627512630214393856,"missionType":7,"name":"Space Hub Opening","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmP43h1pgZUNgqKaQdznfTdnvExsBu9CXZVcptisu6Z2QB","reward":600000000,"spaceshipCost":10000000,"totalShips":2289}},{"id":"1175","type":"mission","attributes":{"boardingTime":1660433309,"description":"Leaders are always a target - Transport a Federation admiral securely to the new planet government space station","duration":1209600,"endTime":1661664509,"launchTime":1660454909,"missionPower":3707828254673993728,"missionType":5,"name":"Install the Admiral","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmWuzETbQwb43kibxTZEUrTbiH4inGzSN9ECBtN16XnbRf","reward":180000000,"spaceshipCost":2000000,"totalShips":5759}},{"id":"1174","type":"mission","attributes":{"boardingTime":1660429188,"description":"Brave adventurers are among the first to set up home on a newly discovered planet - Transport 10000 colonists to the new planet","duration":7257600,"endTime":1667729988,"launchTime":1660472388,"missionPower":6602891275387535360,"missionType":5,"name":"New Start","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"Qme2VkoTSrZfSbjaJxmQLFKUHrpUuhoFQ4F92YAU9vq69t","reward":750000000,"spaceshipCost":50000000,"totalShips":196}},{"id":"1173","type":"mission","attributes":{"boardingTime":1660412037,"description":"Important keys have been stolen by rebel forces. Recover a ledger device from a rebel stronghold without anyone realising","duration":604800,"endTime":1661031237,"launchTime":1660426437,"missionPower":5354513214107287552,"missionType":8,"name":"Retrieve Ledger","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmPPZwSYjGgJKD3zARGTLUVCshdjSBj1mVBuRfodTwvSat","reward":150000000,"spaceshipCost":400000,"totalShips":51167}},{"id":"1172","type":"mission","attributes":{"boardingTime":1660384326,"description":"A breakaway group of Reptilians have set up a rogue cell in a uncharted region. Examine the situation and make sure the Reptilian Diplomat is guarded on their mission of peace","duration":604800,"endTime":1661003526,"launchTime":1660398726,"missionPower":6538241859985080320,"missionType":1,"name":"Reptilian Peace","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmaX32NUecni5qEPPCfoT1iQQHRdm7XMEKRHR8hNSM2dMK","reward":130000000,"spaceshipCost":400000,"totalShips":45732}},{"id":"1171","type":"mission","attributes":{"boardingTime":1660329227,"description":"Important keys have been stolen by rebel forces. Recover a ledger device from a rebel stronghold without anyone realising","duration":604800,"endTime":1660948427,"launchTime":1660343627,"missionPower":6131832289803370496,"missionType":8,"name":"Retrieve Ledger","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmPPZwSYjGgJKD3zARGTLUVCshdjSBj1mVBuRfodTwvSat","reward":150000000,"spaceshipCost":400000,"totalShips":42658}},{"id":"1170","type":"mission","attributes":{"boardingTime":1660289261,"description":"Space is scary enough even without the unpredictable melting pot of interspecies quarrels. Negotiate with a Alien Terrorist intent on blowing themselves up in a Space station.","duration":1209600,"endTime":1661520461,"launchTime":1660310861,"missionPower":3329894205190307840,"missionType":3,"name":"The Negotiator","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmbsHuZH1Cgsppfr7WPArcujWkUrqDfsKywRRNTfH7VcXg","reward":200000000,"spaceshipCost":2000000,"totalShips":7167}},{"id":"1169","type":"mission","attributes":{"boardingTime":1660287114,"description":"A breakaway group of Reptilians have set up a rogue cell in a uncharted region. Examine the situation and make sure the Reptilian Diplomat is guarded on their mission of peace","duration":604800,"endTime":1660906314,"launchTime":1660301514,"missionPower":-3223447917591265280,"missionType":1,"name":"Reptilian Peace","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmaX32NUecni5qEPPCfoT1iQQHRdm7XMEKRHR8hNSM2dMK","reward":130000000,"spaceshipCost":400000,"totalShips":41978}},{"id":"1168","type":"mission","attributes":{"boardingTime":1660253299,"description":"Leaders are always a target - Transport a Federation admiral securely to the new planet government space station","duration":1209600,"endTime":1661484499,"launchTime":1660274899,"missionPower":648801887734202368,"missionType":5,"name":"Install the Admiral","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmWuzETbQwb43kibxTZEUrTbiH4inGzSN9ECBtN16XnbRf","reward":180000000,"spaceshipCost":2000000,"totalShips":7540}},{"id":"1167","type":"mission","attributes":{"boardingTime":1660246416,"description":"Important keys have been stolen by rebel forces. Recover a ledger device from a rebel stronghold without anyone realising","duration":604800,"endTime":1660865616,"launchTime":1660260816,"missionPower":-3059538477767983104,"missionType":8,"name":"Retrieve Ledger","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmPPZwSYjGgJKD3zARGTLUVCshdjSBj1mVBuRfodTwvSat","reward":150000000,"spaceshipCost":400000,"totalShips":50934}},{"id":"1166","type":"mission","attributes":{"boardingTime":1660213327,"description":"The eternal battle continues and Reptilians and Greys are fighting over Trilium, send in your peacekeeper droids","duration":2419200,"endTime":1662661327,"launchTime":1660242127,"missionPower":2816553189782847488,"missionType":2,"name":"Peacekeepers","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmREjwMToyDHxx87C1CN9U1JEFLVCcnkpufFsgFQMTTbtm","reward":300000000,"spaceshipCost":10000000,"totalShips":1514}},{"id":"1165","type":"mission","attributes":{"boardingTime":1660198083,"description":"Another Liberation celebration event - Provide additional security to the ceremonial opening of the interplanetary space hub orbiting the planet","duration":2419200,"endTime":1662646083,"launchTime":1660226883,"missionPower":3108898957963558912,"missionType":7,"name":"Space Hub Opening","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmP43h1pgZUNgqKaQdznfTdnvExsBu9CXZVcptisu6Z2QB","reward":600000000,"spaceshipCost":10000000,"totalShips":2182}},{"id":"1164","type":"mission","attributes":{"boardingTime":1660189902,"description":"A breakaway group of Reptilians have set up a rogue cell in a uncharted region. Examine the situation and make sure the Reptilian Diplomat is guarded on their mission of peace","duration":604800,"endTime":1660809102,"launchTime":1660204302,"missionPower":249012563499548672,"missionType":1,"name":"Reptilian Peace","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmaX32NUecni5qEPPCfoT1iQQHRdm7XMEKRHR8hNSM2dMK","reward":130000000,"spaceshipCost":400000,"totalShips":53446}},{"id":"1163","type":"mission","attributes":{"boardingTime":1660163605,"description":"Important keys have been stolen by rebel forces. Recover a ledger device from a rebel stronghold without anyone realising","duration":604800,"endTime":1660782805,"launchTime":1660178005,"missionPower":-2046959441294655488,"missionType":8,"name":"Retrieve Ledger","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmPPZwSYjGgJKD3zARGTLUVCshdjSBj1mVBuRfodTwvSat","reward":150000000,"spaceshipCost":400000,"totalShips":47064}},{"id":"1162","type":"mission","attributes":{"boardingTime":1660092690,"description":"A breakaway group of Reptilians have set up a rogue cell in a uncharted region. Examine the situation and make sure the Reptilian Diplomat is guarded on their mission of peace","duration":604800,"endTime":1660711890,"launchTime":1660107090,"missionPower":-7302158724578148352,"missionType":1,"name":"Reptilian Peace","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmaX32NUecni5qEPPCfoT1iQQHRdm7XMEKRHR8hNSM2dMK","reward":130000000,"spaceshipCost":400000,"totalShips":45215}},{"id":"1161","type":"mission","attributes":{"boardingTime":1660091249,"description":"Space is scary enough even without the unpredictable melting pot of interspecies quarrels. Negotiate with a Alien Terrorist intent on blowing themselves up in a Space station.","duration":1209600,"endTime":1661322449,"launchTime":1660112849,"missionPower":6681266340310810624,"missionType":3,"name":"The Negotiator","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmbsHuZH1Cgsppfr7WPArcujWkUrqDfsKywRRNTfH7VcXg","reward":200000000,"spaceshipCost":2000000,"totalShips":6054}},{"id":"1160","type":"mission","attributes":{"boardingTime":1660080797,"description":"Important keys have been stolen by rebel forces. Recover a ledger device from a rebel stronghold without anyone realising","duration":604800,"endTime":1660699997,"launchTime":1660095197,"missionPower":-7216543490073690112,"missionType":8,"name":"Retrieve Ledger","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmPPZwSYjGgJKD3zARGTLUVCshdjSBj1mVBuRfodTwvSat","reward":150000000,"spaceshipCost":400000,"totalShips":40552}},{"id":"1159","type":"mission","attributes":{"boardingTime":1660073289,"description":"Leaders are always a target - Transport a Federation admiral securely to the new planet government space station","duration":1209600,"endTime":1661304489,"launchTime":1660094889,"missionPower":2124849348591222784,"missionType":5,"name":"Install the Admiral","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmWuzETbQwb43kibxTZEUrTbiH4inGzSN9ECBtN16XnbRf","reward":180000000,"spaceshipCost":2000000,"totalShips":5360}},{"id":"1158","type":"mission","attributes":{"boardingTime":1659997986,"description":"Important keys have been stolen by rebel forces. Recover a ledger device from a rebel stronghold without anyone realising","duration":604800,"endTime":1660617186,"launchTime":1660012386,"missionPower":7857539190995550208,"missionType":8,"name":"Retrieve Ledger","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmPPZwSYjGgJKD3zARGTLUVCshdjSBj1mVBuRfodTwvSat","reward":150000000,"spaceshipCost":400000,"totalShips":31836}},{"id":"1157","type":"mission","attributes":{"boardingTime":1659997170,"description":"The Delta Solaris star has recorded unusual activity - A huge solar flare is expected to hit the planet - position a deflector shield to prevent damage to mining rigs","duration":7257600,"endTime":1667297970,"launchTime":1660040370,"missionPower":9162760480865910784,"missionType":6,"name":"Solar Flare","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmSN6B2oDTXDMektfBsNGrFC2n9Kzby8hxBgUi8ZuRV6B6","reward":750000000,"spaceshipCost":50000000,"totalShips":177}},{"id":"1156","type":"mission","attributes":{"boardingTime":1659995478,"description":"A breakaway group of Reptilians have set up a rogue cell in a uncharted region. Examine the situation and make sure the Reptilian Diplomat is guarded on their mission of peace","duration":604800,"endTime":1660614678,"launchTime":1660009878,"missionPower":8877169724639674368,"missionType":1,"name":"Reptilian Peace","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmaX32NUecni5qEPPCfoT1iQQHRdm7XMEKRHR8hNSM2dMK","reward":130000000,"spaceshipCost":400000,"totalShips":35554}},{"id":"1155","type":"mission","attributes":{"boardingTime":1659938871,"description":"Another Liberation celebration event - Provide additional security to the ceremonial opening of the interplanetary space hub orbiting the planet","duration":2419200,"endTime":1662386871,"launchTime":1659967671,"missionPower":7886365103312863232,"missionType":7,"name":"Space Hub Opening","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmP43h1pgZUNgqKaQdznfTdnvExsBu9CXZVcptisu6Z2QB","reward":600000000,"spaceshipCost":10000000,"totalShips":2687}},{"id":"1154","type":"mission","attributes":{"boardingTime":1659915175,"description":"Important keys have been stolen by rebel forces. Recover a ledger device from a rebel stronghold without anyone realising","duration":604800,"endTime":1660534375,"launchTime":1659929575,"missionPower":5568618683372142592,"missionType":8,"name":"Retrieve Ledger","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmPPZwSYjGgJKD3zARGTLUVCshdjSBj1mVBuRfodTwvSat","reward":150000000,"spaceshipCost":400000,"totalShips":33042}},{"id":"1153","type":"mission","attributes":{"boardingTime":1659907315,"description":"The eternal battle continues and Reptilians and Greys are fighting over Trilium, send in your peacekeeper droids","duration":2419200,"endTime":1662355315,"launchTime":1659936115,"missionPower":8228637368920309760,"missionType":2,"name":"Peacekeepers","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmREjwMToyDHxx87C1CN9U1JEFLVCcnkpufFsgFQMTTbtm","reward":300000000,"spaceshipCost":10000000,"totalShips":2144}},{"id":"1152","type":"mission","attributes":{"boardingTime":1659898267,"description":"A breakaway group of Reptilians have set up a rogue cell in a uncharted region. Examine the situation and make sure the Reptilian Diplomat is guarded on their mission of peace","duration":604800,"endTime":1660517467,"launchTime":1659912667,"missionPower":-2588856837004591104,"missionType":1,"name":"Reptilian Peace","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmaX32NUecni5qEPPCfoT1iQQHRdm7XMEKRHR8hNSM2dMK","reward":130000000,"spaceshipCost":400000,"totalShips":44690}},{"id":"1151","type":"mission","attributes":{"boardingTime":1659893278,"description":"Leaders are always a target - Transport a Federation admiral securely to the new planet government space station","duration":1209600,"endTime":1661124478,"launchTime":1659914878,"missionPower":-7394448111432630272,"missionType":5,"name":"Install the Admiral","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmWuzETbQwb43kibxTZEUrTbiH4inGzSN9ECBtN16XnbRf","reward":180000000,"spaceshipCost":2000000,"totalShips":6072}},{"id":"1150","type":"mission","attributes":{"boardingTime":1659893238,"description":"Space is scary enough even without the unpredictable melting pot of interspecies quarrels. Negotiate with a Alien Terrorist intent on blowing themselves up in a Space station.","duration":1209600,"endTime":1661124438,"launchTime":1659914838,"missionPower":8007534308887625728,"missionType":3,"name":"The Negotiator","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmbsHuZH1Cgsppfr7WPArcujWkUrqDfsKywRRNTfH7VcXg","reward":200000000,"spaceshipCost":2000000,"totalShips":7507}},{"id":"1149","type":"mission","attributes":{"boardingTime":1659832364,"description":"Important keys have been stolen by rebel forces. Recover a ledger device from a rebel stronghold without anyone realising","duration":604800,"endTime":1660451564,"launchTime":1659846764,"missionPower":-6945810417830592512,"missionType":8,"name":"Retrieve Ledger","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmPPZwSYjGgJKD3zARGTLUVCshdjSBj1mVBuRfodTwvSat","reward":150000000,"spaceshipCost":400000,"totalShips":62435}},{"id":"1148","type":"mission","attributes":{"boardingTime":1659801056,"description":"A breakaway group of Reptilians have set up a rogue cell in a uncharted region. Examine the situation and make sure the Reptilian Diplomat is guarded on their mission of peace","duration":604800,"endTime":1660420256,"launchTime":1659815456,"missionPower":-2489003842151120896,"missionType":1,"name":"Reptilian Peace","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmaX32NUecni5qEPPCfoT1iQQHRdm7XMEKRHR8hNSM2dMK","reward":130000000,"spaceshipCost":400000,"totalShips":42268}},{"id":"1147","type":"mission","attributes":{"boardingTime":1659749554,"description":"Important keys have been stolen by rebel forces. Recover a ledger device from a rebel stronghold without anyone realising","duration":604800,"endTime":1660368754,"launchTime":1659763954,"missionPower":-5455309571012689920,"missionType":8,"name":"Retrieve Ledger","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmPPZwSYjGgJKD3zARGTLUVCshdjSBj1mVBuRfodTwvSat","reward":150000000,"spaceshipCost":400000,"totalShips":41800}},{"id":"1146","type":"mission","attributes":{"boardingTime":1659713267,"description":"Leaders are always a target - Transport a Federation admiral securely to the new planet government space station","duration":1209600,"endTime":1660944467,"launchTime":1659734867,"missionPower":6524408397658324992,"missionType":5,"name":"Install the Admiral","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmWuzETbQwb43kibxTZEUrTbiH4inGzSN9ECBtN16XnbRf","reward":180000000,"spaceshipCost":2000000,"totalShips":4686}},{"id":"1145","type":"mission","attributes":{"boardingTime":1659703846,"description":"A breakaway group of Reptilians have set up a rogue cell in a uncharted region. Examine the situation and make sure the Reptilian Diplomat is guarded on their mission of peace","duration":604800,"endTime":1660323046,"launchTime":1659718246,"missionPower":-8443012370200002560,"missionType":1,"name":"Reptilian Peace","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmaX32NUecni5qEPPCfoT1iQQHRdm7XMEKRHR8hNSM2dMK","reward":130000000,"spaceshipCost":400000,"totalShips":41851}},{"id":"1144","type":"mission","attributes":{"boardingTime":1659695226,"description":"Space is scary enough even without the unpredictable melting pot of interspecies quarrels. Negotiate with a Alien Terrorist intent on blowing themselves up in a Space station.","duration":1209600,"endTime":1660926426,"launchTime":1659716826,"missionPower":8977292251507982336,"missionType":3,"name":"The Negotiator","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmbsHuZH1Cgsppfr7WPArcujWkUrqDfsKywRRNTfH7VcXg","reward":200000000,"spaceshipCost":2000000,"totalShips":7262}},{"id":"1143","type":"mission","attributes":{"boardingTime":1659679658,"description":"Another Liberation celebration event - Provide additional security to the ceremonial opening of the interplanetary space hub orbiting the planet","duration":2419200,"endTime":1662127658,"launchTime":1659708458,"missionPower":3322815754818027520,"missionType":7,"name":"Space Hub Opening","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmP43h1pgZUNgqKaQdznfTdnvExsBu9CXZVcptisu6Z2QB","reward":600000000,"spaceshipCost":10000000,"totalShips":2166}},{"id":"1142","type":"mission","attributes":{"boardingTime":1659673175,"description":"Brave adventurers are among the first to set up home on a newly discovered planet - Transport 10000 colonists to the new planet","duration":7257600,"endTime":1666973975,"launchTime":1659716375,"missionPower":-3315710351244263424,"missionType":5,"name":"New Start","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"Qme2VkoTSrZfSbjaJxmQLFKUHrpUuhoFQ4F92YAU9vq69t","reward":750000000,"spaceshipCost":50000000,"totalShips":248}},{"id":"1141","type":"mission","attributes":{"boardingTime":1659666742,"description":"Important keys have been stolen by rebel forces. Recover a ledger device from a rebel stronghold without anyone realising","duration":604800,"endTime":1660285942,"launchTime":1659681142,"missionPower":-8514362891153965056,"missionType":8,"name":"Retrieve Ledger","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmPPZwSYjGgJKD3zARGTLUVCshdjSBj1mVBuRfodTwvSat","reward":150000000,"spaceshipCost":400000,"totalShips":46168}},{"id":"1140","type":"mission","attributes":{"boardingTime":1659606637,"description":"A breakaway group of Reptilians have set up a rogue cell in a uncharted region. Examine the situation and make sure the Reptilian Diplomat is guarded on their mission of peace","duration":604800,"endTime":1660225837,"launchTime":1659621037,"missionPower":7080247068500951040,"missionType":1,"name":"Reptilian Peace","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmaX32NUecni5qEPPCfoT1iQQHRdm7XMEKRHR8hNSM2dMK","reward":130000000,"spaceshipCost":400000,"totalShips":37758}},{"id":"1139","type":"mission","attributes":{"boardingTime":1659601305,"description":"The eternal battle continues and Reptilians and Greys are fighting over Trilium, send in your peacekeeper droids","duration":2419200,"endTime":1662049305,"launchTime":1659630105,"missionPower":2837950260108591104,"missionType":2,"name":"Peacekeepers","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmREjwMToyDHxx87C1CN9U1JEFLVCcnkpufFsgFQMTTbtm","reward":300000000,"spaceshipCost":10000000,"totalShips":995}},{"id":"1138","type":"mission","attributes":{"boardingTime":1659583932,"description":"Important keys have been stolen by rebel forces. Recover a ledger device from a rebel stronghold without anyone realising","duration":604800,"endTime":1660203132,"launchTime":1659598332,"missionPower":1989038084645191680,"missionType":8,"name":"Retrieve Ledger","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmPPZwSYjGgJKD3zARGTLUVCshdjSBj1mVBuRfodTwvSat","reward":150000000,"spaceshipCost":400000,"totalShips":37104}},{"id":"1137","type":"mission","attributes":{"boardingTime":1659533257,"description":"Leaders are always a target - Transport a Federation admiral securely to the new planet government space station","duration":1209600,"endTime":1660764457,"launchTime":1659554857,"missionPower":5133922264902795264,"missionType":5,"name":"Install the Admiral","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmWuzETbQwb43kibxTZEUrTbiH4inGzSN9ECBtN16XnbRf","reward":180000000,"spaceshipCost":2000000,"totalShips":7377}},{"id":"1136","type":"mission","attributes":{"boardingTime":1659509427,"description":"A breakaway group of Reptilians have set up a rogue cell in a uncharted region. Examine the situation and make sure the Reptilian Diplomat is guarded on their mission of peace","duration":604800,"endTime":1660128627,"launchTime":1659523827,"missionPower":2295648566376398848,"missionType":1,"name":"Reptilian Peace","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmaX32NUecni5qEPPCfoT1iQQHRdm7XMEKRHR8hNSM2dMK","reward":130000000,"spaceshipCost":400000,"totalShips":37426}},{"id":"1135","type":"mission","attributes":{"boardingTime":1659501123,"description":"Important keys have been stolen by rebel forces. Recover a ledger device from a rebel stronghold without anyone realising","duration":604800,"endTime":1660120323,"launchTime":1659515523,"missionPower":-8043654297189089280,"missionType":8,"name":"Retrieve Ledger","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmPPZwSYjGgJKD3zARGTLUVCshdjSBj1mVBuRfodTwvSat","reward":150000000,"spaceshipCost":400000,"totalShips":37337}},{"id":"1134","type":"mission","attributes":{"boardingTime":1659497214,"description":"Space is scary enough even without the unpredictable melting pot of interspecies quarrels. Negotiate with a Alien Terrorist intent on blowing themselves up in a Space station.","duration":1209600,"endTime":1660728414,"launchTime":1659518814,"missionPower":427779687305969664,"missionType":3,"name":"The Negotiator","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmbsHuZH1Cgsppfr7WPArcujWkUrqDfsKywRRNTfH7VcXg","reward":200000000,"spaceshipCost":2000000,"totalShips":5142}},{"id":"1133","type":"mission","attributes":{"boardingTime":1659420448,"description":"Another Liberation celebration event - Provide additional security to the ceremonial opening of the interplanetary space hub orbiting the planet","duration":2419200,"endTime":1661868448,"launchTime":1659449248,"missionPower":4848762759900299264,"missionType":7,"name":"Space Hub Opening","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmP43h1pgZUNgqKaQdznfTdnvExsBu9CXZVcptisu6Z2QB","reward":600000000,"spaceshipCost":10000000,"totalShips":1362}},{"id":"1132","type":"mission","attributes":{"boardingTime":1659418313,"description":"Important keys have been stolen by rebel forces. Recover a ledger device from a rebel stronghold without anyone realising","duration":604800,"endTime":1660037513,"launchTime":1659432713,"missionPower":6003638540259295232,"missionType":8,"name":"Retrieve Ledger","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmPPZwSYjGgJKD3zARGTLUVCshdjSBj1mVBuRfodTwvSat","reward":150000000,"spaceshipCost":400000,"totalShips":27663}},{"id":"1131","type":"mission","attributes":{"boardingTime":1659412215,"description":"A breakaway group of Reptilians have set up a rogue cell in a uncharted region. Examine the situation and make sure the Reptilian Diplomat is guarded on their mission of peace","duration":604800,"endTime":1660031415,"launchTime":1659426615,"missionPower":-2602959831346184192,"missionType":1,"name":"Reptilian Peace","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmaX32NUecni5qEPPCfoT1iQQHRdm7XMEKRHR8hNSM2dMK","reward":130000000,"spaceshipCost":400000,"totalShips":29514}},{"id":"1130","type":"mission","attributes":{"boardingTime":1659353247,"description":"Leaders are always a target - Transport a Federation admiral securely to the new planet government space station","duration":1209600,"endTime":1660584447,"launchTime":1659374847,"missionPower":-9048723632066396160,"missionType":5,"name":"Install the Admiral","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmWuzETbQwb43kibxTZEUrTbiH4inGzSN9ECBtN16XnbRf","reward":180000000,"spaceshipCost":2000000,"totalShips":4816}},{"id":"1129","type":"mission","attributes":{"boardingTime":1659335502,"description":"Important keys have been stolen by rebel forces. Recover a ledger device from a rebel stronghold without anyone realising","duration":604800,"endTime":1659954702,"launchTime":1659349902,"missionPower":5347407810533523456,"missionType":8,"name":"Retrieve Ledger","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmPPZwSYjGgJKD3zARGTLUVCshdjSBj1mVBuRfodTwvSat","reward":150000000,"spaceshipCost":400000,"totalShips":48753}},{"id":"1128","type":"mission","attributes":{"boardingTime":1659315003,"description":"A breakaway group of Reptilians have set up a rogue cell in a uncharted region. Examine the situation and make sure the Reptilian Diplomat is guarded on their mission of peace","duration":604800,"endTime":1659934203,"launchTime":1659329403,"missionPower":-2075273242783776768,"missionType":1,"name":"Reptilian Peace","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmaX32NUecni5qEPPCfoT1iQQHRdm7XMEKRHR8hNSM2dMK","reward":130000000,"spaceshipCost":400000,"totalShips":27060}},{"id":"1127","type":"mission","attributes":{"boardingTime":1659299203,"description":"Space is scary enough even without the unpredictable melting pot of interspecies quarrels. Negotiate with a Alien Terrorist intent on blowing themselves up in a Space station.","duration":1209600,"endTime":1660530403,"launchTime":1659320803,"missionPower":-356590885560909824,"missionType":3,"name":"The Negotiator","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmbsHuZH1Cgsppfr7WPArcujWkUrqDfsKywRRNTfH7VcXg","reward":200000000,"spaceshipCost":2000000,"totalShips":6063}},{"id":"1126","type":"mission","attributes":{"boardingTime":1659295293,"description":"The eternal battle continues and Reptilians and Greys are fighting over Trilium, send in your peacekeeper droids","duration":2419200,"endTime":1661743293,"launchTime":1659324093,"missionPower":-1654302473835249664,"missionType":2,"name":"Peacekeepers","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmREjwMToyDHxx87C1CN9U1JEFLVCcnkpufFsgFQMTTbtm","reward":300000000,"spaceshipCost":10000000,"totalShips":1331}},{"id":"1125","type":"mission","attributes":{"boardingTime":1659252692,"description":"Important keys have been stolen by rebel forces. Recover a ledger device from a rebel stronghold without anyone realising","duration":604800,"endTime":1659871892,"launchTime":1659267092,"missionPower":1782199738163003392,"missionType":8,"name":"Retrieve Ledger","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmPPZwSYjGgJKD3zARGTLUVCshdjSBj1mVBuRfodTwvSat","reward":150000000,"spaceshipCost":400000,"totalShips":42121}},{"id":"1124","type":"mission","attributes":{"boardingTime":1659217793,"description":"A breakaway group of Reptilians have set up a rogue cell in a uncharted region. Examine the situation and make sure the Reptilian Diplomat is guarded on their mission of peace","duration":604800,"endTime":1659836993,"launchTime":1659232193,"missionPower":-3950624870248742912,"missionType":1,"name":"Reptilian Peace","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmaX32NUecni5qEPPCfoT1iQQHRdm7XMEKRHR8hNSM2dMK","reward":130000000,"spaceshipCost":400000,"totalShips":28580}},{"id":"1123","type":"mission","attributes":{"boardingTime":1659205158,"description":"The Delta Solaris star has recorded unusual activity - A huge solar flare is expected to hit the planet - position a deflector shield to prevent damage to mining rigs","duration":7257600,"endTime":1666505958,"launchTime":1659248358,"missionPower":3936063671481925632,"missionType":6,"name":"Solar Flare","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmSN6B2oDTXDMektfBsNGrFC2n9Kzby8hxBgUi8ZuRV6B6","reward":750000000,"spaceshipCost":50000000,"totalShips":223}},{"id":"1122","type":"mission","attributes":{"boardingTime":1659173237,"description":"Leaders are always a target - Transport a Federation admiral securely to the new planet government space station","duration":1209600,"endTime":1660404437,"launchTime":1659194837,"missionPower":-7586967837961355264,"missionType":5,"name":"Install the Admiral","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmWuzETbQwb43kibxTZEUrTbiH4inGzSN9ECBtN16XnbRf","reward":180000000,"spaceshipCost":2000000,"totalShips":5569}},{"id":"1121","type":"mission","attributes":{"boardingTime":1659169882,"description":"Important keys have been stolen by rebel forces. Recover a ledger device from a rebel stronghold without anyone realising","duration":604800,"endTime":1659789082,"launchTime":1659184282,"missionPower":-4435598177764114432,"missionType":8,"name":"Retrieve Ledger","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmPPZwSYjGgJKD3zARGTLUVCshdjSBj1mVBuRfodTwvSat","reward":150000000,"spaceshipCost":400000,"totalShips":37757}},{"id":"1120","type":"mission","attributes":{"boardingTime":1659161237,"description":"Another Liberation celebration event - Provide additional security to the ceremonial opening of the interplanetary space hub orbiting the planet","duration":2419200,"endTime":1661609237,"launchTime":1659190037,"missionPower":5561809765014700032,"missionType":7,"name":"Space Hub Opening","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmP43h1pgZUNgqKaQdznfTdnvExsBu9CXZVcptisu6Z2QB","reward":600000000,"spaceshipCost":10000000,"totalShips":2171}},{"id":"1119","type":"mission","attributes":{"boardingTime":1659120579,"description":"A breakaway group of Reptilians have set up a rogue cell in a uncharted region. Examine the situation and make sure the Reptilian Diplomat is guarded on their mission of peace","duration":604800,"endTime":1659739779,"launchTime":1659134979,"missionPower":3215506964771504128,"missionType":1,"name":"Reptilian Peace","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmaX32NUecni5qEPPCfoT1iQQHRdm7XMEKRHR8hNSM2dMK","reward":130000000,"spaceshipCost":400000,"totalShips":35805}},{"id":"1118","type":"mission","attributes":{"boardingTime":1659101193,"description":"Space is scary enough even without the unpredictable melting pot of interspecies quarrels. Negotiate with a Alien Terrorist intent on blowing themselves up in a Space station.","duration":1209600,"endTime":1660332393,"launchTime":1659122793,"missionPower":-8606652278008446976,"missionType":3,"name":"The Negotiator","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmbsHuZH1Cgsppfr7WPArcujWkUrqDfsKywRRNTfH7VcXg","reward":200000000,"spaceshipCost":2000000,"totalShips":7025}},{"id":"1117","type":"mission","attributes":{"boardingTime":1659087073,"description":"Important keys have been stolen by rebel forces. Recover a ledger device from a rebel stronghold without anyone realising","duration":604800,"endTime":1659706273,"launchTime":1659101473,"missionPower":-5334140365437927424,"missionType":8,"name":"Retrieve Ledger","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmPPZwSYjGgJKD3zARGTLUVCshdjSBj1mVBuRfodTwvSat","reward":150000000,"spaceshipCost":400000,"totalShips":46620}},{"id":"1116","type":"mission","attributes":{"boardingTime":1659023370,"description":"A breakaway group of Reptilians have set up a rogue cell in a uncharted region. Examine the situation and make sure the Reptilian Diplomat is guarded on their mission of peace","duration":604800,"endTime":1659642570,"launchTime":1659037770,"missionPower":3165472654538833920,"missionType":1,"name":"Reptilian Peace","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmaX32NUecni5qEPPCfoT1iQQHRdm7XMEKRHR8hNSM2dMK","reward":130000000,"spaceshipCost":400000,"totalShips":47364}},{"id":"1115","type":"mission","attributes":{"boardingTime":1659004262,"description":"Important keys have been stolen by rebel forces. Recover a ledger device from a rebel stronghold without anyone realising","duration":604800,"endTime":1659623462,"launchTime":1659018662,"missionPower":-7109746810855358464,"missionType":8,"name":"Retrieve Ledger","nftContract":"0xF3857306a37264f15a19ad37DA8A9485e5f7CfB3","nftTokenURI":"QmPPZwSYjGgJKD3zARGTLUVCshdjSBj1mVBuRfodTwvSat","reward":150000000,"spaceshipCost":400000,"totalShips":56066}}],"included":[],"links":null}\n'

if (fs.existsSync(missionsJsonFile)) {
  missionsJson = fs.readFileSync(missionsJsonFile)
}
missionsJson = JSON.parse(missionsJson)

let missionsTableSeason1 =
  '' +
  //'Rarity\tMission Type\tMission Title\tMission Description\tReward (POT)\tSpaceship Lease Cost\tBoarding length [hours]\tBoarding length [seconds]\tDeployment Intervals in Hours\tDeployment interval in Seconds\tStart time (from genesis) in hours\tStart time (from genesis) in secs\tDuration\tDuration Unit\tDuration in seconds\tNFT Json Hash\tNFT Image Hash\tDeployed Per 30 Days\tTotal TLM Per Month (POT * Deployment Frequency)\tNFT JSON Link\tNFT Image Link\n' +
  'Common\tRecovery\tRetrieve Ledger\tImportant keys have been stolen by rebel forces. Recover a ledger device from a rebel stronghold without anyone realising\t15,000\t40\t4\t14400\t23\t82800\t0\t0\t1\tweeks\t604800\tQmPPZwSYjGgJKD3zARGTLUVCshdjSBj1mVBuRfodTwvSat\tQma4cHTj2MW4DVCNXTicc62RfG75atMKGUrLt4TyL8pi69\t31.30434783\t469,565\thttps://alienworlds.mypinata.cloud/ipfs/QmPPZwSYjGgJKD3zARGTLUVCshdjSBj1mVBuRfodTwvSat\thttps://alienworlds.mypinata.cloud/ipfs/Qma4cHTj2MW4DVCNXTicc62RfG75atMKGUrLt4TyL8pi69\n' +
  'Common\tExplore\tReptilian Peace\tA breakaway group of Reptilians have set up a rogue cell in a uncharted region. Examine the situation and make sure the Reptilian Diplomat is guarded on their mission of peace\t13,000\t40\t4\t14400\t27\t97200\t10\t36000\t1\tweeks\t604800\tQmaX32NUecni5qEPPCfoT1iQQHRdm7XMEKRHR8hNSM2dMK\tQmPv7FfixkyTmVHSvSJo2v4nsCgP3yQRBdk4diitgV3tPj\t26.66666667\t346,667\thttps://alienworlds.mypinata.cloud/ipfs/QmaX32NUecni5qEPPCfoT1iQQHRdm7XMEKRHR8hNSM2dMK\thttps://alienworlds.mypinata.cloud/ipfs/QmPv7FfixkyTmVHSvSJo2v4nsCgP3yQRBdk4diitgV3tPj\n' +
  'Rare\tCourier\tInstall the Admiral\tLeaders are always a target - Transport a Federation admiral securely to the new planet government space station\t18,000\t200\t6\t21600\t50\t180000\t5\t18000\t2\tweeks\t1209600\tQmWuzETbQwb43kibxTZEUrTbiH4inGzSN9ECBtN16XnbRf\tQmaQhWW5CQ2Zau8AwoZLNGFV7mDg1tzUQJ5Mup59jiTd1X\t14.4\t259,200\thttps://alienworlds.mypinata.cloud/ipfs/QmWuzETbQwb43kibxTZEUrTbiH4inGzSN9ECBtN16XnbRf\thttps://alienworlds.mypinata.cloud/ipfs/QmaQhWW5CQ2Zau8AwoZLNGFV7mDg1tzUQJ5Mup59jiTd1X\n' +
  'Rare\tScouting\tThe Negotiator\tSpace is scary enough even without the unpredictable melting pot of interspecies quarrels. Negotiate with a Alien Terrorist intent on blowing themselves up in a Space station.\t20,000\t200\t6\t21600\t55\t198000\t25\t90000\t2\tweeks\t1209600\tQmbsHuZH1Cgsppfr7WPArcujWkUrqDfsKywRRNTfH7VcXg\tQmeMV9ovF11HRBnWtekkmbPBq3QctEZTFMrr2uuUopc7HD\t13.09090909\t261,818\thttps://alienworlds.mypinata.cloud/ipfs/QmbsHuZH1Cgsppfr7WPArcujWkUrqDfsKywRRNTfH7VcXg\thttps://alienworlds.mypinata.cloud/ipfs/QmeMV9ovF11HRBnWtekkmbPBq3QctEZTFMrr2uuUopc7HD\n' +
  'Epic\tBattle\tPeacekeepers\tThe eternal battle continues and Reptilians and Greys are fighting over Trilium, send in your peacekeeper droids\t30,000\t1,000\t8\t28800\t85\t306000\t15\t54000\t4\tweeks\t2419200\tQmREjwMToyDHxx87C1CN9U1JEFLVCcnkpufFsgFQMTTbtm\tQmXqNWHFfPNzr5f2DJYmfwemmNxSgVeXMFbF7e27xjKtyd\t8.470588235\t254,118\thttps://alienworlds.mypinata.cloud/ipfs/QmREjwMToyDHxx87C1CN9U1JEFLVCcnkpufFsgFQMTTbtm\thttps://alienworlds.mypinata.cloud/ipfs/QmXqNWHFfPNzr5f2DJYmfwemmNxSgVeXMFbF7e27xjKtyd\n' +
  'Epic\tLiberation\tSpace Hub Opening\tAnother Liberation celebration event - Provide additional security to the ceremonial opening of the interplanetary space hub orbiting the planet\t60,000\t1,000\t8\t28800\t72\t259200\t47\t169200\t4\tweeks\t2419200\tQmP43h1pgZUNgqKaQdznfTdnvExsBu9CXZVcptisu6Z2QB\tQmafCjASJ7Dmyo9fvG3ztwA5h3rsEoqg8ptwDv1vTKicT4\t10\t600,000\thttps://alienworlds.mypinata.cloud/ipfs/QmP43h1pgZUNgqKaQdznfTdnvExsBu9CXZVcptisu6Z2QB\thttps://alienworlds.mypinata.cloud/ipfs/QmafCjASJ7Dmyo9fvG3ztwA5h3rsEoqg8ptwDv1vTKicT4\n' +
  'Legendary\tSupply\tSolar Flare\tThe Delta Solaris star has recorded unusual activity - A huge solar flare is expected to hit the planet - position a deflector shield to prevent damage to mining rigs\t75,000\t5,000\t12\t43200\t220\t792000\t24\t86400\t12\tweeks\t7257600\tQmSN6B2oDTXDMektfBsNGrFC2n9Kzby8hxBgUi8ZuRV6B6\tQmQh5z9yFghQqBodz8h3HFcLeS6MPKNcT8fkUQLZaQ8m75\t3.272727273\t245,455\thttps://alienworlds.mypinata.cloud/ipfs/QmSN6B2oDTXDMektfBsNGrFC2n9Kzby8hxBgUi8ZuRV6B6\thttps://alienworlds.mypinata.cloud/ipfs/QmQh5z9yFghQqBodz8h3HFcLeS6MPKNcT8fkUQLZaQ8m75\n' +
  'Legendary\tCourier\tNew Start\tBrave adventurers are among the first to set up home on a newly discovered planet - Transport 10000 colonists to the new planet\t75,000\t5,000\t12\t43200\t210\t756000\t114\t410400\t12\tweeks\t7257600\tQme2VkoTSrZfSbjaJxmQLFKUHrpUuhoFQ4F92YAU9vq69t\tQmZC9j3JKrefWUanSBDCeqD235Ei31nTFAUcuFZUg1f9Pi\t3.428571429\t257,143\thttps://alienworlds.mypinata.cloud/ipfs/Qme2VkoTSrZfSbjaJxmQLFKUHrpUuhoFQ4F92YAU9vq69t\thttps://alienworlds.mypinata.cloud/ipfs/QmZC9j3JKrefWUanSBDCeqD235Ei31nTFAUcuFZUg1f9Pi\n'

let missionsTableSeason2 =
  '' +
  //'Rarity\tMission Type\tMission Title\tMission Description\tReward (POT)\tSpaceship Lease Cost\tBoarding length [hours]\tBoarding length [seconds]\tDeployment Intervals in Hours\tDeployment interval in Seconds\tStart time (from genesis) in hours\tStart time (from genesis) in secs\tDuration Weeks\tDuration Unit\tDuration in seconds\tNFT Json Hash\tNFT Image Hash\tDeployed Per 30 Days\tTotal TLM Per Month (POT * Deployment Frequency)\n' +
  'Common\tCourier\tCourier Run\tThe Federation is cracking down on high gas fees to help new business prosper. Transport a high gas fee miner to a rehabilitation station.\t15,000\t40\t4\t14400\t23\t82800\t0\t0\t1\tweeks\t604800\tQmeixndncUVp435QZeEWipHCHgAVbjeJpZ8Ja5MjcaTGe5\tQmV5udo5Aaxv5tCBf4D7hbAqnf9TRqbptyfFnKFTmw1Pdw\t31.30434783\t469,565\n' +
  'Common\tSupply\tSupply Request\tManatite helps with Trilium Extraction in difficult to reach areas. Deliver supplies of radioactive Manatite to Planet Binance.\t13,000\t40\t4\t14400\t27\t97200\t10\t36000\t1\tweeks\t604800\tQmWsDUKyLe8WPGxsafzL3TUSN5NxrfjvHggd5CUBhLMP8f\tQmNRavf6rksp6757kq86eHiZkqgXbmy8PiwnZ3uXNqycBY\t26.66666667\t346,667\n' +
  'Rare\tScouting\tPlanetary Scouting\tMany strange and unusual mysteries await near Planet Binance. Send your research ships to gather data and samples.\t18,000\t200\t6\t21600\t50\t180000\t5\t18000\t2\tweeks\t1209600\tQmQFS9wgVdJHD3FqXt26zSpvWhQAtwy1Fr7Xx2qKsQtWw4\tQmPTETK6ys5CtW5WcncnCEtqV2qx5ZdM1RNMmrHxz77oCH\t14.4\t259,200\n' +
  'Rare\tRecovery\tRecovery Mission\tA special research vessel on its way to Planet Binance has lost contact - Use your tracker ships to locate it and provide assistance. Beware of unexpected hazards.\t20,000\t200\t6\t21600\t55\t198000\t25\t90000\t2\tweeks\t1209600\tQma2dUV8FtcHvyXPsyBubhoTWWcBw9z27BBFCwtPHjh966\tQmSPVGm4cyYtSnXaT4zTXyUzTQ2bbuSnfhDovJKECisgee\t13.09090909\t261,818\n' +
  'Epic\tBattle\tBattle Deployment\tAlien Pirates are attacking the starports linking up with Planet Binance. Set up holonets and other defence modules to ensure trade and transport routes stay open.\t30,000\t1,000\t8\t28800\t85\t306000\t15\t54000\t4\tweeks\t2419200\tQmRHXoSsH6w9H7umGGGqc9heN5iSfW8dNFt1qVTkMWTaQn\tQmamjTA7TMdk36Sv6rsF3ZKTQLnHKGEVMwt9ZxpHcCKy3v\t8.470588235\t254,118\n' +
  'Epic\tExplore\tGalaxy Exploration\tA strange new wormhole has been found near Planet Binance - You must send your spaceships to investigate but make sure to keep outside of the Zero Horizon.\t60,000\t1,000\t8\t28800\t72\t259200\t47\t169200\t4\tweeks\t2419200\tQmSxsFW1hR1T4K5e8q9DodqW4u88Ltw4ciytznDVLbJnzN\tQmSsRGGnWRUHGf6SA2XWKgk8D7ypxyC1CCBcu4fQbEt3eW\t10\t600,000\n' +
  'Legendary\tArtifact\tArtifact Discovery\tThe Galactic Orb of Time is one of the most ancient and precious objects in the Alien World Metaverse. It has been sighted near Planet Binance - Find the artifact and return with it\t75,000\t5,000\t12\t43200\t220\t792000\t24\t86400\t12\tweeks\t7257600\tQmTwYYcAGNZCcVwy7tbnzNsJJQW9bEXvYm3jLReJbQHkQM\tQmZJt3yRaUAt9Bbfk3d3vy1JDR4vmi2R4pisSDgjcYVCAV\t3.272727273\t245,455\n' +
  'Legendary\tLiberation\tLiberation Aid\tRogue Aliens have kidnapped diplomats on their way to debate the Planet Binance accords. The Aliens are holding them hostage. Send your elite special forces on a covert mission to free the hostages\t75,000\t5,000\t12\t43200\t210\t756000\t114\t410400\t12\tweeks\t7257600\tQmWeRuFctSRcXzZL254w24HgMinzgmk6ZkMHvqhn9o5Z4b\tQmd8bk7v4o1SzzGR8MS1JiQqWZK5swKkWFY9qPMr17tmSs\t3.428571429\t257,143'

let MISSIONSTABLE = missionsTableSeason1 + missionsTableSeason2

let missionTypes = new Map([
  ['Explore', 1],
  ['Battle', 2],
  ['Scouting', 3],
  ['Artifact', 4],
  ['Courier', 5],
  ['Supply', 6],
  ['Liberation', 7],
  ['Recovery', 8],
])

// let missionTypesNormal = {}
let missionsArray = []

function sleep(millisecond) {
  let e = new Date().getTime() + millisecond
  while (new Date().getTime() <= e) {}
}

async function getMissionsJson(baseUrl) {
  return missionsJson // comment this line for the prod testing
  const capabilities = {
    platform: 'WIN10',
    browserName: 'chrome',
    version: 'latest',
    name: 'NodeJS Sample Test',
  }
  await sendMessage('Webdriver enabled')
  try {
    let driver = new webdriver.Builder().withCapabilities(capabilities).build()
    await driver.get(baseUrl)
    let element = await driver
      .findElement(webdriver.By.xpath('/html/body/pre'))
      .getAttribute('innerHTML')
    let json = JSON.parse(element)
    await driver.quit()
    console.log('missionsJson: ', element)
    fs.writeFileSync(missionsJsonFile, element)
    console.log('Downloaded file: ' + missionsJsonFile)
    return json
  } catch (e) {
    console.log(e)
    sendMessage(e.toString())
  }
}

function parseXLSSrcDataToArray(missionsXlsData) {
  let missionsXlsDataRow = missionsXlsData.split('\n')
  for (let i = 0; i < missionsXlsDataRow.length; i++) {
    let cell = missionsXlsDataRow[i].split('\t')
    let missionString = []
    let j = 0

    // let NFTLinkPrefix = 'https://alienworlds.mypinata.cloud/ipfs/'
    let NFTLinkPrefix = 'https://ipfs.alienworlds.io/ipfs/' //our private ipfs gateway

    //    I've sent request to abuse@protocol.ai to unblock this content.
    //    https://ipfs.io/ipfs/Qma4cHTj2MW4DVCNXTicc62RfG75atMKGUrLt4TyL8pi69
    //    This image can be fetched fine via our private ipfs gateway -
    //    https://ipfs.alienworlds.io/ipfs/Qma4cHTj2MW4DVCNXTicc62RfG75atMKGUrLt4TyL8pi69 ,
    //    but unfortunately https://ipfs.io gateway is hardcoded in mission description JSON -
    //    https://ipfs.alienworlds.io/ipfs/QmPPZwSYjGgJKD3zARGTLUVCshdjSBj1mVBuRfodTwvSat

    missionString['Rarity'] = cell[j]
    missionString['MissionType'] = cell[++j]
    missionString['MissionTitle'] = cell[++j]
    missionString['MissionDescription'] = cell[++j]
    missionString['Reward'] = cell[++j]
    missionString['SpaceshipLeaseCost'] = cell[++j]
    missionString['BoardinglengthHours'] = cell[++j]
    missionString['BoardinglengthSeconds'] = cell[++j]
    missionString['DeploymentIntervalsInHours'] = cell[++j]
    missionString['DeploymentintervalInSeconds'] = cell[++j]
    missionString['StarttimeFromGenesisInHours'] = cell[++j]
    missionString['StarttimeFromGenesisInSeconds'] = cell[++j]
    missionString['Duration'] = cell[++j]
    missionString['DurationUnit'] = cell[++j]
    missionString['DurationInSeconds'] = cell[++j]
    missionString['NFTJsonHash'] = cell[++j]
    missionString['NFTImageHash'] = cell[++j]
    missionString['DeployedPer30Days'] = cell[++j]
    missionString['TotalTLMPerMonth'] = cell[++j]
    missionString['NFTJSONLink'] = NFTLinkPrefix + missionString['NFTJsonHash']
    missionString['NFTImageLink'] = NFTLinkPrefix + missionString['NFTImageHash']
    missionsArray.push(missionString)
  }
  return missionsArray
}

function assertEqual(param1, param2, mission) {
  if (param1 !== param2) {
    console.log('NOK: ' + mission + '\t' + param1 + ' !== \n\t\t' + param2)
    errors++
  } else {
    console.log('OK: ' + mission + '\t' + param1 + ' === \n\t\t' + param2)
  }
  // expect(param1).toEqual(param2);
}

function missionTypesRevert(missionTypes) {
  let missionTypesReverted = {}
  missionTypes.forEach((value, key) => {
    missionTypesReverted[value] = key
  })
  console.log('missionTypes: ')
  console.table(missionTypes)
  console.log('missionTypesReverted: ')
  console.table(missionTypesReverted)
  return missionTypesReverted
}

async function validateMissionsJSONvsXLS(missionsJson, missionsXlsArray, missionTypes) {
  console.log('STARTED: validateMissionsJSONvsXLS')
  let missionTypesReverted = missionTypesRevert(missionTypes)
  for (let missionJson of missionsJson.data) {
    for (let i = 0; i < missionsXlsArray.length; i++) {
      let xlsArrayMission = missionsXlsArray[i]
      // find related MissionTitle in XLS
      if (xlsArrayMission['MissionTitle'] === missionJson.attributes.name) {
        console.log('Checking started mission id: ', [missionJson.id])
        console.log('Mission Title: ', [missionJson.attributes.name], 'Mission Type: ', [
          missionTypesReverted[missionJson.attributes.missionType],
        ])
        console.log('missionJson:\n', missionJson)
        // comparing MissionTitle just for logs
        assertEqual(missionJson.attributes.name, xlsArrayMission['MissionTitle'], missionJson.id)
        assertEqual(
          missionTypesReverted[missionJson.attributes.missionType],
          xlsArrayMission['MissionType'],
          missionJson.id
        )
        assertEqual(
          missionJson.attributes.description,
          xlsArrayMission['MissionDescription'],
          missionJson.id
        )
        assertEqual(
          missionJson.attributes.duration,
          parseInt(xlsArrayMission['DurationInSeconds']),
          missionJson.id
        )
        assertEqual(
          missionJson.attributes.endTime - missionJson.attributes.launchTime,
          parseInt(xlsArrayMission['DurationInSeconds']),
          missionJson.id
        )
        assertEqual(
          missionJson.attributes.reward,
          parseInt(xlsArrayMission['Reward']) * 10000000,
          missionJson.id
        )
        assertEqual(
          missionJson.attributes.nftTokenURI,
          xlsArrayMission['NFTJsonHash'],
          missionJson.id
        )

        let NFTJson = await getNFTJson(xlsArrayMission['NFTJSONLink'])
        console.log('NFTJson:\n', NFTJson)
        assertEqual(NFTJson.attributes[0].value, xlsArrayMission['Rarity'], missionJson.id)
        console.log('Checking finished mission id: ', [missionJson.id] + '\n\n')
        break
      }
    }
  }
}

function assertFilesEqual(estFile, actFile, mission) {
  let data1 = fs.readFileSync(estFile).toString('hex')
  let data2
  try {
    data2 = fs.readFileSync(actFile).toString('hex')
  } catch (e) {
    console.error(e.message)
  }
  if (data1 !== data2) {
    // console.log(data1 + ' !==\n' + data2)
    console.log('\x1b[31m%s\x1b[37;40m', 'Mission NOK: ' + mission)
    errors++
  } else {
    console.log(estFile + ' ===\n' + actFile)
    console.log('Mission OK: ' + mission)
  }
}

function mkdir(dirName) {
  // console.log("Checking for directory " + path.join(__dirname, dirName));
  let fileExists = fs.existsSync(path.join(__dirname, dirName))
  if (fileExists) {
    console.log('Directory exists:', path.join(__dirname, dirName))
    return
  }
  // console.log("Directory not exists creating:", path.join(__dirname, dirName));
  fs.mkdirSync(path.join(__dirname, dirName))
}

async function getNFTJson(baseUrl) {
  let statusCode = 200
  let response

  // sleep(500) //delay for avoid IPFS ban
  try {
    response = await request(baseUrl).get('')
  } catch (e) {
    errors++
    console.log(baseUrl + e)
    await sendMessage(e.toString() + '\n' + baseUrl)
    return false
  }
  let statusCodeMsg = response.statusCode + '\tEST: ' + statusCode
  if (statusCode !== response.statusCode) {
    //server error case
    errors++
    statusCodeMsg = statusCodeMsg + ' ERROR!!!'
    console.log(statusCodeMsg)
    return false
  }
  let json = JSON.parse(response.text)
  console.log('JSON: Found NFT Image: ', json.image)
  console.log('JSON: Found NFT Rarity: ', [json.attributes[0].value])
  return json
}

async function getImageUrlFromMissionJson(baseUrl) {
  return (await getNFTJson(baseUrl)).image
}

async function getMissionNftImage(baseUrl, dirName, filename) {
  let dest = __dirname + '/' + dirName + '/' + filename + '.png'
  let statusCode = 200
  let response

  // sleep(1000) //delay for avoid IPFS ban
  try {
    response = await request(baseUrl).get('')
  } catch (e) {
    errors++
    console.log(baseUrl + e)
    let msg = e.toString()
    await sendMessage(e.toString() + '\n' + baseUrl)
    return false
  }
  let statusCodeMsg = response.statusCode + '\tEST: ' + statusCode
  if (statusCode != response.statusCode) {
    //server error case
    statusCodeMsg = statusCodeMsg + ' <<< ERROR!!!'
    console.log('\x1b[31m%s\x1b[37;40m', statusCodeMsg)
    await sendMessage('statusCodeMsg: ' + response.statusCode + '\n' + baseUrl)
    return false
  }
  fs.writeFileSync(dest, response._body)
  console.log('Downloaded file: ' + dest)
  return dest
}

async function validateMissionsXLSNFTCards(missionsXlsArray) {
  let actResultDir = actualResultNFTDirectory
  let estResultDir = estimatedResultNFTDirectory
  try {
    fs.rmSync(path.join(__dirname, actResultDir), { recursive: true, force: true })
  } catch (e) {
    console.log('Nothing to delete. No such file or directory' + actResultDir)
  }
  mkdir(actResultDir)
  for (let i = 0; i < missionsXlsArray.length; i++) {
    let xlsArrayMission = missionsXlsArray[i]
    // find correct mission type in XLS
    console.log('Checking MissionTitle: ' + [xlsArrayMission['MissionTitle']])
    let imageUrl = await getImageUrlFromMissionJson(xlsArrayMission['NFTJSONLink'])
    mkdir(path.join(actResultDir, xlsArrayMission['MissionTitle']))
    await getMissionNftImage(
      imageUrl,
      actResultDir + '/' + xlsArrayMission['MissionTitle'],
      xlsArrayMission['NFTImageHash']
    )
    assertFilesEqual(
      path.join(
        __dirname,
        estResultDir,
        xlsArrayMission['MissionTitle'],
        xlsArrayMission['NFTImageHash'] + '.png'
      ),
      path.join(
        __dirname,
        actResultDir,
        xlsArrayMission['MissionTitle'],
        xlsArrayMission['NFTImageHash'] + '.png'
      ),
      xlsArrayMission['MissionTitle']
    )

    // await sendMessage([xlsArrayMission['MissionTitle']] + 'NFT Image Checked: ')
    // sleep(5000)
    // await sendMessage(missionJson.image)
    console.log('Checking finished for Mission: ' + [xlsArrayMission['MissionTitle']] + '\n\n')
  }
}

async function validateMissionsTest() {
  console.time('timer1')

  let missionsJson = await getMissionsJson(missionsURL)
  console.table(missionTypes)
  //    preconditions
  parseXLSSrcDataToArray(MISSIONSTABLE)
  //    testing
  await validateMissionsJSONvsXLS(missionsJson, missionsArray, missionTypes)
  await validateMissionsXLSNFTCards(missionsArray)
  console.timeEnd('timer1')
  console.log('\x1b[31m%s\x1b[37;40m', 'TOTAL ERRORS: ' + errors)
  //    console.trace();
}

// console.log('\x1b[32m%s\x1b[0m', 'Текст зеленым цветом')
// console.log('\x1b[31m%s\x1b[0m%s\x1b[0m', 'Текст красным цветом')
// console.log('\x1b[34m%s\x1b[0m', 'Текст синим цветом')
// console.log('\x1b[33m%s\x1b[0m', 'Текст желтым цветом')
// console.log('\x1b[32m\x1b[40m%s\x1b[0m', 'Текст зеленым цветом на черном фоне')
// console.log('\x1b[31m\x1b[40m%s\x1b[0m', 'Текст красным цветом на черном фоне')
// console.log('\x1b[34m\x1b[40m%s\x1b[0m', 'Текст синим цветом на черном фоне')
// console.log('\x1b[33m\x1b[40m%s\x1b[0m', 'Текст желтым цветом на черном фоне')

validateMissionsTest()
