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

	$: skills = Object.entries($sheet?.skills)
		.sort((a, b) => {
			const aKey = $t(a[0])
			const bKey = $t(b[0])
			const result = aKey.localeCompare(bKey)
			return result
		})
		.map(([key, set]) => {
			if (set.name === undefined) {
				return [
					key,
					{
						...set,
						name: $t(key),
					},
				]
			} else {
				return [key, set]
			}
		})

	function addSkill() {
		if (!$isOwner) return
		const skillName = window.prompt($t('Skill name?'))

		if (!skillName) return
		if ($sheet.skills[skillName]) return alert($t('Skill already exists.'))

		$sheet.skills[skillName] = { name: skillName, value: 0, isOccupation: false }
	}

	function editSkill(event: InputEvent, idx: number) {
		if (!$isOwner) return

		const key = skills[idx][0]
		const value = (event.target as HTMLInputElement).innerText

		if (value === '') return removeSkill(idx)

		$sheet.skills[key].name = value
		$sheet = $sheet
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
	<div class="grid gap-y-1 gap-x-3 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
		{#each skills as [key, set], idx (key)}
			<div class="flex justify-between items-center gap-1">
				<Checkbox
					--width="1rem"
					--height="1rem"
					bind:value={set.isSuccess}
					disabled={!$isOwner}
					on:change={updateSheet}
				/>
				<div
					class="flex-grow items-center font-serif text-xs leading-none text-left overflow-scroll"
				>
					<Span value={set.name} readonly={!$isOwner} on:input={(event) => editSkill(event, idx)} />
				</div>
				<div class="w-[56px]">
					<Number
						--width="28px"
						--width--hint="28px"
						textSize="text-xs"
						bind:value={set.value}
						withHints
						readonly={!$isOwner}
						on:change={updateSheet}
					/>
				</div>
			</div>
		{/each}
	</div>
	<Button on:click={addSkill} value={$t('addSkill')} disabled={!$isOwner} />
</Fieldset>
