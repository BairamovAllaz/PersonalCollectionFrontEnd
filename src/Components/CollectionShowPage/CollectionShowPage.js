import {useParams} from "react-router-dom";
import React from 'react';
import axios from "axios";
import Container from "@mui/material/Container";
import {Grid, Paper} from "@material-ui/core";
import Typography from '@mui/material/Typography';
import {Avatar, ButtonBase, CardMedia} from "@mui/material";
import {styled} from "@mui/material/styles";
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

function CollectionShowPage() {
    const {userId,collectionId} = useParams()
    const [values,setValues] = React.useState([]);


    React.useEffect(() => {
        axios.get(`${global.config.backendUrl}/collection//getAllItems/${userId}/${collectionId}`).then(response => {
            setValues(response.data)
            console.log(response.data)
        }).catch(err => {
            console.log(err);
        })
    }, [])

    return(
        <div>
            {
                values.map(user => (
                    user.collections.map(collection => (
                        <Container maxWidth="lg" style = {{border: "solid 1px black"}}>
                            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                                <Grid container>
                                    <Grid item md={4} xs = {12}>
                                        <CardContent>
                                            <Grid container>
                                                <Grid item xs={6} md={12}>
                                                    <CardMedia
                                                        component="img"
                                                        height="194"
                                                        image="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png"
                                                        alt="Paella dish"
                                                    />
                                                    <CardHeader
                                                        avatar={
                                                            <Avatar sx={{backgroundColor : "red"}} aria-label="recipe">
                                                                R
                                                            </Avatar>
                                                        }
                                                        action={
                                                            <IconButton aria-label="settings">
                                                                <MoreVertIcon />
                                                            </IconButton>
                                                        }
                                                        title="Shrimp and Chorizo Paella"
                                                        subheader="September 14, 2016"
                                                    />
                                                </Grid>
                                                <Grid item xs={6} md={12}>
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary" variant = "h4">
                                                        {collection.name}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        well meaning and kindly.
                                                        <br />
                                                        {'"a benevolent smile"'}
                                                    </Typography>

                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small">Learn More</Button>
                                        </CardActions>
                                    </Grid>
                                    <Grid item md={8} xs = {12}>
                                        <h1>About</h1>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Container>
                    ))
                ))
            }
        </div>
    )
}
export default CollectionShowPage;