import React from 'react'
import ReactMarkdown from "react-markdown";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Accordion,AccordionSummary,AccordionDetails,Typography} from "@mui/material";

function MarkDownAccordion({ markDownInput,collection}) {
  return (
    <Accordion style={{ marginTop: "30px" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>MarkDown Result</Typography>
      </AccordionSummary>
      <AccordionDetails
        style={{
          textAlign: "left",
          width: `${
            markDownInput.length > 0 || collection.description.length > 0
              ? "300px"
              : "0"
          }`,
          height: `${
            markDownInput.length > 0 || collection.description.length > 0
              ? "300px"
              : "0"
          }`,
        }}
      >
        {
          <ReactMarkdown
            children={
              markDownInput.length <= 0 ? collection.description : markDownInput
            }
            style={{ width: "100%", height: "100px" }}
          />
        }
      </AccordionDetails>
    </Accordion>
  );
}

export default MarkDownAccordion