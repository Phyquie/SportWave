export const MapLink = ({ lat, lng }) => {
    const isIOS = typeof window !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

    const mapUrl = isIOS
        ? `http://maps.apple.com/?ll=${lat},${lng}`
        : `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

    return (
        <button onClick={() => window.open(mapUrl, '_blank')} className="bg-indigo-600 text-white rounded-lg py-2 px-4 mt-4 cusror-pointer">
            Get Directions
        </button>
    );
};
