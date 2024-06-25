import {Polygon, useMap} from "react-leaflet";
import {useEffect} from "react";

function MyPolygon({event_proxy, area, colorOpts}){

    const map = useMap();

    const flyToPoint = (focus_point) => {
        const dest = {
            lat: focus_point.focus.coordinates[0],
            lon: focus_point.focus.coordinates[1],
        }
        map.flyTo(dest,17);
    }

    useEffect(
        () => {
            if (event_proxy !== undefined){
                console.log("set areas_data event proxy for MyPolygon")
                event_proxy.subscribeOn(`flyTo--${area.terr_id}`, flyToPoint);
            } else {
                console.log("MyPolygon: no event proxy provided")
            }
        }, []
    )

    return (
        <div>
            <Polygon
                key={area.terr_id}
                pathOptions={colorOpts}
                positions={area.contour.coordinates[0]}
            />
        </div>
    );

}

export default MyPolygon;
