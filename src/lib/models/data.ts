export const initialData: Sheet = {
	language: 'en',
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
		STR: 0,
		DEX: 0,
		POW: 0,
		CON: 0,
		APP: 0,
		EDU: 0,
		SIZ: 0,
		INT: 0,
		MOV: 0,
		MOVPlus: null,
		MOVMinus: null,
	},
	//
	currentHP: 0,
	maxHP: 0,
	currentMP: 0,
	maxMP: 0,
	startLUCK: 0,
	LUCK: 0,
	insaneSAN: 0,
	startSAN: 0,
	currentSAN: 0,
	maxSAN: 0,
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
			value: 0,
			isSuccess: false,
		},
		anthropology: {
			value: 0,
			isSuccess: false,
		},
		appraise: {
			value: 0,
			isSuccess: false,
		},
		archaeology: {
			value: 0,
			isSuccess: false,
		},
		art: {
			value: 0,
			isSuccess: false,
		},
		charm: {
			value: 0,
			isSuccess: false,
		},
		climb: {
			value: 0,
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
			value: 0,
			isSuccess: false,
		},
		dodge: {
			value: 0,
			isSuccess: false,
		},
		driveAuto: {
			value: 0,
			isSuccess: false,
		},
		electricalRepair: {
			value: 0,
			isSuccess: false,
		},
		fastTalk: {
			value: 0,
			isSuccess: false,
		},
		fightingBrawl: {
			value: 0,
			isSuccess: false,
		},
		firearmsHandgun: {
			value: 0,
			isSuccess: false,
		},
		firearmsRifle: {
			value: 0,
			isSuccess: false,
		},
		firstAid: {
			value: 0,
			isSuccess: false,
		},
		history: {
			value: 0,
			isSuccess: false,
		},
		intimidate: {
			value: 0,
			isSuccess: false,
		},
		jump: {
			value: 0,
			isSuccess: false,
		},
		languageOwn: {
			value: 0,
			isSuccess: false,
		},
		languageOther: {
			value: 0,
			isSuccess: false,
		},
		law: {
			value: 0,
			isSuccess: false,
		},
		libraryUse: {
			value: 0,
			isSuccess: false,
		},
		listen: {
			value: 0,
			isSuccess: false,
		},
		locksmith: {
			value: 0,
			isSuccess: false,
		},
		mechanicalRepair: {
			value: 0,
			isSuccess: false,
		},
		medicine: {
			value: 0,
			isSuccess: false,
		},
		naturalWorld: {
			value: 0,
			isSuccess: false,
		},
		navigate: {
			value: 0,
			isSuccess: false,
		},
		occult: {
			value: 0,
			isSuccess: false,
		},
		persuade: {
			value: 0,
			isSuccess: false,
		},
		pilot: {
			value: 0,
			isSuccess: false,
		},
		psychoanalysis: {
			value: 0,
			isSuccess: false,
		},
		psychology: {
			value: 0,
			isSuccess: false,
		},
		ride: {
			value: 0,
			isSuccess: false,
		},
		science: {
			value: 0,
			isSuccess: false,
		},
		sleightOfHand: {
			value: 0,
			isSuccess: false,
		},
		spotHidden: {
			value: 0,
			isSuccess: false,
		},
		stealth: {
			value: 0,
			isSuccess: false,
		},
		survival: {
			value: 0,
			isSuccess: false,
		},
		swim: {
			value: 0,
			isSuccess: false,
		},
		throw: {
			value: 0,
			isSuccess: false,
		},
		track: {
			value: 0,
			isSuccess: false,
		},
	},
	weapons: [
		{
			weapon: 'unarmed',
			skill: 0,
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
