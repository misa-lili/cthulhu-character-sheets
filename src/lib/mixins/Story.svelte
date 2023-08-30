<script lang="ts">
	import { t, l, locales, locale } from '$lib/translations'
	import { sheet, isOwner } from '$lib/store'
	import Fieldset from '$lib/components/Fieldset.svelte'
	import Textarea from '$lib/components/Textarea.svelte'
</script>

<Fieldset legend={$t('myStory')}>
	<Textarea bind:value={$sheet.myStory} readonly={!$isOwner} />
</Fieldset>

<Fieldset legend={$t('backstory')}>
	<div
		class="grid grid-flow-row-dense gap-y-3 gap-x-9 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2"
	>
		<Textarea
			key={$t('personalDescription')}
			bind:value={$sheet.backstory.personalDescription}
			readonly={!$isOwner}
		/>
		<Textarea key={$t('traits')} bind:value={$sheet.backstory.traits} readonly={!$isOwner} />
		<Textarea
			key={$t('ideologyAndBeliefs')}
			bind:value={$sheet.backstory.ideologyAndBeliefs}
			readonly={!$isOwner}
		/>
		<Textarea
			key={$t('injuriesAndScars')}
			bind:value={$sheet.backstory.injuriesAndScars}
			readonly={!$isOwner}
		/>
		<Textarea
			key={$t('significantPeople')}
			bind:value={$sheet.backstory.significantPeople}
			readonly={!$isOwner}
		/>
		<Textarea
			key={$t('phobiasAndManias')}
			bind:value={$sheet.backstory.phobiasAndManias}
			readonly={!$isOwner}
		/>
		<Textarea
			key={$t('meaningfulLocations')}
			bind:value={$sheet.backstory.meaningfulLocations}
			readonly={!$isOwner}
		/>
		<Textarea
			key={$t('arcaneTomesSpellsAndArtifacts')}
			bind:value={$sheet.backstory.arcaneTomesSpellsAndArtifacts}
			readonly={!$isOwner}
		/>
		<Textarea
			key={$t('treasuredPossessions')}
			bind:value={$sheet.backstory.treasuredPossessions}
			readonly={!$isOwner}
		/>
		<Textarea
			key={$t('encountersWithStrangeEntities')}
			bind:value={$sheet.backstory.encountersWithStrangeEntities}
			readonly={!$isOwner}
		/>
		<Textarea
			key={$t('gearAndPossessions')}
			bind:value={$sheet.gearAndPossessions}
			readonly={!$isOwner}
		/>
		<Textarea
			key={$t('spendingLevel')}
			bind:value={$sheet.wealth.spendingLevel}
			readonly={!$isOwner}
		/>
		<Textarea key={$t('cash')} bind:value={$sheet.wealth.cash} readonly={!$isOwner} />
		<Textarea key={$t('assets')} bind:value={$sheet.wealth.assets} readonly={!$isOwner} />
	</div>
</Fieldset>
