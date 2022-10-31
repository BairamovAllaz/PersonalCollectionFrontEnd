import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  BoxMain: {
    marginTop: "20px",
    overflowY: "scroll",
    maxHeight: "500px",
    marginLeft: { sm: "140px" },
  },
  AccordionMain: {
    marginTop: "20px",
    width: { xs: "100%", sm: "60%" },
    border: "solid 1px #e3e1da",
  },
  ButtonBase: {
    width: "80px",
    height: "80px",
  },

  Img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  TypoItemName: {
    display: "block",
    justifyContent: "center",
    marginTop: "10px",
  },
  TypoItemNameSpan: {
    fontWeight: "700",
  },
});
