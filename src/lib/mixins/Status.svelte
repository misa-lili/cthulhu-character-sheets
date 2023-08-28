<script lang="ts">
	import { t, l, locales, locale } from '$lib/translations'
	import { sheet, isOwner } from '$lib/store'
	import Fieldset from '$lib/components/Fieldset.svelte'
	import Text from '$lib/components/Text.svelte'
	import Row from '$lib/components/Row.svelte'
	import Number from '$lib/components/Number.svelte'
	import Col from '$lib/components/Col.svelte'
	import Checkbox from '$lib/components/Checkbox.svelte'
</script>

<Fieldset legend={$t('status')}>
	<div class="grid grid-cols-5">
		<Checkbox
			textSize="text-xs"
			key={$t('isTemporaryInsanity')}
			bind:value={$sheet.isTemporaryInsanity}
			disabled={!$isOwner}
		/>
		<Checkbox
			textSize="text-xs"
			key={$t('isIndefiniteInsanity')}
			bind:value={$sheet.isIndefiniteInsanity}
			disabled={!$isOwner}
		/>
		<Checkbox
			textSize="text-xs"
			gap="gap-2"
			key={$t('isMajorWound')}
			bind:value={$sheet.isMajorWound}
			disabled={!$isOwner}
		/>
		<Checkbox
			textSize="text-xs"
			gap="gap-2"
			key={$t('isUnconscious')}
			bind:value={$sheet.isUnconscious}
			disabled={!$isOwner}
		/>
		<Checkbox
			textSize="text-xs"
			gap="gap-2"
			key={$t('isDying')}
			bind:value={$sheet.isDying}
			disabled={!$isOwner}
		/>
	</div>
</Fieldset>
