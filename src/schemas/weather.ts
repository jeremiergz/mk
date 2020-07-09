import * as Yup from 'yup';

const WeatherGETSchema = Yup.object().shape({
  lat: Yup.number().min(-90).max(90).required(),
  lon: Yup.number().min(-180).max(180).required(),
});

export { WeatherGETSchema };
