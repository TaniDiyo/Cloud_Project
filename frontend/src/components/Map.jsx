function Map({ destination }) {

  const mapUrl = `https://www.google.com/maps?q=${destination}&output=embed`;

  return (
    <iframe
      title="map"
      width="100%"
      height="300"
      style={{ border: 0, borderRadius: "15px" }}
      src={mapUrl}
    ></iframe>
  );
}

export default Map;