import AboutUs from "./components/AboutUs";
import BankSupport from "./components/BankSupport";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import PDFtoExcelConverter from "./components/PDFtoExcelConverter";

export default function App() {
  return (
    <>
      <Navbar />
      <Header />
      <PDFtoExcelConverter />
      <BankSupport />
      <AboutUs />
    </>
  );
}
