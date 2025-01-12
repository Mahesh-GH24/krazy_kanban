//import the UserLogin interface for typing UserInfo
import { UserLogin } from "../interfaces/UserLogin";

//Function to send a POST request to the '/auth/login' endpoint with user login information
const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    //Send a Post request to '/auth/login' with the provided user login information from the FE in JSON format
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    });

    //Exit by throwing error if response status is not OK (200-299)
    if (!response.ok) {
      const errorData = await response.json(); // Parse error response as JSON
      throw new Error(`Error: ${errorData.message}`);
    }

    //if good response, Parse the response body as JSON and return the data receive from the server to FE
    const data = await response.json();
    return data; 
  } catch (err) {
    // Log any errors that occur during fetch call
    console.log('Error from user login: ', err);
    // Return a rejected promise with an error message
    return Promise.reject('Could not fetch user info');
  }
}

// Export the login function to be used elsewhere in the application
export { login };
