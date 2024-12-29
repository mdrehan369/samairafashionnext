import axios from "axios";

declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: any;
  }
}

export const initFacebookSdk = () => {
  return new Promise((resolve, reject) => {
    // Load the Facebook SDK asynchronously
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: "1196352455112834",
        cookie: true,
        xfbml: true,
        version: "v16.0",
      });
      // Resolve the promise when the SDK is loaded
      resolve(true);
    };
  });
};

export const getFacebookLoginStatus = () => {
  return new Promise((resolve, reject) => {
    window.FB.getLoginStatus((response: any) => {
      resolve(response);
    });
  });
};

export const fbLogin = () => {
  return new Promise((resolve, reject) => {
    window.FB.login((response: any) => {
      (async () => {
        if (response.authResponse) {
          const res = await axios.get(
            `/api/v1/users/facebookLogin/${response.userID}`,
            {
              baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
              withCredentials: true,
            }
          );

          resolve(res.data.data);
        } else {
          reject("User cancelled login or did not fully authorize.");
        }
      })();
    });
  });
};
