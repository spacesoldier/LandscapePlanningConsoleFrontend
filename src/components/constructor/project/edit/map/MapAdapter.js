import {MapContainer, Marker, Polygon, Popup, TileLayer, useMap} from "react-leaflet";
import {useEffect, useRef, useState} from "react";
import MyPolygon from "./MyPolygon";

function MapAdapter({event_proxy}){

    const fillBlueOptions = { fillColor: 'blue' }
    const blackOptions = { color: 'black' }
    const limeOptions = { color: 'lime' }
    const purpleOptions = { color: 'purple' }
    const redOptions = { color: 'red' }

    const lomonosov_position = [55.691719663990355, 37.51556348801225]

    const [allAreas, setAllAreas] = useState([])

    const updateAreas = (areas) => {

        setAllAreas(areas);
    }


    const panMapToPoint = (focus_point) => {
        // map.flyTo(focus_point.coordinates,15);

        const receiver_polygon = `flyTo--${focus_point.terr_id}`;
        event_proxy.sendEvent(receiver_polygon, focus_point);
    }

    useEffect(
        () => {
            if (event_proxy !== undefined){
                console.log("set areas_data event proxy for MapAdapter")
                event_proxy.subscribeOn("areas_data", updateAreas);
                event_proxy.subscribeOn("new_map_focus", panMapToPoint);
            } else {
                console.log("MapAdapter: no event proxy provided")
            }
        }, []
    )


    return (
        <div
            className="
                h-full w-full
            "
        >
            <MapContainer
                center={lomonosov_position}
                zoom={9}
                scrollWheelZoom={true}
                className="
                    h-[calc(110%)]
                    w-[calc(110%)]
                "
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={lomonosov_position}>
                    <Popup>
                        Инновационный кластер "Ломоносов". <br /> Место, где собираются лидеры!
                    </Popup>
                </Marker>
                {
                    allAreas.map(
                        (area) => {
                            let colorOpts = purpleOptions;
                            if (area.area_class === "area"){
                                colorOpts = limeOptions;
                            }

                            let positionsToDraw=[];

                            if (area.contour !== undefined){
                                if (area.contour.coordinates[0] !== undefined){
                                    positionsToDraw = area.contour.coordinates[0];
                                }
                            }


                            return (
                                <MyPolygon
                                    key={area.terr_id}
                                    area={area}
                                    pathOptions={colorOpts}
                                    positions={positionsToDraw}
                                    event_proxy={event_proxy}
                                />
                            );
                        }
                    )
                }
            </MapContainer>
        </div>
    );

}

export default MapAdapter;
