import Navigation from './src/navigation';
import {Amplify} from 'aws-amplify';
import {withAuthenticator} from 'aws-amplify-react-native';
import awsconfig from './src/aws-exports';

Amplify.configure(awsconfig);

const App = () => {
  return <Navigation />;
};

const signUpConfig = {
  hideAllDefaults: true,
  signUpFields: [
    {
      label: "Full name",
      key: "name",
      required: true,
      displayOrder: 1,
      type: "string",
      placeholder: "Full name",
    },
    {
      label: "Email",
      key: "email",
      required: true,
      displayOrder: 2,
      type: "string",
      placeholder: "Email",
    },
    {
      label: "Username",
      key: "username",
      required: true,
      displayOrder: 3,
      type: "string",
      placeholder: "Username/handle",
    },
    {
      label: "Password",
      key: "password",
      required: true,
      displayOrder: 4,
      type: "password",
      placeholder: "Password",
    },
  ],
};

export default withAuthenticator(App, {signUpConfig});
