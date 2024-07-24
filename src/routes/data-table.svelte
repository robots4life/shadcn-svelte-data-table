<script lang="ts">
	import { menuData } from '$lib/db';
	import { createTable, Render, Subscribe } from 'svelte-headless-table';
	import { readable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';
	import { addPagination, addSortBy } from 'svelte-headless-table/plugins';
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
	import ArrowUp from 'lucide-svelte/icons/arrow-up';
	import ArrowDown from 'lucide-svelte/icons/arrow-down';
	import { Button } from '$lib/components/ui/button';

	type Menu = {
		id: string;
		date: string;
		meals: Meal[];
	};

	type Meal = {
		breakfast?: boolean | string;
		breakfastPrice?: number;
		lunch?: boolean | string;
		lunchPrice?: number;
		dinner?: boolean | string;
		dinnerPrice?: number;
	};

	// menus will be typed, not so the imported menuData
	const menus: Menu[] = menuData;
	console.log('menus : ', menus);

	// initialize table with addPagination plugin
	const table = createTable(readable(menus), {
		page: addPagination({ initialPageSize: 5 }),
		sort: addSortBy()
	});
	console.log('table : ', table);

	// create columns for data table
	const columns = table.createColumns([
		table.column({
			accessor: ({ date }) => date,
			header: 'Date'
		}),
		table.column({
			accessor: ({ meals }) => meals[0].breakfast,
			header: 'Breakfast',
			plugins: {
				sort: {
					disable: true
				}
			}
		}),
		table.column({
			accessor: ({ meals }) => meals[0].breakfastPrice,
			header: 'Breakfast Price',
			cell: ({ value }) => {
				if (typeof value === 'number') {
					const formatted = new Intl.NumberFormat('en-US', {
						style: 'currency',
						currency: 'USD'
					}).format(value);
					return formatted;
				} else {
					return '';
				}
			},
			plugins: {
				sort: {
					disable: true
				}
			}
		})
	]);
	console.log('columns : ', columns);

	// add pluginStates
	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);

	// add pagination states
	// the props object only has the sort properties if this line is commented out
	// enable the pagination and see the props object not having the sort property any more
	// const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;

	// add sort states
	const { sortKeys } = pluginStates.sort;
</script>

<div class="overflow-clip rounded-md border">
	<Table.Root {...$tableAttrs}>
		<Table.Header>
			{#each $headerRows as headerRow}
				<Subscribe rowAttrs={headerRow.attrs()}>
					<Table.Row>
						{#each headerRow.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
								<Table.Head {...attrs}>
									{#if cell.id === 'Date'}
										<!-- the props object is missing the sort property when pagination is enabled -->
										<pre>{JSON.stringify(props, null, 2)}</pre>
										<Button variant="ghost" on:click={props.sort.toggle}>
											<Render of={cell.render()} />
											<!-- because of the sort property missing the ArrowUp or ArrowDown icons never show -->
											{#if props.sort.order === 'asc'}
												<ArrowUp class={'ml-2 h-4 w-4'} />
											{:else}
												<ArrowDown class={'ml-2 h-4 w-4'} />
											{/if}
											<ArrowUpDown class={'ml-2 h-4 w-4'} />
										</Button>
									{:else}
										<Render of={cell.render()} />
									{/if}
								</Table.Head>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Header>
		<Table.Body {...$tableBodyAttrs}>
			{#each $pageRows as row (row.id)}
				<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
					<Table.Row {...rowAttrs}>
						{#each row.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs>
								<Table.Cell {...attrs}>
									{#if cell.id.includes('Price')}
										<div class="text-left font-bold">
											<Render of={cell.render()} />
										</div>
									{:else}
										<Render of={cell.render()} />
									{/if}
								</Table.Cell>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Body>
	</Table.Root>
	<!-- enable the pagination and see the props object not having the sort property any more -->
	<!-- <div class="flex items-center justify-end space-x-4 py-4">
		<Button
			variant="outline"
			size="sm"
			on:click={() => ($pageIndex = $pageIndex - 1)}
			disabled={!$hasPreviousPage}>Previous</Button
		>
		<Button
			variant="outline"
			size="sm"
			disabled={!$hasNextPage}
			on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
		>
	</div> -->
</div>

<pre>{JSON.stringify($sortKeys, null, 2)}</pre>
