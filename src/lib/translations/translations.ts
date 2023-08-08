import lang from './lang.json'

export default {
	en: {
		edition: 'edition',
		era: 'era',
		//
		name: 'name',
		player: 'player',
		occupation: 'occupation',
		age: 'age',
		sex: 'sex',
		residence: 'residence',
		birthplace: 'birthplace',
		//
		STR: '근력',
		CON: '건강',
		SIZ: '크기',
		DEX: '민첩',
		APP: '외모',
		EDU: '교육',
		INT: '지능',
		POW: '정신',
		MOVE: '이동',
		//
		currentHP: '현재 체력',
		maxHP: '최대 체력',
		currentMP: '현재 마력',
		maxMP: '최대 마력',
		LUCK: '행운',
		startSAN: '시작 이성',
		currentSAN: '현재 이성',
		insaneSAN: '광기 이성',
		//
		portraitURL: '초상화 주소',
		//
		isMajorWound: '중상',
		isUnconscious: '의식상실',
		isDying: '빈사',
		isTemporaryInsanity: '일시적 광기',
		isIndefiniteInsanity: '장기적 광기',
		//
		skills: {
			accounting: '회계',
			anthropology: '인류학',
			appraise: '감정',
			archaeology: '고고학',
			art: '예술',
			charm: '매혹',
			climb: '오르기',
			creditRating: '신용등급',
			cthulhuMythos: '크툴루 신화',
			disguise: '위장',
			dodge: '회피',
			driveAuto: '운전',
			electricalRepair: '전기 수리',
			fastTalk: '말재주',
			fightingBrawl: '싸움: 근접',
			firearmsHandgun: '총기: 권총',
			firearmsRifle: '총기: 소총',
			firstAid: '응급 처치',
			history: '역사',
			intimidate: '위협',
			jump: '점프',
			languageOwn: '모국어',
			languageOther: '외국어',
			law: '법률',
			libraryUse: '도서관 이용',
			listen: '듣기',
			locksmith: '열쇠공',
			mechanicalRepair: '기계 수리',
			medicine: '의학',
			naturalWorld: '자연',
			navigate: '항법',
			occult: '오컬트',
			persuade: '설득',
			psychoanalysis: '정신분석',
			psychology: '심리학',
			ride: '타기',
			science: '과학',
			sleightOfHand: '손재주',
			spotHidden: '은신 찾기',
			stealth: '은밀행동',
			survival: '생존술',
			swim: '수영',
			throw: '투척',
			track: '추적',
		},
		//
		weapons: [
			{
				weapon: '맨손',
				skill: '근력',
				damage: '1d3',
				numberOfAttacks: '1',
				range: '0',
				ammo: '0',
				malfunctions: '0',
			},
		],
		combat: {
			damageBonus: '',
			build: '',
			dodge: '',
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
		gearAndPossessions: ['', ''],
		wealth: {
			spendingLevel: '',
			cash: '',
			assets: '',
		},
		fellowInvestigators: [{ character: '', player: '' }],
		note: '',
	},
	ko: {
		edition: '에디션',
		era: '시대',
		//
		name: '이름',
		player: '플레이어',
		occupation: '직업',
		age: '나이',
		sex: '성별',
		residence: '주거지',
		birthplace: '출생지',
		//
		STR: '근력',
		CON: '건강',
		SIZ: '크기',
		DEX: '민첩',
		APP: '외모',
		EDU: '교육',
		INT: '지능',
		POW: '정신',
		MOVE: '이동',
		//
		currentHP: '현재 체력',
		maxHP: '최대 체력',
		currentMP: '현재 마력',
		maxMP: '최대 마력',
		LUCK: '행운',
		startSAN: '시작 이성',
		currentSAN: '현재 이성',
		insaneSAN: '광기 이성',
		//
		portraitURL: '초상화 주소',
		//
		isMajorWound: '중상',
		isUnconscious: '의식상실',
		isDying: '빈사',
		isTemporaryInsanity: '일시적 광기',
		isIndefiniteInsanity: '장기적 광기',
		//
		skills: {
			accounting: '회계',
			anthropology: '인류학',
			appraise: '감정',
			archaeology: '고고학',
			art: '예술',
			charm: '매혹',
			climb: '오르기',
			creditRating: '신용등급',
			cthulhuMythos: '크툴루 신화',
			disguise: '위장',
			dodge: '회피',
			driveAuto: '운전',
			electricalRepair: '전기 수리',
			fastTalk: '말재주',
			fightingBrawl: '싸움: 근접',
			firearmsHandgun: '총기: 권총',
			firearmsRifle: '총기: 소총',
			firstAid: '응급 처치',
			history: '역사',
			intimidate: '위협',
			jump: '점프',
			languageOwn: '모국어',
			languageOther: '외국어',
			law: '법률',
			libraryUse: '도서관 이용',
			listen: '듣기',
			locksmith: '열쇠공',
			mechanicalRepair: '기계 수리',
			medicine: '의학',
			naturalWorld: '자연',
			navigate: '항법',
			occult: '오컬트',
			persuade: '설득',
			psychoanalysis: '정신분석',
			psychology: '심리학',
			ride: '타기',
			science: '과학',
			sleightOfHand: '손재주',
			spotHidden: '은신 찾기',
			stealth: '은밀행동',
			survival: '생존술',
			swim: '수영',
			throw: '투척',
			track: '추적',
		},
		//
		weapons: [
			{
				weapon: '맨손',
				skill: '근력',
				damage: '1d3',
				numberOfAttacks: '1',
				range: '0',
				ammo: '0',
				malfunctions: '0',
			},
		],
		combat: {
			damageBonus: '',
			build: '',
			dodge: '',
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
		gearAndPossessions: ['', ''],
		wealth: {
			spendingLevel: '',
			cash: '',
			assets: '',
		},
		fellowInvestigators: [{ character: '', player: '' }],
		note: '',
	},
}
