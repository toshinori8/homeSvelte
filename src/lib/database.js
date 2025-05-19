import axios from 'axios';
import { allDocuments, location, currentDocument } from '$lib/stores/appStore.js';
import { get } from 'svelte/store'
import { persisted } from 'svelte-persisted-store'

let serverURL = 'https://homesvelte-production.up.railway.app';

export default async function fetchData() {
  try {
    const response = await axios.get(
      '/api', { params: { action: 'read' } });

    if (response.data) {
      allDocuments.set(response.data);
      // tempStr = JSON.stringify(response.data, null, 2);
      // console.log(response.data);
      return response.data;
    } else {
      console.error('Błąd podczas pobierania danych:', response.data.error);
    }
  } catch (error) {
    console.log('Błąd podczas pobierania danych:', error);
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
    };

    let JSdata = JSON.stringify(get(allDocuments));

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



  let id  = get(currentDocument);
  let loc = get(location);
  let data = get(allDocuments);

  console.log('Saving data for document: ', id, loc);

  Object.values(data).forEach((val) => {

    let newArray = data.filter(val => val['ID'] !== id);
    if (val['ID'] == id) {
      newArray.push(loc);

      console.log(newArray);
      data = newArray
      allDocuments.set(newArray)
    }

  });

  try {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    let dataToSend = JSON.stringify(get(allDocuments));

    const response = await axios.post('/api?action=write', 
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
}


