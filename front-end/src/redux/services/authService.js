import axios from "axios";

const API_URL = "/api/v1/auth/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "signin", { email, password })
      .then((response) => {
        if (response.data.jwt) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        console.log("response", response)
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(firstName, lastName, email, password) {
    return axios.post(API_URL + "signup", {
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "password": password,
    });
  }
}

export default new AuthService();