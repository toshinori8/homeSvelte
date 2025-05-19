
<svelte:head>
	<link rel="stylesheet" href="/css/printStyle.scss"/>
</svelte:head>

          <div class="frontcover">
      
              <div class="containerFlex noselect">
      
                  <img src="/images/firstPage.png" alt="|" class="frontImage" />
      
                  <input type="button" class="btn btn-primary frontButton"
                  on:click={() =>{
                    location.href= '/protected';
                  }} 
                  value="Wycena wartości nieruchomości" />

                 <input type="button" class="btn btn-primary frontButton"
                 on:click={() =>{
                    location.href= '/protected/data';
                  }} 
                  value="Administracja" />
              </div>
      
          </div>
      
      
      
      
       
      
      