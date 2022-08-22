ubuntu@binance:~/spaceship-mission-utility-mainnet/src/config/production$ cat mission-config.js
const configHelper = require("../config-helper");
const nftlist = configHelper.getNFTList();
const nftConfig = configHelper.getNFTConfig();

const MathUtils = require('../../utils/MathUtils');
const mathUtils = new MathUtils();
const boostMultiplierPrecision = 1e27;

exports.missionlist = {
    MISSION_1: "Retrieve Ledger",
    MISSION_2: "Reptilian Peace",
    MISSION_3: "Install the Admiral",
    MISSION_4: "The Negotiator",
    MISSION_5: "Peacekeepers",
    MISSION_6: "Space Hub Opening",
    MISSION_7: "Solar Flare",
    MISSION_8: "New Start",
};

exports.missions = {

    [this.missionlist.MISSION_1]: {
        nftSymbol: nftlist.AW_NFT,
        frequency: 23 * 60 * 60,
        launchDelay: 4 * 60 * 60,
        startOffset: 0,
        missionInfo: {
            duration: 7 * 24 * 60 * 60,
            reward: mathUtils.getWeiUnits("15000").toString(),
            spaceshipCost: mathUtils.getWeiUnits("40").toString(),
            boostMultipliers: [
                mathUtils.adjustDecimalPrecision('1', boostMultiplierPrecision).toString(),
            ],
            boostPrices: [
                mathUtils.getWeiUnits("1").toString(),
            ],
            nftInfo: {
                contractAddress: nftConfig[nftlist.AW_NFT].address,
                tokenURI: "QmPPZwSYjGgJKD3zARGTLUVCshdjSBj1mVBuRfodTwvSat"
            },
            description:"Important keys have been stolen by rebel forces. Recover a ledger device from a rebel stronghold without anyone realising",
            name: this.missionlist.MISSION_1,
            missionPower: 0,
            missionType: 8
        },
    },

    [this.missionlist.MISSION_2]: {
        nftSymbol: nftlist.AW_NFT,
        frequency: 27 * 60 * 60,
        launchDelay: 4 * 60 * 60,
        startOffset: 10 * 60 * 60,
        missionInfo: {
            duration: 7 * 24 * 60 * 60,
            reward: mathUtils.getWeiUnits("13000").toString(),
            spaceshipCost: mathUtils.getWeiUnits("40").toString(),
            boostMultipliers: [
                mathUtils.adjustDecimalPrecision('1', boostMultiplierPrecision).toString(),
            ],
            boostPrices: [
                mathUtils.getWeiUnits("1").toString(),
            ],
            nftInfo: {
                contractAddress: nftConfig[nftlist.AW_NFT].address,
                tokenURI: "QmaX32NUecni5qEPPCfoT1iQQHRdm7XMEKRHR8hNSM2dMK"
            },
            description: "A breakaway group of Reptilians have set up a rogue cell in a uncharted region. Examine the situation and make sure the Reptilian Diplomat is guarded on their mission of peace",
            name: this.missionlist.MISSION_2,
            missionPower: 0,
            missionType: 1
        },
    },

    [this.missionlist.MISSION_3]: {
        nftSymbol: nftlist.AW_NFT,
        frequency: 50 * 60 * 60,
        launchDelay: 6 * 60 * 60,
        startOffset: 5 * 60 * 60,
        missionInfo: {
            duration: 14 * 24 * 60 * 60,
            reward: mathUtils.getWeiUnits("18000").toString(),
            spaceshipCost: mathUtils.getWeiUnits("200").toString(),
            boostMultipliers: [
                mathUtils.adjustDecimalPrecision('1', boostMultiplierPrecision).toString(),
            ],
            boostPrices: [
                mathUtils.getWeiUnits("1").toString(),
            ],
            nftInfo: {
                contractAddress: nftConfig[nftlist.AW_NFT].address,
                tokenURI: "QmWuzETbQwb43kibxTZEUrTbiH4inGzSN9ECBtN16XnbRf"
            },
            description: "Leaders are always a target - Transport a Federation admiral securely to the new planet government space station",
            name: this.missionlist.MISSION_3,
            missionPower: 0,
            missionType: 5
        },
    },

    [this.missionlist.MISSION_4]: {
        nftSymbol: nftlist.AW_NFT,
        frequency: 55 * 60 * 60,
        launchDelay: 6 * 60 * 60,
        startOffset: 25 * 60 * 60,
        missionInfo: {
            duration: 14 * 24 * 60 * 60,
            reward: mathUtils.getWeiUnits("20000").toString(),
            spaceshipCost: mathUtils.getWeiUnits("200").toString(),
            boostMultipliers: [
                mathUtils.adjustDecimalPrecision('1', boostMultiplierPrecision).toString(),
            ],
            boostPrices: [
                mathUtils.getWeiUnits("1").toString(),
            ],
            nftInfo: {
                contractAddress: nftConfig[nftlist.AW_NFT].address,
                tokenURI: "QmbsHuZH1Cgsppfr7WPArcujWkUrqDfsKywRRNTfH7VcXg"
            },
            description: "Space is scary enough even without the unpredictable melting pot of interspecies quarrels. Negotiate with a Alien Terrorist intent on blowing themselves up in a Space station.",
            name: this.missionlist.MISSION_4,
            missionPower: 0,
            missionType: 3
        },
    },
    [this.missionlist.MISSION_5]: {
        nftSymbol: nftlist.AW_NFT,
        frequency: 85 * 60 * 60,
        launchDelay: 8 * 60 * 60,
        startOffset: 15 * 60 * 60,
        missionInfo: {
            duration: 28 * 24 * 60 * 60,
            reward: mathUtils.getWeiUnits("30000").toString(),
            spaceshipCost: mathUtils.getWeiUnits("1000").toString(),
            boostMultipliers: [
                mathUtils.adjustDecimalPrecision('1', boostMultiplierPrecision).toString(),
            ],
            boostPrices: [
                mathUtils.getWeiUnits("1").toString(),
            ],
            nftInfo: {
                contractAddress: nftConfig[nftlist.AW_NFT].address,
                tokenURI: "QmREjwMToyDHxx87C1CN9U1JEFLVCcnkpufFsgFQMTTbtm"
            },
            description: "The eternal battle continues and Reptilians and Greys are fighting over Trilium, send in your peacekeeper droids",
            name: this.missionlist.MISSION_5,
            missionPower: 0,
            missionType: 2
        },
    },

    [this.missionlist.MISSION_6]: {
        nftSymbol: nftlist.AW_NFT,
        frequency: 72 * 60 * 60,
        launchDelay: 8 * 60 * 60,
        startOffset: 47 * 60 * 60,
        missionInfo: {
            duration: 28 * 24 * 60 * 60,
            reward: mathUtils.getWeiUnits("60000").toString(),
            spaceshipCost: mathUtils.getWeiUnits("1000").toString(),
            boostMultipliers: [
                mathUtils.adjustDecimalPrecision('1', boostMultiplierPrecision).toString(),
            ],
            boostPrices: [
                mathUtils.getWeiUnits("1").toString(),
            ],
            nftInfo: {
                contractAddress: nftConfig[nftlist.AW_NFT].address,
                tokenURI: "QmP43h1pgZUNgqKaQdznfTdnvExsBu9CXZVcptisu6Z2QB"
            },
            description: "Another Liberation celebration event - Provide additional security to the ceremonial opening of the interplanetary space hub orbiting the planet",
            name: this.missionlist.MISSION_6,
            missionPower: 0,
            missionType: 7
        },
    },

    [this.missionlist.MISSION_7]: {
        nftSymbol: nftlist.AW_NFT,
        frequency: 220 * 60 * 60,
        launchDelay: 12 * 60 * 60,
        startOffset: 24 * 60 * 60,
        missionInfo: {
            duration: 84 * 24 * 60 * 60,
            reward: mathUtils.getWeiUnits("75000").toString(),
            spaceshipCost: mathUtils.getWeiUnits("5000").toString(),
            boostMultipliers: [
                mathUtils.adjustDecimalPrecision('1', boostMultiplierPrecision).toString(),
            ],
            boostPrices: [
                mathUtils.getWeiUnits("1").toString(),
            ],
            nftInfo: {
                contractAddress: nftConfig[nftlist.AW_NFT].address,
                tokenURI: "QmSN6B2oDTXDMektfBsNGrFC2n9Kzby8hxBgUi8ZuRV6B6"
            },
            description: "The Delta Solaris star has recorded unusual activity - A huge solar flare is expected to hit the planet - position a deflector shield to prevent damage to mining rigs",
            name: this.missionlist.MISSION_7,
            missionPower: 0,
            missionType: 6
        },
    },

    [this.missionlist.MISSION_8]: {
        nftSymbol: nftlist.AW_NFT,
        frequency: 210 * 60 * 60,
        launchDelay: 12 * 60 * 60,
        startOffset: 114 * 60 * 60,
        missionInfo: {
            duration: 84 * 24 * 60 * 60,
            reward: mathUtils.getWeiUnits("75000").toString(),
            spaceshipCost: mathUtils.getWeiUnits("5000").toString(),
            boostMultipliers: [
                mathUtils.adjustDecimalPrecision('1', boostMultiplierPrecision).toString(),
            ],
            boostPrices: [
                mathUtils.getWeiUnits("1").toString(),
            ],
            nftInfo: {
                contractAddress: nftConfig[nftlist.AW_NFT].address,
                tokenURI: "Qme2VkoTSrZfSbjaJxmQLFKUHrpUuhoFQ4F92YAU9vq69t"
            },
            description: "Brave adventurers are among the first to set up home on a newly discovered planet - Transport 10000 colonists to the new planet",
            name: this.missionlist.MISSION_8,
            missionPower: 0,
            missionType: 5
        },
    }
};