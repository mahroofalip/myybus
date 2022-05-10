// import React, { useEffect, useState } from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import Container from "@mui/material/Container";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Button from "@mui/material/Button";
// import Paper from "@mui/material/Paper";
// import { Box } from "@mui/material";
// import axios from "axios";
// import JsPDF from "jspdf";
// import DownloadIcon from "@mui/icons-material/Download";
// import moment from "moment";
// import Typography from "@mui/material/Typography";
// import Navbar from "../navbar/Navbar"
// const Report = () => {

   

//     const generatePDF = () => {
//         const report = new JsPDF("portrait", "pt", "a2");
//         report.html(document.querySelector("#report")).then(() => {
//             report.save("report.pdf");
//         });
//     };


//     return (


//         <>
//             <Navbar tab1hover="tab" tab2hover="tab" tab3hover="tab" tab4hover="nohover" tab1="#012169" tab2="#012169" tab3="#012169" tab4="gray" />

//             <Container fixed>
//                 <div id="report">

//                     <Box
//                         component="span"
//                         display="flex"
//                         justifyContent="center"
//                         alignItems="center"
//                         height={50}
//                         fontSize={34}
//                     ></Box>
//                     <Container>
//                         <Typography align="center"><h2><strong>Income Report</strong></h2></Typography>
//                     </Container>
//                     <TableContainer component={Paper}>

//                         <Box
//                             component="span"
//                             display="flex"
//                             justifyContent="end"
//                             alignItems="center"
//                             height={70}
//                             fontSize={34}

//                             border="solid 2px gray"
//                             marginBottom="5px"
//                         >


//                             <Button
//                                 onClick={generatePDF}
//                                 variant="contained"
//                                 align="right"
//                                 sx={{ m: 10 }}
//                             >

//                                 <DownloadIcon /> Export PDF
//                             </Button>
//                         </Box>

//                         <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                             <TableHead>

//                                 <TableRow>

//                                     <TableCell>DATE</TableCell>
//                                     <TableCell>NO.OF BOOKINGS</TableCell>

//                                     <TableCell>INCOME</TableCell>
//                                     <TableCell>PROFIT</TableCell>

//                                 </TableRow>

//                             </TableHead>

//                             {/* {data.map((res)=>(        */}
//                             <TableBody>

//                                 <TableRow
//                                     sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                                 >
//                                     <TableCell>10/25/2022</TableCell>
//                                     <TableCell>55</TableCell>
//                                     <TableCell>788</TableCell>
//                                     <TableCell>120</TableCell>
//                                 </TableRow>
//                                 <TableRow
//                                     sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                                 >
//                                     <TableCell>10/25/2022</TableCell>
//                                     <TableCell>55</TableCell>
//                                     <TableCell>788</TableCell>
//                                     <TableCell>120</TableCell>
//                                 </TableRow>
//                                 <TableRow
//                                     sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                                 >
//                                     <TableCell>10/25/2022</TableCell>
//                                     <TableCell>55</TableCell>
//                                     <TableCell>788</TableCell>
//                                     <TableCell>120</TableCell>
//                                 </TableRow>
//                                 <TableRow
//                                     sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                                 >
//                                     <TableCell>10/25/2022</TableCell>
//                                     <TableCell>55</TableCell>
//                                     <TableCell>788</TableCell>
//                                     <TableCell>120</TableCell>
//                                 </TableRow>
//                                 <TableRow
//                                     sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                                 >
//                                     <TableCell>10/25/2022</TableCell>
//                                     <TableCell>55</TableCell>
//                                     <TableCell>788</TableCell>
//                                     <TableCell>120</TableCell>
//                                 </TableRow>
//                             </TableBody>

//                         </Table>
//                     </TableContainer>
//                 </div>

//             </Container>
//         </>
//     )
// }

// export default Report