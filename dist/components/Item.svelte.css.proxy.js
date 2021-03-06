// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".Item.svelte-1ivpekk{width:var(--size);height:var(--size);position:relative;display:inline}.Item-img.svelte-1ivpekk{image-rendering:pixelated;width:var(--size);height:var(--size)}.Item-count.svelte-1ivpekk{z-index:1000;right:5%;bottom:5%;position:absolute;color:black}.svelte-1ivpekk{font-family:'Minecraft'}@font-face{font-family:'Minecraft';src:url('Minecraft.woff2') format('woff2'),\n      url('Minecraft.woff') format('woff');font-weight:normal;font-style:normal;font-display:swap}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}