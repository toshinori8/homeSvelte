<script>
	import { fade } from 'svelte/transition';
</script>

<svg  transition:fade version="1.1" id="Loading" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
 
 
  <circle fill="var(--brand-green)" stroke="none" cx="6" cy="50" r="6">
    <animateTransform 
       attributeName="transform" 
       dur="1s" 
       type="translate" 
       values="0 15 ; 0 -15; 0 15" 
       repeatCount="indefinite" 
       begin="0.1"/>
  </circle>
 
  <circle fill=var(--brand-green) stroke="none" cx="30" cy="50" r="6">
    <animateTransform 
       attributeName="transform" 
       dur="1s" 
       type="translate" 
       values="0 10 ; 0 -10; 0 10" 
       repeatCount="indefinite" 
       begin="0.2"/>
  </circle>
 
 
  <circle fill=var(--brand-green) stroke="none" cx="54" cy="50" r="6">
    <animateTransform 
       attributeName="transform" 
       dur="1s" 
       type="translate" 
       values="0 5 ; 0 -5; 0 5" 
       repeatCount="indefinite" 
       begin="0.3"/>
  </circle>


</svg>


<style type="scss">


svg{
    position: relative;
    left:50%;
    margin-left: -50px;
  width: 100px;
  height: 100px;
  margin: 0px;
  margin-bottom: 50px;
  margin-top: 50px;
  display:inline-block;
}


</style>