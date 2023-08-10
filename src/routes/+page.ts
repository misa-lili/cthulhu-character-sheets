import LZString from 'lz-string'
import type { PageLoad } from './$types'

export const load = (({ url }) => {
	try {
		const data = url.searchParams.get('data')
		if (!data) throw new Error('No data found in URL')
		return decode(data)
	} catch (error) {
		return {
			language: 'ko',
			edition: '7E',
			era: '20s',
			//
			name: '',
			player: '',
			occupation: '',
			age: 0,
			sex: '',
			residence: '',
			birthplace: '',
			//
			characteristics: {
				STR: 40,
				DEX: 50,
				POW: 50,
				CON: 50,
				APP: 60,
				EDU: 60,
				SIZ: 70,
				INT: 80,
				MOV: 8,
				MOVPlus: 0,
				MOVMinus: 0,
			},
			//
			currentHP: 70,
			maxHP: 70,
			currentMP: 70,
			maxMP: 70,
			LUCK: 70,
			startSAN: 70,
			currentSAN: 70,
			maxSAN: 40,
			//
			portraitURL: '',
			//
			isTemporaryInsanity: false,
			isIndefiniteInsanity: false,
			isMajorWound: false,
			isUnconscious: false,
			isDying: false,
			//
			skills: {
				accounting: {
					value: 5,
					isSuccess: false,
				},
				anthropology: {
					value: 1,
					isSuccess: false,
				},
				appraise: {
					value: 5,
					isSuccess: false,
				},
				archaeology: {
					value: 1,
					isSuccess: false,
				},
				art: {
					value: 5,
					isSuccess: false,
				},
				charm: {
					value: 15,
					isSuccess: false,
				},
				climb: {
					value: 20,
					isSuccess: false,
				},
				creditRating: {
					value: 0,
					isSuccess: false,
				},
				cthulhuMythos: {
					value: 0,
					isSuccess: false,
				},
				disguise: {
					value: 5,
					isSuccess: false,
				},
				dodge: {
					value: 20,
					isSuccess: false,
				},
				driveAuto: {
					value: 5,
					isSuccess: false,
				},
				electricalRepair: {
					value: 10,
					isSuccess: false,
				},
				fastTalk: {
					value: 5,
					isSuccess: false,
				},
				fightingBrawl: {
					value: 25,
					isSuccess: false,
				},
				firearmsHandgun: {
					value: 20,
					isSuccess: false,
				},
				firearmsRifle: {
					value: 25,
					isSuccess: false,
				},
				firstAid: {
					value: 30,
					isSuccess: false,
				},
				history: {
					value: 5,
					isSuccess: false,
				},
				intimidate: {
					value: 15,
					isSuccess: false,
				},
				jump: {
					value: 20,
					isSuccess: false,
				},
				languageOwn: {
					value: 40,
					isSuccess: false,
				},
				languageOther: {
					value: 1,
					isSuccess: false,
				},
				law: {
					value: 5,
					isSuccess: false,
				},
				libraryUse: {
					value: 20,
					isSuccess: false,
				},
				listen: {
					value: 20,
					isSuccess: false,
				},
				locksmith: {
					value: 1,
					isSuccess: false,
				},
				mechanicalRepair: {
					value: 10,
					isSuccess: false,
				},
				medicine: {
					value: 1,
					isSuccess: false,
				},
				naturalWorld: {
					value: 10,
					isSuccess: false,
				},
				navigate: {
					value: 10,
					isSuccess: false,
				},
				occult: {
					value: 5,
					isSuccess: false,
				},
				persuade: {
					value: 10,
					isSuccess: false,
				},
				pilot: {
					value: 1,
					isSuccess: false,
				},
				psychoanalysis: {
					value: 1,
					isSuccess: false,
				},
				psychology: {
					value: 10,
					isSuccess: false,
				},
				ride: {
					value: 5,
					isSuccess: false,
				},
				science: {
					value: 1,
					isSuccess: false,
				},
				sleightOfHand: {
					value: 10,
					isSuccess: false,
				},
				spotHidden: {
					value: 25,
					isSuccess: false,
				},
				stealth: {
					value: 20,
					isSuccess: false,
				},
				survival: {
					value: 10,
					isSuccess: false,
				},
				swim: {
					value: 20,
					isSuccess: false,
				},
				throw: {
					value: 20,
					isSuccess: false,
				},
				track: {
					value: 10,
					isSuccess: false,
				},
			},
			weapons: [
				{
					weapon: 'unarmed',
					skill: 60,
					damage: '1d3+db',
					range: 0,
					numberOfAttacks: 1,
					ammo: 0,
					malfunction: false,
				},
			],
			combat: {
				damageBonus: 0,
				build: 0,
			},
			myStory: '',
			backstory: {
				personalDescription: '',
				traits: '',
				ideologyAndBeliefs: '',
				injuriesAndScars: '',
				significantPeople: '',
				phobiasAndManias: '',
				meaningfulLocations: '',
				arcaneTomesSpellsAndArtifacts: '',
				treasuredPossessions: '',
				encountersWithStrangeEntities: '',
			},
			gearAndPossessions: '',
			wealth: {
				spendingLevel: '',
				cash: '',
				assets: '',
			},
			fellowInvestigators: [],
			note: '',
		}
	}
}) satisfies PageLoad

function decode(text: string) {
	try {
		const decoded = LZString.decompressFromEncodedURIComponent(text)
		const obj = JSON.parse(decoded)
		return obj
	} catch (error: any) {
		throw error
	}
}
