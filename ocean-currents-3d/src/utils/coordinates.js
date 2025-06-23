export function latLonToVec3(lat, lon, radius = 2.01) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return [
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  ];
}

export function calculateDistance(point1, point2) {
  const dx = point2[0] - point1[0];
  const dy = point2[1] - point1[1];
  const dz = point2[2] - point1[2];
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}


export function vec3ToLatLon(x, y, z, radius = 2.01) {
  const lat = 90 - (Math.acos(y / radius) * 180 / Math.PI);
  const lon = (Math.atan2(z, -x) * 180 / Math.PI) - 180;
  return { lat, lon };
} 