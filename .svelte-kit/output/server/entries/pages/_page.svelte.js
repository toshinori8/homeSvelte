import { O as head } from "../../chunks/index.js";
function _page($$payload) {
  head($$payload, ($$payload2) => {
    $$payload2.out += `<link rel="stylesheet" href="/css/printStyle.scss">`;
  });
  $$payload.out += `<div class="frontcover"><div class="containerFlex noselect"><img src="/images/firstPage.png" alt="|" class="frontImage"> <input type="button" class="btn btn-primary frontButton" value="Wycena wartości nieruchomości"> <input type="button" class="btn btn-primary frontButton" value="Administracja"></div></div>`;
}
export {
  _page as default
};
