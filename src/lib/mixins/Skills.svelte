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

	$: if ($locale) {
		translate()
	}

	function translate() {
		$sheet.skills = Object.entries($sheet.skills).reduce((acc, [key, skill]) => {
			const translatedKey = $t(key)
			const translatedName = $t(skill.name.toLowerCase())
			if (skill.isEditable) {
				if (translatedKey === translatedName) {
					acc[key] = { ...skill, name: $t(key) }
					return acc
				}
			}

			acc[key] = skill
			return acc
		}, {})
	}

	function sortNames(a, b) {
		const aKey = a[1].isEditable ? $t(a[1].name) : $t(a[0])
		const bKey = b[1].isEditable ? $t(b[1].name) : $t(b[0])
		const result = aKey.localeCompare(bKey)
		return result
	}

	function addSkill() {
		if (!$isOwner) return
		const skill: Skill = {
			name: '_____',
			initValue: 0,
			isEditable: true,
			isSuccess: false,
			value: null,
		}
		$sheet.skills[crypto.randomUUID()] = skill
	}

	function editSkill(event: InputEvent, key: string) {
		if (!$isOwner) return
		const value = (event.target as HTMLInputElement).innerText
		if (value === '') return removeSkill(key)
	}

	function removeSkill(key: string) {
		if (!$isOwner) return
		const name = $sheet.skills[key].name
		const confirm = window.confirm(`${$t('Remove skill?')} ${name}`)
		if (!confirm) return
		delete $sheet.skills[key]
		$sheet = $sheet
	}

	function checkTranslation(event, key: string) {
		if (!$isOwner) return
		const name = $sheet.skills[key].name

		const translated = $t(name.toLowerCase())

		if (translated !== name.toLowerCase()) {
			$sheet.skills[key].name = translated
		}
	}

	function onInput(event: InputEvent, key: string) {
		editSkill(event, key)
		checkTranslation(event, key)
	}

	function updateSheet() {
		// TODO: 검증
		$sheet = $sheet
	}
</script>

<Fieldset legend={$t('skills')}>
	<Textarea bind:value={$sheet.skillMemo} readonly={!$isOwner} />
	<br />
	<div class="grid gap-y-1 gap-x-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
		{#each Object.entries($sheet.skills).sort(sortNames) as [key, set], idx (key)}
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
					{#if set.isEditable}
						<span class="bg-slate-200">
							<Span
								tabindex={-1}
								bind:value={set.name}
								readonly={!$isOwner}
								on:input={(event) => onInput(event, key)}
								on:blur={() => {
									$sheet = $sheet
								}}
							/>
						</span>
					{:else}
						<span class="cursor-not-allowed">
							{$t(key)}
						</span>
					{/if}
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
