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
	import Span from '$lib/components/Span.svelte'
	import Textarea from '$lib/components/Textarea.svelte'
	import NumberDense from '$lib/components/NumberDense.svelte'

	$: sortedSkills = Object.entries($sheet?.skills).sort((a, b) => {
		const aKey = $t(a[0])
		const bKey = $t(b[0])
		const result = aKey.localeCompare(bKey)
		return result
	})

	function addSkill() {
		// if (!$isOwner) return
		// const skillName = window.prompt($t('Skill name?'))
		// if (!skillName) return
		// if ($sheet.skills[skillName]) return alert($t('Skill already exists.'))
		// $sheet.skills = { key: skillName, name: skillName, value: 0, isOccupation: false }
	}

	function editSkill(event: InputEvent, idx: number) {
		// if (!$isOwner) return
		// const key = sortedSkills[idx][0]
		// const value = (event.target as HTMLInputElement).innerText
		// if (value === '') return removeSkill(idx)
		// $sheet.skills[key].name = value
		// $sheet = $sheet
	}

	function removeSkill(idx: number) {
		// if (!$isOwner) return
		// const key = sortedSkills[idx].key
		// const name = sortedSkills[idx].name
		// const confirm = window.confirm(`${$t('Remove skill?')} ${name}`)
		// if (!confirm) return
		// delete $sheet.skills[key]
		// $sheet = $sheet
	}

	function updateSheet() {
		$sheet = $sheet
	}
</script>

<Fieldset legend={$t('skills')}>
	<!-- <Textarea /> -->
	<div class="grid gap-y-1 gap-x-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
		{#each sortedSkills as [key, set], idx}
			<div class="flex items-center gap-2">
				<div>
					<Checkbox
						--width="1rem"
						--height="1rem"
						bind:value={set.isSuccess}
						disabled={!$isOwner}
						on:change={updateSheet}
						tabindex={-1}
					/>
				</div>
				<div class="flex-grow items-center font-serif text-xs leading-none text-left">
					<Span
						tabindex={-1}
						value={set.name.replace(/\(..\%\)/, '')}
						readonly={!$isOwner}
						on:input={(event) => editSkill(event, idx)}
					/>
				</div>
				<div class="text-[10px] leading-none whitespace-nowrap">
					<NumberDense bind:value={set.value} readonly={!$isOwner} on:input={updateSheet} />
				</div>
			</div>
		{/each}
	</div>
	<br />
	<Button on:click={addSkill} value={$t('addSkill')} disabled={!$isOwner} />
</Fieldset>
