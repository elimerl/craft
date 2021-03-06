// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".svelte-wacbv0.svelte-wacbv0{font-family:'Minecraft'}.container.svelte-wacbv0.svelte-wacbv0{display:flex;justify-content:center;align-items:center}ul.svelte-wacbv0.svelte-wacbv0{list-style:none}li.svelte-wacbv0.svelte-wacbv0{display:block;cursor:pointer;width:min-content;height:min-content}@font-face{font-family:'Minecraft';src:url('Minecraft.woff2') format('woff2'),\n      url('Minecraft.woff') format('woff');font-weight:normal;font-style:normal;font-display:swap}.autocomplete.svelte-wacbv0.svelte-wacbv0{position:relative;margin-bottom:3em}.autocomplete-items.svelte-wacbv0.svelte-wacbv0{position:absolute;border:1px solid #d4d4d4;border-bottom:none;border-top:none;z-index:2000;top:100%;left:0;right:0;width:12.8rem}.autocomplete-items.svelte-wacbv0 div.svelte-wacbv0{padding:10px;cursor:pointer;background-color:#fff;border-bottom:1px solid #d4d4d4;border-top:1px solid #d4d4d4}.autocomplete-items.svelte-wacbv0 div.svelte-wacbv0:hover{background-color:#e9e9e9}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}