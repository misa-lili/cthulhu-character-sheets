// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	interface Sheet {
		language: string
		edition: string
		era: string
		name: string
		player: string
		occupation: string
		age: number
		sex: string
		residence: string
		birthplace: string
		characteristics: {
			STR: number
			DEX: number
			POW: number
			CON: number
			APP: number
			EDU: number
			SIZ: number
			INT: number
			MOV: number
			MOVPlus: string | null
			MOVMinus: string | null
		}
		currentHP: number
		maxHP: number
		currentMP: number
		maxMP: number
		LUCK: number
		startSAN: number
		currentSAN: number
		maxSAN: number
		portraitURL: string
		isTemporaryInsanity: boolean
		isIndefiniteInsanity: boolean
		isMajorWound: boolean
		isUnconscious: boolean
		isDying: boolean
		skills: {
			[key: string]: {
				value: number
				isSuccess: boolean
			}
		}
		weapons: {
			weapon: string
			skill: number
			damage: string
			numberOfAttacks: number
			range: number
			ammo: number
			malfunction: boolean
		}[]
		combat: {
			damageBonus: number
			build: number
		}
		myStory: string
		backstory: {
			personalDescription: string
			traits: string
			ideologyAndBeliefs: string
			injuriesAndScars: string
			significantPeople: string
			phobiasAndManias: string
			meaningfulLocations: string
			arcaneTomesSpellsAndArtifacts: string
			treasuredPossessions: string
			encountersWithStrangeEntities: string
		}
		gearAndPossessions: string
		wealth: {
			spendingLevel: string
			cash: string
			assets: string
		}
		fellowInvestigators: {
			character: string
			player: string
		}[]
		note: string
	}
}

export {}
