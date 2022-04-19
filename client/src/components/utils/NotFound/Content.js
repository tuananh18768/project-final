import React from 'react'
import Banner from '../../Banner/Banner'
import Catergory from '../../Catergory/Catergory'
import CoursesBody from '../../CoursesBody/CoursesBody'
import Footer from '../../Footer/Footer'
export default function Content() {
  return (
    <div id="content_type">
        <Banner />
        <Catergory />
        <CoursesBody />
        <Footer />
    </div>
  )
}
