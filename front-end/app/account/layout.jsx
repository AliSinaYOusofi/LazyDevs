import Footer from "@/components/Footer/Footer";
import Navbar from '../../components/Navbar/Navbar';

export default function layout({ children }) {

    return (
      <>
        <Navbar />
        <Footer />
        {children}
      </>
    )
  }