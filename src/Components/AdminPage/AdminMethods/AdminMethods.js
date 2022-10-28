import axios from "axios";
export function DeleteUser(userId) {
  axios
    .delete(`${global.config.backendUrl}/admin/DeleteUserById/${userId}`)
    .then(response => {
      window.location.reload();
    })
    .catch(err => {
      console.log(err);
    });
}
export function AddUserToAdmin(userId) {
  axios
    .put(`${global.config.backendUrl}/admin/updateToAdmin/${userId}`)
    .then(response => {
      window.location.reload();
    })
    .catch(err => {
      console.log(err);
    });
}

export function RemoveFromAdmin(userId) {
    axios
      .put(`${global.config.backendUrl}/admin/RemoveFromAdmin/${userId}`)
      .then(response => {
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
}

export function BlockUserById(userId) { 
  axios
    .put(`${global.config.backendUrl}/admin/BlockUserById/${userId}`)
    .then(response => {
      window.location.reload();
    })
    .catch(err => {
      console.log(err);
    });
}
