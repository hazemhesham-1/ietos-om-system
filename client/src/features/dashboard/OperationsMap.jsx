import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { DEFAULT_COORDINATES } from "@/constants";

function getStatusIcon(status) {
    const color = {
        normal: "green",
        attention: "orange",
        critical: "red",
    };

    const iconColor = color[status] || "gray";

    return new L.Icon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${iconColor}.png`,
        iconRetinaUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${iconColor}.png`,
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        iconSize: [25, 40],
        iconAnchor: [12, 40],
        popupAnchor: [1, -35],
        shadowSize: [40, 40]
    });
}

const siteReports = [
    {
        id: 1,
        name: "Site 1",
        status: "normal",
        lat: 30.0131,
        long: 31.2089,
        lastReport: "Aug 18, 2025",
    },
    {
        id: 2,
        name: "Site 2",
        status: "attention",
        lat: 31.2001,
        long: 29.9187,
        lastReport: "Aug 21, 2025",
    },
    {
        id: 3,
        name: "Site 3",
        status: "critical",
        lat: 24.0889,
        long: 32.8998,
        lastReport: "Aug 20, 2025",
    },
];

const OperationsMap = () => {
    return (
        <section className="w-full">
            <h1 className="text-slate-800 mb-5 text-2xl font-bold">
                Operations Field Map
            </h1>
            <MapContainer
                center={Object.values(DEFAULT_COORDINATES)}
                zoom={6}
                scrollWheelZoom={true}
                className="rounded-lg h-96 shadow-md"
            >
                <TileLayer
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {siteReports.map((site) => (
                    <Marker
                        key={site.id}
                        position={[site.lat, site.long]}
                        icon={getStatusIcon(site.status)}
                    >
                        <Popup>
                            <span className="block mb-1 text-base font-semibold">
                                {site.name}
                            </span>
                            Status: {site.status.toUpperCase()}
                            <span className="block">
                                Last Report: {site.lastReport}
                            </span>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </section>
    );
};

export default OperationsMap;