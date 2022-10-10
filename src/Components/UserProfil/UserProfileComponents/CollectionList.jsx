import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {Card, CardActions, CardContent, CardMedia} from "@mui/material";
import Button from "@mui/material/Button";

function CollectionList(props) {
    const { user,collections,children, value, index, ...other } = props;
    return(
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            style = {{height : "100vh"}}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 , flexWrap: 'wrap',display:"flex" }}>
                    {
                        collections.map(element => (
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    width = "70"
                                    image = {`${global.config.backendUrl}/uploads/${element.image}`}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {element.name}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Share</Button>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                        ))
                    }
                </Box>
            )}
        </div>
    )
}
export default CollectionList;