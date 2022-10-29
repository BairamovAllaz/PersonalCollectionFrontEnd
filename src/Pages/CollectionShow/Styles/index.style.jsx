import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  BoxMain: {
    width: "100%",
    height: "100%",
  },
  DeletedDiv: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  ContainerMain: {
    marginTop: "30px",
  },
  FormBox: {
    maxWidth: "100%",
    height: "auto",
    marginLeft: { sm: "140px" },
  },
  ItemsText: {
    textAlign: "center",
    paddingTop: "20px",
  },
  DivItemsContainer: {
    width: "100%",
    maxHeight: "500px",
    textAlign : "center"
  },
});
