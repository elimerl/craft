<script lang="ts">
  import { bind } from 'svelte/internal';
  import Item from './components/Item.svelte';
  import { fuse, search as _itemSearch } from './core/index';
  import { mcData } from './core/util';
  import pluralize from 'pluralize';
  let search: string = 'wooden axe';
  let ingredients = itemSearch(search);
  let message = genMessage(search);
  let autocomplete: string[] = [];
  let mouseInInput = false;
  const inputonfocus = () => {
    mouseInInput = true;
    console.log('focused');
  };
  const inputonblur = () => {
    mouseInInput = false;
    console.log('unfocused');
  };
  $: {
    ingredients = itemSearch(search);
    message = genMessage(search);
    autocomplete = fuse
      .search(search.split('*')[0])
      .map((v) => v.item.displayName)
      .slice(0, 3);
  }
  function itemSearch(search: string) {
    const multiplier = parseInt(search.split('*')[1]) || 1;
    try {
      return _itemSearch(search.split('*')[0]).map((v) => ({
        ...v,
        count: v.count * multiplier,
      }));
    } catch (error) {
      return [];
    }
  }
  function genMessage(search: string) {
    const multiplier = parseInt(search.split('*')[1]);
    try {
      const item = fuse.search(search.split('*')[0])[0].item.displayName;
      return `Materials you need for ${isNaN(multiplier) ? '1' : multiplier} ${
        isNaN(multiplier) ? item : pluralize(item)
      }:`;
    } catch (error) {
      return `Couldn't find that item!`;
    }
  }
</script>

<div class="container">
  <div>
    <div class="autocomplete">
      <input
        autocomplete="off"
        type="text"
        placeholder="Search..."
        bind:value={search}
        on:focus={inputonfocus}
        on:blur={inputonblur}
      />
      <div class="autocomplete-items">
        {#if mouseInInput}
          {#each autocomplete as autocompleteItem}
            <div
              on:mousedown={() => {
                search = autocompleteItem;
              }}
            >
              <Item
                item={Object.values(mcData.items).find(
                  (v) => v.displayName === autocompleteItem,
                )?.name}
                size={16}
              />
              {autocompleteItem}
            </div>
          {/each}{/if}
      </div>
    </div>

    <p>{message}</p>

    <ul>
      {#each ingredients as item}
        <li on:click={() => (search = item.item.displayName)}>
          <Item item={item.item.name} count={item.count} />
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
  * {
    font-family: 'Minecraft';
  }

  ul {
    list-style: none;
  }
  li {
    display: block;
    cursor: pointer;
    width: min-content;
    height: min-content;
  }
  @font-face {
    font-family: 'Minecraft';
    src: url('Minecraft.woff2') format('woff2'),
      url('Minecraft.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
  .autocomplete {
    position: relative;
  }
  .autocomplete-items {
    position: absolute;
    border: 1px solid #d4d4d4;
    border-bottom: none;
    border-top: none;
    z-index: 2000;
    /*position the autocomplete items to be the same width as the container:*/
    top: 100%;
    left: 0;
    right: 0;
    width: 12.8rem;
  }
  .autocomplete-items div {
    padding: 10px;
    cursor: pointer;
    background-color: #fff;
    border-bottom: 1px solid #d4d4d4;
    border-top: 1px solid #d4d4d4;
  }

  .autocomplete-items div:hover {
    /*when hovering an item:*/
    background-color: #e9e9e9;
  }
</style>
