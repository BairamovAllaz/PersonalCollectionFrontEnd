import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  MainPaper: {
    p: 2,
    margin: "auto",
    maxWidth: "30%",
    [theme.breakpoints.down('600')] : {
      maxWidth : "100%",
    },
    flexGrow: 1,
    marginTop: "60px",
    marginLeft : "10px",
    justifyContent: "center",
  },
  Img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  ButtonBase: {
    width: "128px",
    height: "128px",
  },
  TypographyItemName: {
    cursor: "pointer",
    fontSize: "25px",
  },
  TypographyInfo: {
    pt: 1,
    cursor: "pointer",
  },
  MainDivTags: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  Chip: {
    marginLeft: "5px",
    marginTop: "10px",
  },
  BageDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
