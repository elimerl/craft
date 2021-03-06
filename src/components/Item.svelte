<script lang="typescript">
  import _items from './items.json';
  const items = _items as { id: number; name: string; texture: string }[];
  export let item: string = 'diamond_sword';
  export let count: number = 1;
  export let size: number = 64;
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;

  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  function getItemTex(item: string) {
    const _item = items.find((v) => v.name === item);
    return _item
      ? `data:image/png;base64,${_item.texture}`
      : genPlaceholder(item);
  }
  function genPlaceholder(text: string) {
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';

    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '6em "Minecraft"';
    ctx.fillStyle = 'white';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    return canvas.toDataURL();
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
