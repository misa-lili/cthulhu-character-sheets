<script lang="ts">
	import { t, l, locales, locale } from '$lib/translations'
	import { sheet, isOwner } from '$lib/store'
	import Fieldset from '$lib/components/Fieldset.svelte'
	import Text from '$lib/components/Text.svelte'
	import File from '$lib/components/File.svelte'

	let files: File[] = []

	async function upload() {
		if (!isOwner) return

		const formdata = new FormData()
		formdata.append('image', files[0])

		const response = await fetch(`/api/v1/images`, {
			method: 'POST',
			body: formdata,
		})

		if (!response.ok) {
			alert($t('Failed to upload image.'))
			console.error(response)
			return
		}

		const body = await response.json()

		if (body.status !== 200) {
			alert($t('Failed to upload image.'))
			console.error(body)
			return
		}

		$sheet.portraitURL = body.message
	}
</script>

<Fieldset legend={$t('portrait')}>
	<div class="mx-auto max-w-[400px] flex flex-col justify-center items-center content-center">
		{#if $sheet.portraitURL}
			<img id="portrait" src={$sheet.portraitURL} style="width:100%" />
		{/if}
		<!-- <Text key={$t('portraitURL')} bind:value={$sheet.portraitURL} readonly={!$isOwner} /> -->
		<File bind:files on:change={upload} disabled={!$isOwner} />
	</div>
</Fieldset>
