import React from 'react'
function LoginSuccess() {
  React.useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 1000);
  }, []);
  return (
    <div>
      <h1>You are good</h1>
    </div>
  );
}
export default LoginSuccess