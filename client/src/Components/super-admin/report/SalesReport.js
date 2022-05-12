import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Container from "@mui/material/Container";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import axios from "axios";
import JsPDF from "jspdf";
import { useParams } from "react-router-dom";
import moment from "moment";
import Typography from "@mui/material/Typography";
import Tabs from "../Tabs/Tabs";
import Navbar from "../navbar/Navbar";
import { DataGrid } from "@mui/x-data-grid";
import Paper from '@mui/material/Paper';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const SalesReport = () => {

    const [records, setRecords] = useState();
    const { ownerId } = useParams()
    const generatePDF = () => {
        const report = new JsPDF("portrait", "pt", "a2");
        report.html(document.querySelector("#salereport")).then(() => {
            report.save("super_admin_report.pdf");
        });
    };

    const columns = [

        { field: "id", headerName: "NO", width: 50 },
        { field: "depdate", headerName: "SERVICE DATE", width: 200 },
        { field: "owner_id", headerName: "OWNER ID", width: 100 },
        { field: "bus_id", headerName: "BUS ID", width: 150 },
        { field: "bookings", headerName: "TRAVALLERS", width: 150 },
        { field: "totalErnings", headerName: "TOTAL EARNINGS", width: 180 },
        { field: "expense", headerName: "SERVICE COST", width: 200 },
        { field: "profit", headerName: "Profit", width: 100 },

    ];


    useEffect(() => {

        axios.get('http://localhost:3001/super/admin/report').then((res) => {
            console.log(res.data.rows);

            setRecords(res.data.rows)

        });
    }, [])

    return (


        <>
            <Navbar />
            <Tabs tab1hover="tab" tab2hover="tab" tab3hover="tab" tab4hover="tnohoverab" tab1="#012169" tab2="#012169" tab3="#012169" tab4="gray" />

            <div>

                <Container sx={{ marginTop: 2 }}>
                    <Container sx={{
                        border: "solid 1px lightgray",
                        display: "flex",
                        justifyContent: "end",
                        p: "10px"
                    }}>


                        <Button onClick={generatePDF} variant="outlined" startIcon={<PictureAsPdfIcon />}>
                            Download PDF
                        </Button>



                    </Container>

                </Container>
                {/* table */}

                <Container id="salereport" >
                    <Typography
                        sx={{ marginTop: 1 }}
                        align="center"
                    >
                        <span style={{ fontWeight: 900, fontSize: 25 }}>SALES REPORT</span>


                    </Typography>
                    <div style={{ height: 400, width: "100%", marginTop: 10 }}>
                        <DataGrid
                            rows={records}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}

                        />
                    </div>
                </Container>
            </div>

        </>
    )
}

export default SalesReport