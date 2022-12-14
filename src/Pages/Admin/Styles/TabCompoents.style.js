import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  MainBox: {
    width: "100%",
    maxheight: "100%",
    display: "flex",
    flexWrap: "wrap",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});
