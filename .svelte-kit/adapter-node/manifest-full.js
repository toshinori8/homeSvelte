export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","css/donut.scss","css/donutMultiple.scss","css/donutMultiplePage7.scss","css/mapaDots.css","css/printStyle.scss","favicon.png","images/.DS_Store","images/POI/airport.png","images/POI/airport.svg","images/POI/bike.png","images/POI/bike.svg","images/POI/bus.png","images/POI/bus.svg","images/POI/bus_station.png","images/POI/bus_station.svg","images/POI/bus_stop.png","images/POI/bus_stop.svg","images/POI/car.png","images/POI/car.svg","images/POI/klinika.svg","images/POI/locationsDot.svg","images/POI/metro.png","images/POI/metro.svg","images/POI/miastoDot.png","images/POI/miastoDot.svg","images/POI/miastoDotB.svg","images/POI/miastoDotC.svg","images/POI/park.png","images/POI/park.svg","images/POI/przedszkole.png","images/POI/przedszkole.svg","images/POI/przychodnia.png","images/POI/przychodnia.svg","images/POI/route_bike.png","images/POI/route_bike.svg","images/POI/route_bus.png","images/POI/route_bus.svg","images/POI/route_car.png","images/POI/route_car.svg","images/POI/shop.png","images/POI/shop.svg","images/POI/szkola.png","images/POI/szkola.svg","images/POI/szpitalM.png","images/POI/szpitalM.svg","images/POI/train.png","images/POI/train.svg","images/POI/train_station.png","images/POI/train_station.svg","images/POI/uniwersytet.png","images/POI/uniwersytet.svg","images/favicon.png","images/firstPage.png","images/iconLocation.png","images/iconLocation.svg","images/iconstar.svg","images/li.svg","images/logoPropValue.png","images/logoPropValue.psd","images/logoo.png","images/logotyp_back.svg","images/logotyp_header.svg","images/pin.svg","images/shield.svg","images/sliderIcon.svg","images/solniczka.svg","public/database.json","robots.txt"]),
	mimeTypes: {".css":"text/css",".png":"image/png",".svg":"image/svg+xml",".json":"application/json",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.BSEolwy-.js",app:"_app/immutable/entry/app.Blp9IWb4.js",imports:["_app/immutable/entry/start.BSEolwy-.js","_app/immutable/chunks/Bdf7bt7S.js","_app/immutable/chunks/DOZOIc5p.js","_app/immutable/chunks/WevpbRh2.js","_app/immutable/entry/app.Blp9IWb4.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/DOZOIc5p.js","_app/immutable/chunks/2tJFOeL8.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api",
				pattern: /^\/api\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/_server.ts.js'))
			},
			{
				id: "/protected",
				pattern: /^\/protected\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/protected/data",
				pattern: /^\/protected\/data\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
