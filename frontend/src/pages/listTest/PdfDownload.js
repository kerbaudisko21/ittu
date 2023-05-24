import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';



const PdfDownload = ({tripName,ItineraryDay}) => {
console.log(tripName)
console.log(ItineraryDay)
  return (
    <Document>
    <Page>
      <Text>{tripName}!</Text>
      {ItineraryDay.map((item) => (
      <div>
    <Text>{item.date.toDateString()}!</Text>
    {item.destinations.map((destination) => (
      <Text>{destination.name}</Text>
    ))}
  </div>
))}

    </Page>
  </Document>
  )
}

export default PdfDownload



