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

```ts
const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
```

As soon as line 83 and the corresponding markup from line 144 to line 157 is enabled the `props` object is missing the `sort` property.

Because of this the condition to check for the sort order from line 104 to 108 does not work.

```svelte
{#if props.sort.order === 'asc'}
	<ArrowUp class={'ml-2 h-4 w-4'} />
{:else}
	<ArrowDown class={'ml-2 h-4 w-4'} />
{/if}
```
