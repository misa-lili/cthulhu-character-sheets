<script lang="ts">
	import { t, l, locales, locale } from '$lib/translations'
	import { sheet, isOwner } from '$lib/store'
	import Fieldset from '$lib/components/Fieldset.svelte'
	import Text from '$lib/components/Text.svelte'
	import Row from '$lib/components/Row.svelte'
	import Number from '$lib/components/Number.svelte'
	import Col from '$lib/components/Col.svelte'
</script>

<Fieldset legend={$t('characteristics')}>
	<div class="grid gap-y-3 gap-x-9 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
		<Number
			key={$t('STR')}
			bind:value={$sheet.characteristics.STR}
			withHints
			readonly={!$isOwner}
		/>
		<Number
			key={$t('CON')}
			bind:value={$sheet.characteristics.CON}
			withHints
			readonly={!$isOwner}
		/>
		<Number
			key={$t('DEX')}
			bind:value={$sheet.characteristics.DEX}
			withHints
			readonly={!$isOwner}
		/>
		<Number
			key={$t('INT')}
			bind:value={$sheet.characteristics.INT}
			withHints
			readonly={!$isOwner}
		/>
		<Number
			key={$t('SIZ')}
			bind:value={$sheet.characteristics.SIZ}
			withHints
			readonly={!$isOwner}
		/>
		<Number
			key={$t('POW')}
			bind:value={$sheet.characteristics.POW}
			withHints
			readonly={!$isOwner}
		/>
		<Number
			key={$t('APP')}
			bind:value={$sheet.characteristics.APP}
			withHints
			readonly={!$isOwner}
		/>
		<Number
			key={$t('EDU')}
			bind:value={$sheet.characteristics.EDU}
			withHints
			readonly={!$isOwner}
		/>
	</div>
</Fieldset>
