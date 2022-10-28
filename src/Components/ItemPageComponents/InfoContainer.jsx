import React from "react";
import {
  ListItemText,
  Paper,
  List,
  Chip,
  Stack,
  ListItem,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
function InfoContainer({ itemCol }) {
  return (
    <Paper sx={{ padding: "10px" }}>
      <div
        style={{
          textAlign: "left",
          fontSize: "20px",
          paddingTop: "-40px",
        }}
      >
        <InfoIcon />
      </div>
      <List sx={{ marginBottom: "30px" }}>
        <ListItem
          sx={{
            display: "grid",
            justifyContent: "center",
            marginTop: "-30px",
          }}
        >
          <ListItemText sx={{ marginTop: "20px" }}>
            <Stack direction="row" sx={{ marginLeft: "-10px" }} spacing={1}>
              {itemCol.itemTags.map(tag => (
                <div>
                  <Chip label={tag.tag_name} />
                </div>
              ))}
            </Stack>
          </ListItemText>
          <ListItemText sx={{ marginTop: "20px" }}>
            <span
              style={{
                fontWeight: "700",
                color: "gray",
              }}
            >
              Name :{" "}
            </span>
            {itemCol.item_name}
          </ListItemText>
          {itemCol.itemFields.map(fieldCol => (
            <div>
              <ListItemText sx={{ marginTop: "20px" }}>
                <span
                  style={{
                    fontWeight: "700",
                    color: "gray",
                  }}
                >
                  {fieldCol.field_name}
                </span>{" "}
                : {fieldCol.field_value}
              </ListItemText>
            </div>
          ))}
        </ListItem>
      </List>
    </Paper>
  );
}

export default InfoContainer;
