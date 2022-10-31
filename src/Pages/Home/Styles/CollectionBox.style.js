import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  PaperContainer: {
    width: "100%",
  },
  CardContainer: {
    width: "100%",
  },
  CardMedia: {
    maxHeight: "250px",
    minWidth: "280px",
  },
  CardContent: {
    textAlign: "center",
  },
  List: {
    bgcolor: "background.paper",
    marginLeft: "20px",
    margin: "0 auto",
  },
  ListItemText: {
    textAlign: "center",
  },
  IconButton: {
    cursor: "pointer",
    fontSize: "30px",
    marginLeft: "30px",
  },
  IconButtonAccount: {
    cursor: "pointer",
    fontSize: "30px",
  },
});
