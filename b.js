const fetch = require('node-fetch');

class Balance {
    async res(data) {
        async function fetchData() {
          const data7 = fetch('http://127.0.0.1:5000/data', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data),
            })
            .then((response) => response.json())
            .then(async (data) => {
                //console.log('Success:', data);
                const result = data.map(async (data1) => {
                   const data = data1;
                   return { data };
                });
                return await Promise.all(result);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
            
            return data7;
        }
        
        return await fetchData();
    }
}


module.exports = Balance;
