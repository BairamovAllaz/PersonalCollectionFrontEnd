import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, {useContext} from 'react';
import ReactMarkdown from "react-markdown";
import {InfoContext} from "../CreateCollection";

function CollectionForm() {
    const {markDownInput,setMarkDownInput} = useContext(InfoContext);
    return(
        <div>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="name"
                        name="name"
                        label="Collection Name"
                        fullWidth
                        autoComplete="given-name"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={4}
                        placeholder="Write your description here support markdown!"
                        sx = {{width : "100%"}}
                        value = {markDownInput}
                        onChange = {(e) => setMarkDownInput(e.target.value)}
                    />
                    <Accordion style = {{marginTop : "10px"}}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>MarkDown Result</Typography>
                        </AccordionSummary>
                        <AccordionDetails style = {{textAlign : "left"}}>
                           <ReactMarkdown children={markDownInput} style = {{width : "100%",height : "100px"}}/>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="topic"
                        name="topic"
                        label="Topic"
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant="outlined"
                    />
                </Grid>
            </Grid>

        </div>
    )
}
export default CollectionForm;