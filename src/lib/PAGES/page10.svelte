<script>
	import Header from '$lib/components/header.svelte';
    
</script>

<div class="content-block section page_10">
	
    <div class="header">
    <Header />
</div>
	<div class="page_content">
		
        <div class="logotype">

            <img width="400" src="/images/logoPropValue.png"/>


        </div>
		<div class="pageNumber right">
			<p contenteditable>
				Nazwa (Imię Nazwisko)<br> ul. Nazwa ulicy 1 <br>00-000 Miasto <br>(+48) 999 888 777<br>
				biuro@nazwa-strony.pl<br> nazwo-strony.pl
			</p>
		</div>
	</div>
</div>

<style type="postcss">

.page_10 .header{
opacity:0;
}
.page_10 .header p{
    opacity: 0 !important;
}


.page_content{}

.logotype{
    margin-left: 189px;
    width: 300px;

}
.page_10 .pageNumber{
    background-color: rgba(0, 58, 123, 1.000);
    font-size: 14px;
    color: white;
    text-shadow: 0 0 black;
    margin-top: 746px;
    margin-left: -402px;
    width: 800px;
    text-align: center;
    height: 223px;
    padding-left: 42px;
    padding-top: 56px;


}


</style>
