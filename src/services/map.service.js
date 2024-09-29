const { config } = require("dotenv");
config()
const axios = require("axios");
const googleMapsApiKey = process.env.DB_APIKEYGOOGLE;


async function getMapLocal(cep) {
  console.log("Inside getMapLocal");
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const dados = await response.json();


  const logradouro = dados.logradouro
  const localidade = dados.localidade
  const estado = dados.estado
  const numero = dados.numero

  if (dados.erro) {
    const error = new Error('Digite um CEP válido');
    error.statusCode = 400;
    throw error;
  }

  
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${googleMapsApiKey}&region=br&address=${numero}+${logradouro}+${localidade}+${estado}&key=${googleMapsApiKey}`);

    if (!response.data || response.data.results.length === 0) {
      const error = new Error("Location not found");
      error.statusCode = 404;
      throw error;
    }

    const { lat, lng } = response.data.results[0].geometry.location;
    const display_name = response.data.results[0].formatted_address;

    if (!lat || !lng || !display_name) {
      const error = new Error("Incomplete location data");
      error.statusCode = 404;
      throw error;
    }

    return { lat, lon: lng, display_name };
  } catch (error) {
    console.error("Error in getMapLocal:", error.message);
    error.statusCode = error.statusCode || 500;
    throw error;
  }
}



async function getGoogleMapsLink(local) {
  try {
    const { coordinateLat, coordinateLon } = local;

    if (!coordinateLat || !coordinateLon) {
      const error = new Error("Incomplete location data");
      error.statusCode = 400;
      throw error;
    }

    const googleMapsLink = `https://www.google.com/maps?q=${coordinateLat},${coordinateLon}`;
    return googleMapsLink;
  } catch (error) {
    console.error("Error in getGoogleMapsLink:", error.message);
    error.statusCode = error.statusCode || 500;
    throw error;
  }
}

module.exports = {
  getMapLocal,
  getGoogleMapsLink,
};








// const axios = require("axios");
// const linkMapApi =
//   "https://nominatim.openstreetmap.org/search?format=json&country=Brazil&limit=1";

// async function getMapLocal(cep) {
//   console.log("Inside getMapLocal");
//   try {
//     const response = await axios.get(`${linkMapApi}&postalcode=${cep}`);

//     if (!response.data || response.data.length === 0) {
//       const error = new Error("Location not found");
//       error.statusCode = 404;
//       throw error;
//     }

//     const { lat, lon, display_name } = response.data[0];

//     if (!lat || !lon || !display_name) {
//       const error = new Error("Incomplete location data");
//       error.statusCode = 404;
//       throw error;
//     }

//     return { lat, lon, display_name };
//   } catch (error) {
//     console.error("Error in getMapLocal:", error.message);
//     error.statusCode = error.statusCode || 500;
//     throw error;
//   }
// }

// async function getGoogleMapsLink(local) {
//   try {
//     const { coordinateLat, coordinateLon } = local;

//     if (!coordinateLat || !coordinateLon) {
//       const error = new Error("Incomplete location data");
//       error.statusCode = 400;
//       throw error;
//     }

//     const googleMapsLink = `https://www.google.com/maps?q=${coordinateLat},${coordinateLon}`;
//     return googleMapsLink;
//   } catch (error) {
//     console.error("Error in getGoogleMapsLink:", error.message);
//     error.statusCode = error.statusCode || 500;
//     throw error;
//   }
// }

// module.exports = {
//   getMapLocal,
//   getGoogleMapsLink,
// };
