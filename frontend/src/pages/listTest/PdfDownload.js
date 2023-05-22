import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';



const PdfDownload = ({tripName,ItineraryDay}) => {
console.log(tripName)
console.log(ItineraryDay)
  return (
    <Document>
    <Page>
      <Text>Hello World!</Text>
      <Text>{tripName}!</Text>
      {ItineraryDay.map((item) => (
        <Text>{item.date.toDateString()}</Text>
           ))}
     

    </Page>
  </Document>
  )
}

export default PdfDownload



