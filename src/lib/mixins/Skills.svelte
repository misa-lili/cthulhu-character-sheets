<script lang="ts">
	import { t, l, locales, locale } from '$lib/translations'
	import { sheet, isOwner } from '$lib/store'
	import Fieldset from '$lib/components/Fieldset.svelte'
	import Text from '$lib/components/Text.svelte'
	import Row from '$lib/components/Row.svelte'
	import Number from '$lib/components/Number.svelte'
	import Col from '$lib/components/Col.svelte'
	import Checkbox from '$lib/components/Checkbox.svelte'
	import Button from '$lib/components/Button.svelte'

	$: skills = Object.entries($sheet?.skills).sort((a, b) => {
		const aKey = $t(a[0])
		const bKey = $t(b[0])
		const result = aKey.localeCompare(bKey)
		return result
	})

	$: colLength = Math.ceil(skills.length / 3)

	function addSkill() {
		if (!$isOwner) return
		const skillName = window.prompt($t('Skill name?'))

		if (!skillName) return
		if ($sheet.skills[skillName]) return alert($t('Skill already exists.'))

		$sheet.skills[skillName] = { value: 0, isOccupation: false }
	}

	function removeSkill(idx: number) {
		if (!$isOwner) return
		const key = skills[idx][0]
		const confirm = window.confirm(`${$t('Remove skill?')} ${$t(key)}`)
		if (!confirm) return
		delete $sheet.skills[key]
		$sheet = $sheet
	}

	function updateSheet() {
		$sheet = $sheet
	}
</script>

<Fieldset legend={$t('skills')}>
	<div
		class="grid grid-cols-3 grid-flow-col gap-x-12 gap-y-3"
		style={`grid-template-rows: repeat(${colLength},minmax(0,1fr));`}
	>
		{#each skills as [key, set], idx}
			<Row>
				<Row cols="1">
					<Checkbox bind:value={set.isSuccess} disabled={!$isOwner} on:change={updateSheet} />
				</Row>
				<Row cols="10">
					<span
						class="pl-1 font-serif text-sm leading-none cursor-pointer"
						on:click={() => removeSkill(idx)}
					>
						{$t(key)}
					</span>
				</Row>
				<Row cols="1">
					<Number
						--width="32px"
						textSize="text-xs"
						bind:value={set.value}
						withHints
						readonly={!$isOwner}
						on:change={updateSheet}
					/>
				</Row>
			</Row>
		{/each}
	</div>
	<Button on:click={addSkill} value={$t('addSkill')} disabled={!$isOwner} />
</Fieldset>
