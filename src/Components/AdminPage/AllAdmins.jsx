import React from 'react'
import AdminUserContainer from './AdminUserContainer';
import Box from '@material-ui/core/Box'
function AllAdmins({value,index,AllAdmins}) {
  const [admins,setAdmins] = React.useState([]);

  React.useEffect(() => { 
    setAdmins(AllAdmins);
  },[AllAdmins])
  return (
    <div hidden={value !== index} id="alladmins" aria-labelledby="All-admins">
      <Box
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          overflowY: "scroll",
        }}
      >
        {admins.map(user => (
          <AdminUserContainer user={user} />
        ))}
      </Box>
    </div>
  );
}

export default AllAdmins