<script>
export let value = 33;
</script>


<svg 
 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 33">
  <defs>
  </defs>
  <path class="cls-1" d="m15.17.91l4.04,2.33c.08.05.15.09.23.14l3.84,2.22c1.42.82,2.22,2.31,2.22,3.84h.02v9.44c0,1.79-1.06,3.34-2.6,4.04l-3.72,2.15h0s-4.09,2.37-4.09,2.37c-1.44.83-3.15.77-4.49-.03l-4.04-2.33c-.08-.04-.15-.09-.23-.14l-3.84-2.22c-1.42-.82-2.22-2.31-2.22-3.84h-.02v-9.44c0-1.79,1.06-3.34,2.6-4.04l3.72-2.15h0S10.68.88,10.68.88c1.44-.83,3.15-.77,4.49.03Z"/>
  <text class="cls-2" transform="translate(9 20)"><tspan text-anchor="middle" class="tsSpann" x="17" y="24.5">{value}</tspan></text>
</svg>

<style>
  svg{


    transform: scale(0.7);
  }
.cls-1 {
    fill: none;
    stroke: #0fcf5e;
    stroke-miterlimit: 42.93;
    stroke-width: .59px;
  }
svg tspan{

  outline:none;
  border: none;


}
  .cls-2 {
    fill: #0fcf5e;
    font-family: var(--comfortea);
    font-size: 16px;
    text-align: center;
    outline: #0fcf5e;
  }
</style>
