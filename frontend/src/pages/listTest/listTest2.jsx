import React from 'react';
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';
import PdfDownload from '../../components/pdfDownload/PdfDownload';



const ListTest2 = () => (
  <PDFViewer style={{width:'100vh',height:'100vh'
  }}>
    <PdfDownload />
  </PDFViewer>
);

export default ListTest2
