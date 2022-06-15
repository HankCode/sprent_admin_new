import React, {useState, useEffect} from "react";
import {Trans} from 'react-i18next';

import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';

import Offer from "./Offer";
import OfferFields from "./OfferFields";
import ImagePicker from "./Component/ImagePicker.js"

import {createInputState, updateObject} from "./helperFunctions.js";

const db = firebase.firestore();
const storage = firebase.storage(); // Get a reference to the storage service, which is used to create references in your storage bucket
const storageRef = storage.ref(); // Create a storage reference from our storage service

function convertBlobToBase64(blob) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader;
		reader.onerror = reject;
		reader.onload = () => {
			resolve(reader.result);
		};
		reader.readAsDataURL(blob);
	});
}

async function downloadBase64String(url) {
	return fetch(url).then(async function(response) {
		return response.blob().then(function(blob) {
			return convertBlobToBase64(blob);
		});
	});
}

export default ({ landlordId, exit }) => {
	const [houseInfo, setHouseInfo] = useState({});
	const [formData, setFormData] = useState({});
	const [images, setImages] = useState(null);
  const [loadingImages, setLoadingImages] = useState(true);
	const [selectedImages, setSelectedImages] = useState([]);

	useEffect(gethouseInfo, []);
	useEffect(getImages, []);

	const state = createInputState(formData, setFormData);

	function getImages() {
		const houseId = landlordId;

		// Create a reference under which you want to list
		const listRef = storageRef.child(houseId);

		const tmpImages = {};
		var imagesToSet = 0;
		var imagesSet = 0;

		listRef.listAll().then((res) => {
      console.log('LISTREF', res.items.length);

      if (res.items && res.items.length) {
        setLoadingImages(true);
      } else {
        setLoadingImages(false);
      }

			res.prefixes.forEach((folderRef) => {
				// All the prefixes under listRef.
				// You may call listAll() recursively on them.
				console.log("prefixes: ", folderRef);
			});
			
			res.items.forEach((itemRef) => {
				//console.log("item: ", itemRef);
				imagesToSet++;

				itemRef.getDownloadURL().then(function (url) {
					// gotcha: React state hook setter is async!? Resulting in the same object being updated every time, eg. it doesn't update
					// so we need to only update it once! And/Or wait until setImages hook is finished before updating again!
					const key = itemRef.location.path_;

					if(key == undefined || key == "undefined") throw new Error("key=" + key + " itemRef=" + itemRef + " itemRef.location=" + JSON.stringify(itemRef.location) );

					tmpImages[key] = {url: url};

					return downloadBase64String(url).then(function(base64Src) {
						tmpImages[key].base64 = base64Src;
						imagesSet++;
						doneMaybe();

						return true;
					});
				}).catch((err) => {
					console.error(err);
				});
			});
		}).catch((err) => {
			console.log(err);
		});

		function doneMaybe() {
			if( imagesSet == imagesToSet ) {
				setImages( updateObject(images, tmpImages) );
			}
			else {
				console.log("Waiting for " + (imagesToSet - imagesSet) + " of " + imagesToSet + " image url's... ");
			}
		}

	}

	function gethouseInfo() {
		db.collection("landlords").doc(landlordId).get().then(gotLandlordInfo);

		function gotLandlordInfo(doc) {
			if (doc.exists) {
				const data = doc.data();

				setHouseInfo(data);
				setFormData(  updateObject(formData, data)  );
			} else {
				// doc.data() will be undefined in this case
				console.error("gotLandlordInfo: No such document!");
			}
		}
	}

  if(!houseInfo) {
		return <div><p>Loading tenant info...</p></div>
	} else if(!images && loadingImages) {
		return <div><p>Loading images...</p></div>
  }

  const { requestId, houseType, zip, area, address, name, phone, email, bedrooms, beds, livingrooms, livingArea } = houseInfo;

	return (
    <div className="p-4 bg-gray-200">
      <div className="flex justify-between">
        <h3 className="text-lg font-medium mb-4">Create offer</h3>
        <button type="button" onClick={exit}>Stäng</button>
      </div>
      <div className="grid grid-cols-2 w-1/2">
        <div>ID</div>
        <div>{requestId ? `A${requestId} (${landlordId})`: landlordId}</div>

        <div>Typ av bostad</div>
        <div>{houseType}</div>

        <div>Ort</div>
        <div>{`${zip} ${area}`}</div>

        <div>Adress</div>
        <div>{address}</div>

        <div>För- och efternamn (fastighetsägaren)</div>
        <div>{name}</div>

        <div>Kontaktuppgifter till värden</div>
        <div>{`${phone}, ${email}`}</div>

        <div>Antal sovrum</div>
        <div>{bedrooms}</div>

        <div>Antal sängar</div>
        <div>{beds}</div>

        <div>Antal vardagsrum</div>
        <div>{livingrooms}</div>

        <div>Storlek i kvm</div>
        <div>{livingArea}</div>
      </div>
      <div className="twoColumns">
        <div className="col">
          <OfferFields state={state} />

          {
            images
            && Object.keys(images).length > 0
            && (
              <>
                <h3><Trans i18nKey="misc.images">Images</Trans> ({Object.keys(images).length})</h3>
                <ImagePicker images={images} selectedImages={selectedImages} onChange={ sel => setSelectedImages(sel) } />
              </>
            )
          }
        </div>

        <div className="col">
          <PDFViewer width="100%" height="75%">
            <Offer
              formData={formData}
              landlordId={requestId || landlordId}
              selectedImages={selectedImages}
              images={images}
            />
          </PDFViewer>

          <PDFDownloadLink
            fileName={`${landlordId}-unit.pdf`}
            document={
              <Offer
                formData={formData}
                landlordId={requestId || landlordId}
                selectedImages={selectedImages}
                images={images}
              />
            }
          >
            {
              ({ loading }) => (<div className="p-4 rounded bg-blue-200 text-center m-4">{ loading ? 'Vänta...' : 'Ladda ner PDF' }</div>)
            }
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
}
