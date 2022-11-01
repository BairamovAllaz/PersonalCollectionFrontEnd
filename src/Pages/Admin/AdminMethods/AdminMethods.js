//TODO FIX (SEND DATA WITH REQ BODY INSTEAD OF PARAMS)
import axios from "axios";
export function DeleteUser(userId) {
  axios
    .delete(`${global.config.backendUrl}/admin/DeleteUserById/${userId}`,{},{
      withCredentials : true,
    })
    .then(response => {
      window.location.reload();
    })
    .catch(err => {
      console.log(err);
    });
}
export function AddUserToAdmin(userId) {
  axios
    .put(`${global.config.backendUrl}/admin/updateToAdmin/${userId}`,{}, { 
      withCredentials : true
    })
    .then(response => {
      window.location.reload();
    })
    .catch(err => {
      console.log(err);
    });
}

export function RemoveFromAdmin(userId) {
    axios
      .put(`${global.config.backendUrl}/admin/RemoveFromAdmin/${userId}`,{}, { 
        withCredentials : true
      })
      .then(response => {
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
}

export function BlockUserById(userId) { 
  axios
    .put(`${global.config.backendUrl}/admin/BlockUserById/${userId}`,{}, { 
      withCredentials : true,
    })
    .then(response => {
      window.location.reload();
    })
    .catch(err => {
      console.log(err);
    });
}

export function ReturnDeletedUser(userId){
  axios
    .put(`${global.config.backendUrl}/admin/ReturnUserById/${userId}`,{}, { 
      withCredentials : true,
    })
    .then(response => {
      window.location.reload();
    })
    .catch(err => {
      console.log(err);
    });
};

export function ReturnBlockedUser(userId){
  axios
    .put(`${global.config.backendUrl}/admin/ReturnBlockedUserById/${userId}`,{}, { 
      withCredentials : true
    })
    .then(response => {
      window.location.reload();
    })
    .catch(err => {
      console.log(err);
    });
};
