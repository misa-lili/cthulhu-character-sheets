// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	interface Skill {
		isEditable: boolean
		value: number | null
		name: string
		isSuccess: boolean
	}

	interface Weapon {
		name: string
		isEditable: boolean
		skill: number | null
		damage: string
		numberOfAttacks: number | null
		range: number | null
		ammo: number | null
		malfunction: boolean
	}

	interface Sheet {
		language: string
		edition: string
		era: string
		name: string
		player: string
		occupation: string
		age: number | null
		sex: string
		residence: string
		birthplace: string
		characteristics: {
			STR: number | null
			DEX: number | null
			POW: number | null
			CON: number | null
			APP: number | null
			EDU: number | null
			SIZ: number | null
			INT: number | null
			MOV: number | null
			MOVPlus: string | null
			MOVMinus: string | null
		}
		currentHP: number | null
		maxHP: number | null
		currentMP: number | null
		maxMP: number | null
		startLUCK: number | null
		LUCK: number | null
		insaneSAN: number | null
		startSAN: number | null
		currentSAN: number | null
		maxSAN: number | null
		portraitURL: string
		isTemporaryInsanity: boolean
		isIndefiniteInsanity: boolean
		isMajorWound: boolean
		isUnconscious: boolean
		isDying: boolean
		skillMemo: string
		skills: {
			[key: string]: Skill
		}
		weapons: Weapon[]
		combat: {
			damageBonus: number | null
			build: number | null
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
