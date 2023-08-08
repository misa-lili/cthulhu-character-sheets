<script lang="ts">
	import { t, l, locales, locale } from '$lib/translations'

	const data = {
		edition: '7E',
		era: '20s',
		//
		name: '김결정',
		player: '김학겸',
		occupation: '기자',
		age: 18,
		sex: '남자',
		residence: '서울',
		birthplace: '서울',
		//
		STR: 70,
		DEX: 70,
		POW: 70,
		CON: 70,
		APP: 70,
		EDU: 70,
		SIZ: 70,
		INT: 70,
		MOVE: 70,
		//
		currentHP: 70,
		maxHP: 70,
		currentMP: 70,
		maxMP: 70,
		LUCK: 70,
		startSAN: 70,
		currentSAN: 70,
		insaneSAN: 40,
		//
		portraitURL: 'https://i.imgur.com/eXicOco.png',
		//
		isTemporaryInsanity: false,
		isIndefiniteInsanity: false,
		isMajorWound: false,
		isUnconscious: false,
		isDying: false,
		//
		skills: {
			accounting: {
				value: '',
				isSuccess: false,
			},
			anthropology: {
				value: '',
				isSuccess: false,
			},
			appraise: {
				value: '',
				isSuccess: false,
			},
			archaeology: {
				value: '',
				isSuccess: false,
			},
			art: {
				value: '',
				isSuccess: false,
			},
			charm: {
				value: '',
				isSuccess: false,
			},
			climb: {
				value: '',
				isSuccess: false,
			},
			creditRating: {
				value: '',
				isSuccess: false,
			},
			cthulhuMythos: {
				value: '',
				isSuccess: false,
			},
			disguise: {
				value: '',
				isSuccess: false,
			},
			dodge: {
				value: '',
				isSuccess: false,
			},
			driveAuto: {
				value: '',
				isSuccess: false,
			},
			electricalRepair: {
				value: '',
				isSuccess: false,
			},
			fastTalk: {
				value: '',
				isSuccess: false,
			},
			fightingBrawl: {
				value: '',
				isSuccess: false,
			},
			firearmsHandgun: {
				value: '',
				isSuccess: false,
			},
			firearmsRifle: {
				value: '',
				isSuccess: false,
			},
			firstAid: {
				value: '',
				isSuccess: false,
			},
			history: {
				value: '',
				isSuccess: false,
			},
			intimidate: {
				value: '',
				isSuccess: false,
			},
			jump: {
				value: '',
				isSuccess: false,
			},
			languageOwn: {
				value: '',
				isSuccess: false,
			},
			languageOther: {
				value: '',
				isSuccess: false,
			},
			law: {
				value: '',
				isSuccess: false,
			},
			libraryUse: {
				value: '',
				isSuccess: false,
			},
			listen: {
				value: '',
				isSuccess: false,
			},
			locksmith: {
				value: '',
				isSuccess: false,
			},
			mechanicalRepair: {
				value: '',
				isSuccess: false,
			},
			medicine: {
				value: '',
				isSuccess: false,
			},
			naturalWorld: {
				value: '',
				isSuccess: false,
			},
			navigate: {
				value: '',
				isSuccess: false,
			},
			occult: {
				value: '',
				isSuccess: false,
			},
			persuade: {
				value: '',
				isSuccess: false,
			},
			psychoanalysis: {
				value: '',
				isSuccess: false,
			},
			psychology: {
				value: '',
				isSuccess: false,
			},
			ride: {
				value: '',
				isSuccess: false,
			},
			science: {
				value: '',
				isSuccess: false,
			},
			sleightOfHand: {
				value: '',
				isSuccess: false,
			},
			spotHidden: {
				value: '',
				isSuccess: false,
			},
			stealth: {
				value: '',
				isSuccess: false,
			},
			survival: {
				value: '',
				isSuccess: false,
			},
			swim: {
				value: '',
				isSuccess: false,
			},
			throw: {
				value: '',
				isSuccess: false,
			},
			track: {
				value: '',
				isSuccess: false,
			},
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
	}

	const link = 'https://kit.svelte.dev'
</script>

<select bind:value={$locale}>
	{#each $locales as value}
		<option {value}>{$t(`lang.${value}`)}</option>
	{/each}
</select>

<br />

<div class="title-bar">
	<div class="title-bar-text">Cthulhu Character Sheets @misa-lili</div>
	<div class="title-bar-controls">
		<button aria-label="Minimize" />
		<button aria-label="Maximize" />
		<button aria-label="Close" />
	</div>
</div>

<br />

<div class="field-row">
	<select>
		<option selected>7E</option>
	</select>
</div>

<div class="field-row">
	<select>
		<option selected>20s</option>
		<option>Now</option>
	</select>
</div>

<br />
<div class="field-row">
	<label>{$t('name')}</label>
	<input type="text" value={data.name} />
</div>
<div class="field-row">
	<label>player</label>
	<input type="text" value={data.player} />
</div>
<div class="field-row">
	<label>occupation</label>
	<input type="text" value={data.occupation} />
</div>
<div class="field-row">
	<label>age</label>
	<input type="number" value={data.age} />
</div>
<div class="field-row">
	<label>sex</label>
	<input type="text" value={data.sex} />
</div>
<div class="field-row">
	<label>residence</label>
	<input type="text" value={data.residence} />
</div>
<div class="field-row">
	<label>birthplace</label>
	<input type="text" value={data.birthplace} />
</div>

<br />

<div class="field-row">
	<label>STR</label>
	<input type="number" value={data.STR} />
</div>

<style>
	:global(body) {
		background: #dfdfdf;
	}

	.zoom {
		transform-origin: 0 0;
		transform: scale(1.2);
	}
</style>
