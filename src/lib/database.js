import axios from 'axios';
import { allDocuments, location, currentDocument, options } from '$lib/stores/appStore';
import { get } from 'svelte/store'

let serverURL = 'https://homesvelte-production.up.railway.app';

export async function fetchData() {
  try {
    const response = await axios.get(
      '/api', { params: { action: 'read' } });

    if (response.data) {
      allDocuments.set(response.data);
      // options.set(response.data.config);
      // tempStr = JSON.stringify(response.data, null, 2);
      // console.log(response.data);
      fetchOptions();
      return response.data;
    } else {
      console.error('Błąd podczas pobierania danych:', response.data.error);
    }
  } catch (error) {
    console.log('Błąd podczas pobierania danych:', error);
    return [error]
  }
}
export async function fetchOptions() {
  try {
    const response = await axios.get(
      '/api', { params: { action: 'readOpt' } });

    if (response.data) {

      options.set(response.data)
      return response.data;
    } else {
      console.error('Błąd podczas pobierania ustawień:', response.data.error);
    }
  } catch (error) {
    console.log('Błąd podczas pobierania ustawień:', error);
    return [error]
  }
}

export async function removeData(id) {
  let data = get(allDocuments);

  console.log('Removing data for document: ', toString(id));

  // Removing the item with given id
  let newData = data.filter(val => val['ID'] !== id);
  allDocuments.set(newData); // update the store with updated items

  try {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }; ``

    let JSdata = JSON.stringify({ data: get(allDocuments), config: get(options) });
    // let JSdata = JSON.stringify(get(allDocuments));

    console.log(JSdata)

    // Post request to save updated data
    const response = await axios.post('/api?action=write',
      { data: JSdata },
      config);

    if (response.data.status === "success") {
      console.log("Data removed successfully.");
    } else if (response.data.error) {
      console.error("Server Error:", response.data.error);
    } else {
      console.error("Unknown server response:", response.data);
    }

  } catch (error) {
    console.error('Error while removing data:', error);
  }
}

export async function saveData() {

  let id = get(currentDocument);
  let loc = get(location);
  let data = get(allDocuments);

  console.log('Saving data for document: ', id, loc);

  const dataArray = Object.values(data);
  let found = false;

  dataArray.forEach((val, index) => {
    if (val['ID'] === id) {
      dataArray[index] = loc;
      found = true;
    }
  });

  if (!found) {
    dataArray.push(loc);
  }

  data = Object.values(dataArray);
    allDocuments.set(data);
  let dataToSend = JSON.stringify(data);
  console.log(data, loc);

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const response = await axios.post('/api?action=write', { data: {dataToSend}}, config);

    if (response.data.status === "success") {
      console.log("Data saved successfully.");
    } else if (response.data.error) {
      console.error("Server Error:", response.data.error);
    } else {
      console.error("Unknown server response:", response.data);
    }

  } catch (error) {
    console.error('Error while saving data:', error);
  }
}


export async function saveOptions() {


  let opt = get(options);

  if (opt !== null) {
    console.log('Saving options : ', opt);

  }
  try {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    let dataToSend = JSON.stringify(opt);
    const response = await axios.post('/api?action=writeOpt',
      { data: dataToSend },
      config);

    if (response.data.status === "success") {
      console.log("Data saved successfully.");
    } else if (response.data.error) {
      console.error("Server Error:", response.data.error);
    } else {
      console.error("Unknown server response:", response.data);
    }

  } catch (error) {
    console.error('Error while saving data:', error);
  }

  fetchOptions();



}



