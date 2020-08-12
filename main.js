require(["esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer", "app/CoordWidget"], 
    function(Map, MapView, FeatureLayer, CoordWidget) {

    var map = new Map({
        basemap: "gray-vector",
    });

    var view = new MapView({
        container: "viewDiv",
        map: map,
        center: [7.6261347, 51.9606649],
        zoom: 5
    });

    var popRenderer = {
        type: "simple",
        symbol: {
            color: "black",
            type: "simple-marker",
            style: "circle"
        },
        visualVariables: [{
            type: "size",
            field: "POP",
            minDataValue: 100000,
            maxDataValue: 14000000,
            minSize: "10px",
            maxSize: "70pt"
        }]
    };

    OperationalLayer = new FeatureLayer({
        url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/World_Cities/FeatureServer/",
        renderer: popRenderer
    });

    map.add(OperationalLayer);

    view.when(function(){
        CoordWidget = new CoordWidget({
            view: view
        });
        view.ui.add(CoordWidget, "top-right");
    });
});