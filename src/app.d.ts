// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	interface Character {
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
		}
		currentHP: number
		maxHP: number
		currentMP: number
		maxMP: number
		LUCK: number
		startSAN: number
		currentSAN: number
		insaneSAN: number
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
			skill: string
			damage: string
			numberOfAttacks: number
			range: number
			ammo: number
			malfunction: boolean
		}[]
		combat: {
			damageBonus: string
			build: string
			dodge: string
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
		gearAndPossessions: string[]
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
