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
	<Row gap="12">
		<Col>
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
		</Col>

		<Col>
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
		</Col>
		<Col>
			<Row>
				<Number key={$t('currentHP')} bind:value={$sheet.currentHP} readonly={!$isOwner} />
				<Number key={$t('maxHP')} bind:value={$sheet.maxHP} readonly={!$isOwner} />
			</Row>
			<Row>
				<Number key={$t('currentMP')} bind:value={$sheet.currentMP} readonly={!$isOwner} />
				<Number key={$t('maxMP')} bind:value={$sheet.maxMP} readonly={!$isOwner} />
			</Row>
			<Row>
				<Number key={$t('LUCK')} bind:value={$sheet.LUCK} readonly={!$isOwner} />
				<Number key={$t('startLUCK')} bind:value={$sheet.startLUCK} readonly={!$isOwner} />
			</Row>
			<Row>
				<Number key={$t('currentSAN')} bind:value={$sheet.currentSAN} readonly={!$isOwner} />
				<Number key={$t('startSAN')} bind:value={$sheet.startSAN} readonly={!$isOwner} />
				<Number key={$t('insaneSAN')} bind:value={$sheet.insaneSAN} readonly={!$isOwner} />
				<Number key={$t('maxSAN')} bind:value={$sheet.maxSAN} readonly={!$isOwner} />
			</Row>
		</Col>
	</Row>
</Fieldset>
