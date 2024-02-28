export default function useGeolocation() {
  const latitude = useState<number | null>('latitude', () => null);
  const longitude = useState<number | null>('longitude', () => null);
  const error = useState<string | null>('longitude', () => null);

  const getLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          latitude.value = position.coords.latitude;
          longitude.value = position.coords.longitude;
          console.log(latitude.value, longitude.value);
        },
        (err) => {
          error.value = err.message;
        }
      );
    } else {
      error.value = 'Geolocation is not supported by this browser.';
    }
  };

  return { latitude, longitude, error, getLocation };
}
