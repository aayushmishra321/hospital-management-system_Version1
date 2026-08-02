const axiosLib = require('axios');

const API_NINJAS_KEY = process.env.API_NINJAS_KEY;

/**
 * Fetch hospitals from API Ninjas by city/country.
 * @param {string} city - City name
 * @param {string} country - Country code (e.g. 'IN' for India)
 */
const getHospitals = async (city = 'Mumbai', country = 'IN') => {
    if (!API_NINJAS_KEY || API_NINJAS_KEY === 'YOUR_API_NINJAS_KEY_HERE') {
        // Return mock data when key not configured
        return [
            { name: 'Apollo Hospital', address: 'Greams Road, Chennai', city: 'Chennai', country: 'IN' },
            { name: 'AIIMS Delhi', address: 'Sri Aurobindo Marg, New Delhi', city: 'New Delhi', country: 'IN' },
            { name: 'Fortis Hospital', address: 'Bannerghatta Road, Bangalore', city: 'Bangalore', country: 'IN' },
            { name: 'Lilavati Hospital', address: 'A. Marg, Bandra West, Mumbai', city: 'Mumbai', country: 'IN' },
            { name: 'Narayana Health', address: '258/A, Bommasandra, Bangalore', city: 'Bangalore', country: 'IN' },
        ];
    }
    try {
        const response = await axiosLib.get('https://api.api-ninjas.com/v1/hospitals', {
            headers: { 'X-Api-Key': API_NINJAS_KEY },
            params: { city, country },
        });
        return response.data;
    } catch (error) {
        console.error('API Ninjas hospital fetch error:', error.message);
        return [];
    }
};

module.exports = { getHospitals };
