import Navigation from './src/navigation';
import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports';

Amplify.configure(awsconfig);

const App = () => {
  return <Navigation />;
};

export default App;
