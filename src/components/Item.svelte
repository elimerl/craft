<script lang="typescript">
  import _items from './items.json';
  const items = _items as { id: number; name: string; texture: string }[];
  export let item: string = 'diamond_sword';
  export let count: number = 1;
  export let size: number = 64;
  function getItemTex(item: string) {
    const _item = items.find((v) => v.name === item);
    return _item
      ? `data:image/png;base64,${_item.texture}`
      : 'https://via.placeholder.com/64x64';
  }
</script>

<div class="Item" style="--size: {size}px">
  <img src={getItemTex(item)} alt={item} class="Item-img" />
  {#if count > 1}
    <span class="Item-count">{count}</span>
  {/if}
</div>

<style>
  .Item {
    width: var(--size);
    height: var(--size);
    position: relative;
    display: inline;
  }
  .Item-img {
    image-rendering: pixelated;
    width: var(--size);
    height: var(--size);
  }
  .Item-count {
    z-index: 1000;
    right: 5%;
    bottom: 5%;
    position: absolute;
    color: black;
  }
  * {
    font-family: 'Minecraft';
  }
  @font-face {
    font-family: 'Minecraft';
    src: url('Minecraft.woff2') format('woff2'),
      url('Minecraft.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
</style>
