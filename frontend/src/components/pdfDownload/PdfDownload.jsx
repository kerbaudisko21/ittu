import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font, Svg} from '@react-pdf/renderer';


const PdfDownload = ({ tripName, ItineraryDay,checklist,startDate,endDate }) => {
  console.log(checklist)
  console.log(tripName)
  console.log(ItineraryDay)

  const styles = StyleSheet.create({
    page: { backgroundColor: 'white' },
    section: { textAlign: 'center', marginTop: 30, marginBottom: 15, color: 'black'},
    trip: { textAlign: 'start', marginLeft: 30},
    itinerary:  { textAlign: 'start', border: 1 ,borderRadius: 4, width: 520, padding: 10, marginBottom: 30},
    date: {marginBottom: 15},
    destination: { borderRadius: 4, marginRight: 30 , marginBottom: 15 },
    destinationName: {marginBottom: 15},
    image: { height: 125,borderRadius: 8, objectFit: 'cover', objectPosition: 'center', marginRight: 10},
    imageDesc: {display: 'flex', flexDirection: 'row', width: 370},
    checklistContainer: {textAlign: 'start', border: 1 ,borderRadius: 4, width: 520, padding: 10, marginLeft: 30},
    checklist: {textAlign: 'start'},
    checklistTextContainer: { borderRadius: 4, marginRight: 30 },
    checklistText: {marginTop: 5},
  });


  

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>{tripName}</Text>
          <Text>{startDate.toDateString()} / {endDate.toDateString()}</Text>
        </View>
        <View style={styles.trip}>
          {ItineraryDay.map((item) => (
              <View style={styles.itinerary}>
              <Text style={styles.date} >{item.date.toDateString()}</Text> 
              {item.destinations.map((destination, index) => (
                <View style={styles.destination}>
                 <Text style={styles.destinationName}>{index+1}. {destination.name}</Text>       
                  <View style={styles.imageDesc}> 
                  <Image style={styles.image} src='https://lh3.googleusercontent.com/places/ANJU3DsCJ0oW5D62_FqX-WCdAmetmicI7hwa6gyBHUoCuA4ii4d6y2m8pOtCID84lgYxIlsGpw0XuWLkvQFLeDXciB0tR6sti4zCdF4=s1600-w1280'/>
                   <Text>{destination.vicinity}</Text>
                   </View>  
                </View>
              ))}

              </View>

          ))}
        </View>
        <View style={styles.checklistContainer}>
          <Text style={styles.checklist}>Your Checklist</Text>       
          {checklist.map((list, index) => (
                <View style={styles.checklistTextContainer}>
                 <Text style={styles.checklistText}>{index+1}. {list.text}</Text>       
                </View>
              ))}
          </View>
      </Page>
    </Document>
  )
}

export default PdfDownload



