import Navbar from "./navbar/Navbar";
import SearchBar from "./searchBar/SearchBar";
import BusList from "./busList/BusList";
import BottomNav from "./bottomNav/BottomNav";
import Container from "@mui/material/Container";
const MainHome = () => {

  return (
    <>

      <Navbar />
      <SearchBar />
      <BusList />
      <Container align={"center"}>
        <BottomNav />
      </Container>


    </>
  );
};

export default MainHome;
