import React from "react";
import {Stack,Chip} from '@mui/material'
function ItemsContainerFields({ element }) {
  return (
    <div>
      <Stack direction="row" spacing={1}>
        {element.itemTags.map(tag => (
          <div>
            <Chip label={tag.tag_name} />
          </div>
        ))}
      </Stack>
      <div style={{ marginTop: "20px" }}>
        {element.itemFields.map(field => (
          <p style={{ textAlign: "left", paddingLeft: "3px" }}>
            {field.field_value != "" && (
              <p>
                <span style={{ color: "#88909e", fontWeight: "700" }}>
                  {field.field_name}
                </span>{" "}
                : <span>{field.field_value}</span>
              </p>
            )}
          </p>
        ))}
      </div>
    </div>
  );
}

export default ItemsContainerFields;
