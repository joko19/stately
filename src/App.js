import AboutUs from "./components/AboutUs";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import PDFtoExcelConverter from "./components/PDFtoExcelConverter";

export default function App() {
  return (
    <>
      <Navbar />
      <Header />
      <PDFtoExcelConverter />
      <AboutUs />
    </>
  );
}
