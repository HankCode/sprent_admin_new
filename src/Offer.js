import React from 'react';
import {
  Page,
  Text,
  Image,
  View,
  Document,
  StyleSheet,
} from '@react-pdf/renderer';
import Logotype from './gfx/sprent-logo.png';

const styles = StyleSheet.create({
  logoText: {
    color: "blue"
  },
  page: {
    backgroundColor: '#FFF',
    padding: 16,
    fontSize: 12
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  table: {
    display: "table",
    width: "80%",
    border: 0,
    marginLeft: "10%",
    marginRight: "10%"
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
    border: 0
  },
  th: {
    width: '40%',
    textAlign: "right",
    marginRight: 10
  },
  td: {
    width: '60%',
  },
  additionalInfo: {
    borderTop: 2,
    marginTop: 15,
    marginBottom: 15
  },
  images: {
    border: 1,
    height: 409,
  },
  footer: {
    display: "table",
    marginTop: 20,
    border: 0
  },
  footerLeft: {
    width: "50%",
    paddingLeft: "5%",
    border: 0
  },
  footerRight: {
    width: "50%",
    textAlign: "right",
    paddingRight: "5%",
    border: 0,
  }
});

const ImageList = ({ images, selectedImages }) => {
  if (!selectedImages || selectedImages.length === 0) {
    return <div style={styles.images} />;
  }

  const imageCount = selectedImages.length;

  function* imageGenerator() {
    for (var key in images) {
      if(selectedImages.indexOf(key) != -1) {
        //console.log("imageGenerator: yeld key=" + key);
        yield images[key];
      }
    }
  }

  const imgGen = imageGenerator();
  var img=imgGen.next();

  function createImageRow(nr, imagesPerRow = 4) {
    const list = [];
    const width = Math.floor(1 / imagesPerRow * 100);

    const imageStyle = {
      width: width + "%",
      padding: 10,
      objectFit: 'scale-down',
    };

    for (var i=0; i<imagesPerRow; i++) {
      if(img.value == undefined) break;

      list.push(
        <View style={imageStyle}>
          <Image key={"image" + i} src={img.value.base64} />
        </View>
      );

      if(img.done) break;
      img=imgGen.next();
    }

    const rowStyle = {
      display: "flex",
      flexDirection: "row",
      height: imageRowHeight + "%"
    };

    return (
      <View key={"imageRow" + nr} style={rowStyle}>
        {list}
      </View>
    );
  }

  var imagesPerRow = 2; // default

  if(imageCount == 1) imagesPerRow = 1;
  if(imageCount == 2) imagesPerRow = 2;
  if(imageCount == 3) imagesPerRow = 3;
  if(imageCount > 3) imagesPerRow = 2;
  if(imageCount > 4) imagesPerRow = 3;
  if(imageCount > 6) imagesPerRow = 4;

  var imageRowCount = Math.ceil(imageCount / imagesPerRow);

  const imageRowHeight = 1/imageRowCount * 100;
  const imageRows = [];

  for(var i=0; i<imageRowCount; i++) {
    imageRows.push( createImageRow(i, imagesPerRow) )
  }

  return (
    <View style={styles.images}>
      {imageRows}
    </View>
  )
}

export default ({ landlordId, formData = {}, images, selectedImages }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View>
        <Image style={{width: "20%"}} src={Logotype} />
        <View style={{ paddingBottom: 5, borderBottom: 2, marginBottom: 5, width: "100%", textAlign: "center"}}>
          <Text style={{fontSize: 24}}>ACCOMMODATION OFFER</Text>
        </View>
      </View>
      <View style={{border: 0}}>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.th}>
              <Text>ACCOMMODATION ID</Text>
            </View>
            <View style={styles.td}>
              <Text>{`A${landlordId}`}</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.th}>
              <Text>TYPE OF ACCOMMODATION</Text>
            </View>
            <View style={styles.td}>
              <Text>{formData.houseType}</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.th}>
              <Text>ADDRESS</Text>
            </View>
            <View style={styles.td}>
              <Text>{formData.area}</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.th}>
              <Text>LIVING AREA</Text>
            </View>
            <View style={styles.td}>
              <Text>{formData.livingArea}</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.th}>
              <Text>BEDROOMS</Text>
            </View>
            <View style={styles.td}>
              <Text>{formData.bedrooms}</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.th}>
              <Text>EXISTING BEDS</Text>
            </View>
            <View style={styles.td}>
              <Text>{formData.beds}</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.th}>
              <Text>LIVINGROOMS</Text>
            </View>
            <View style={styles.td}>
              <Text>{formData.livingrooms}</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.th}>
              <Text>KITCHENS</Text>
            </View>
            <View style={styles.td}>
              <Text>{formData.kitchens}</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.th}>
              <Text>WC</Text>
            </View>
            <View style={styles.td}>
              <Text>{formData.wcs}</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.th}>
              <Text>SHOWERS</Text>
            </View>
            <View style={styles.td}>
              <Text>{formData.showers}</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.th}>
              <Text>PARKING LOTS</Text>
            </View>
            <View style={styles.td}>
              <Text>{formData.parkingspots}</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.th}>
              <Text>INCLUDED IN RENT</Text>
            </View>
            <View style={styles.td}>
              <Text>{formData.included || 'FULLY FURNISHED AND EQUIPPED, ALL UTILITIES EXPENSES INCLUDED, FRIDGE AND FREEZER, MICROWAVE, STOVE, OVEN, ACCESS TO WASHING MACHINE, TV AND INTERNET/WIFI'}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.additionalInfo}>
        <Text>{formData.ovrigt}</Text>
      </View>

      <ImageList
        images={images}
        selectedImages={selectedImages}
      />

      <View style={styles.footer}>

        <View style={styles.tableRow}>
          <View style={styles.footerLeft}>
            <Text>Sprent AB</Text>
            <Text>Banégatan 4</Text>
            <Text>861 34 Timrå Sweden</Text>
          </View>

          <View style={styles.footerRight}>
            <Text>Org.nr: 559213-1903</Text>
            <Text>www.sprent.se</Text>
            <Text>info@sprent.se</Text>
          </View>

        </View>
      </View>

    </Page>
  </Document>
);
