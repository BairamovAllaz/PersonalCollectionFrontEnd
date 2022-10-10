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
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";

function CollectionForm() {
    const {
        markDownInput,setMarkDownInput,
        name,setName,
        topic,setTopic,
    } = useContext(InfoContext);
    const [topics,setTopics] = React.useState([]);

    React.useEffect(() => {
        axios.get(`${global.config.backendUrl}/collection/getTopics`).then((response) => {
            console.log(response.data);
            setTopics(response.data);
        }).catch((err) => {
            alert(err.response.data)
        })
    },[])

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
                        value = {name}
                        onChange={(e) => setName(e.target.value)}
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
                        <AccordionDetails style = {{textAlign : "left",width : `${markDownInput.length > 0 ? "300px" : "0"}`,height : `${markDownInput.length > 0 ? "300px" : "0"}`}}>
                            {
                                <ReactMarkdown children={markDownInput} style = {{width : "100%",height : "100px"}}/>
                            }
                        </AccordionDetails>
                    </Accordion>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <Typography style = {{textAlign : "left",padding : "10px"}}>Topic</Typography>
                        <Select
                            labelId="Topic"
                            id="topic"
                            label = "Topic"
                            onChange = {(e) => setTopic(e.target.value)}
                        >
                            {
                                topics &&
                                topics?.map(({topic_name,Id}) => (
                                    <MenuItem key={Id} value={topic_name}>{topic_name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>

                </Grid>
            </Grid>

        </div>
    )
}
export default CollectionForm;