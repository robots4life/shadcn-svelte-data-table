```shell
pnpm add date-fns --save

pnpm dlx @svelte-add/tailwindcss@latest

pnpm dlx shadcn-svelte@latest init

┌   shadcn-svelte  v0.12.1
│
◇  Which style would you like to use?
│  Default
│
◇  Which base color would you like to use?
│  Slate
│
◇  Where is your global CSS file? (this file will be overwritten)
│  src/app.css
│
◇  Where is your Tailwind config located? (this file will be overwritten)
│  tailwind.config.ts
│
◇  Configure the import alias for components:
│  $lib/components
│
◇  Configure the import alias for utils:
│  $lib/utils
│
◇  Config file components.json created
│
◇  Project initialized
│
◇  Dependencies installed
│
└  Success! Project initialization completed.

pnpm install -D svelte-headless-table

pnpm dlx shadcn-svelte@latest add button table dropdown-menu
```

<a target="_blank" href="/src/routes/data-table.svelte">/src/routes/data-table.svelte</a>

As long as line 83 is commented out the `props` object correctly shows the `sort` property.

<a target="_blank" href="https://github.com/robots4life/shadcn-svelte-data-table/blob/main/src/routes/data-table.svelte#L83">https://github.com/robots4life/shadcn-svelte-data-table/blob/main/src/routes/data-table.svelte#L83</a>

```ts
const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
```

<a target="_blank" href="https://github.com/robots4life/shadcn-svelte-data-table/blob/main/src/routes/data-table.svelte#L100">https://github.com/robots4life/shadcn-svelte-data-table/blob/main/src/routes/data-table.svelte#L100</a>

```json
{
	"sort": {
		"order": "asc",
		"disabled": false
	}
}
```

As soon as line 83 and the corresponding markup from line 144 to line 157 is **enabled** the `props` object is **missing** the `sort` property.

<a target="_blank" href="https://github.com/robots4life/shadcn-svelte-data-table/blob/main/src/routes/data-table.svelte#L144-L157">https://github.com/robots4life/shadcn-svelte-data-table/blob/main/src/routes/data-table.svelte#L144-L157</a>

Because of this **the condition to check for the sort order** from line 104 to 108 **does not work**.

<a target="_blank" href="https://github.com/robots4life/shadcn-svelte-data-table/blob/main/src/routes/data-table.svelte#L104-L108">https://github.com/robots4life/shadcn-svelte-data-table/blob/main/src/routes/data-table.svelte#L104-L108</a>

```svelte
{#if props.sort.order === 'asc'}
	<ArrowUp class={'ml-2 h-4 w-4'} />
{:else}
	<ArrowDown class={'ml-2 h-4 w-4'} />
{/if}
```

#### Solution

<a target="_blank" href="https://github.com/robots4life/shadcn-svelte-data-table/blob/main/src/routes/data-table.svelte#L85-L87">https://github.com/robots4life/shadcn-svelte-data-table/blob/main/src/routes/data-table.svelte#L85-L87</a>

```ts
// pageCount and pageSize must be included even though they are not used
// only if pageCount and pageSize are included will sort work correctly
const { hasNextPage, hasPreviousPage, pageIndex, pageCount, pageSize } = pluginStates.page;
```

#### Shadcn-Svelte Data Table Documentation

<a target="_blank" href="https://shadcn-svelte.com/docs/components/data-table#enable-the-addpagination-plugin">https://shadcn-svelte.com/docs/components/data-table#enable-the-addpagination-plugin</a>

Ideally when introducing pagination to the Date Table in the docs this could be pointed out.

> In the next step we are going to add sorting to the data table, for pagination and sorting to work correctly you will have to modify `pluginStates.page`, more about this in the next step.

```ts
const { hasNextPage, hasPreviousPage, pageIndex, pageCount, pageSize } = pluginStates.page;
```

<a target="_blank" href="https://shadcn-svelte.com/docs/components/data-table#make-header-cell-sortable">https://shadcn-svelte.com/docs/components/data-table#make-header-cell-sortable</a>

> If you like to use sorting with an icon on condition of the sort order and you have pagination in place you will need to add `pageCount` and `pageSize` to `pluginStates.page`.

```svelte
{#if props.sort.order === 'asc'}
	<ArrowUp class={'ml-2 h-4 w-4'} />
{:else}
	<ArrowDown class={'ml-2 h-4 w-4'} />
{/if}
```
