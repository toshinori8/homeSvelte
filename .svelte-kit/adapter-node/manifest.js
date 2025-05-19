export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["css/donut.scss","css/donutMultiple.scss","css/mapaDots.css","css/printStyle.scss","favicon.png","images/GRID_2_Mac.torrent","images/POI/airport.png","images/POI/airport.svg","images/POI/bike.png","images/POI/bike.svg","images/POI/bus.png","images/POI/bus.svg","images/POI/bus_station.png","images/POI/bus_station.svg","images/POI/bus_stop.png","images/POI/bus_stop.svg","images/POI/car.png","images/POI/car.svg","images/POI/locationsDot.svg","images/POI/metro.png","images/POI/metro.svg","images/POI/miastoDot.png","images/POI/miastoDot.svg","images/POI/miastoDotB.svg","images/POI/miastoDotC.svg","images/POI/park.png","images/POI/park.svg","images/POI/przedszkole.png","images/POI/przedszkole.svg","images/POI/przychodnia.png","images/POI/przychodnia.svg","images/POI/route_bike.png","images/POI/route_bike.svg","images/POI/route_bus.png","images/POI/route_bus.svg","images/POI/route_car.png","images/POI/route_car.svg","images/POI/shop.png","images/POI/shop.svg","images/POI/szkola.png","images/POI/szkola.svg","images/POI/szpitalM.png","images/POI/szpitalM.svg","images/POI/train.png","images/POI/train.svg","images/POI/train_station.png","images/POI/train_station.svg","images/POI/uniwersytet.png","images/POI/uniwersytet.svg","images/Race_Driver_GRID_Mac.torrent","images/favicon.png","images/firstPage.jpg","images/firstPage.png","images/iconLocation.png","images/iconLocation.svg","images/iconstar.svg","images/li.svg","images/logotyp_header.svg","images/pin.svg","images/shield.svg","images/sliderIcon.svg","protected/data.php","protected/database.json","robots.txt"]),
	mimeTypes: {".css":"text/css",".png":"image/png",".svg":"image/svg+xml",".jpg":"image/jpeg",".json":"application/json",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.v2Z42FMn.js",app:"_app/immutable/entry/app.DZBYKB5u.js",imports:["_app/immutable/entry/start.v2Z42FMn.js","_app/immutable/chunks/D2WRd-ks.js","_app/immutable/chunks/DYu9GLAD.js","_app/immutable/chunks/qO67i_YB.js","_app/immutable/chunks/Crd1xHPf.js","_app/immutable/entry/app.DZBYKB5u.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/DYu9GLAD.js","_app/immutable/chunks/DVmlRn4z.js","_app/immutable/chunks/BLreOugL.js","_app/immutable/chunks/vL-1qMx0.js","_app/immutable/chunks/DvdIg-y8.js","_app/immutable/chunks/fqB-mGJD.js","_app/immutable/chunks/qO67i_YB.js","_app/immutable/chunks/Crd1xHPf.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		prerendered_routes: new Set(["/","/protected","/protected/data"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

export const prerendered = new Set(["/","/protected","/protected/data"]);

export const base = "";