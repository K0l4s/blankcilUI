
import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import { AudioPlayerProvider } from './components/post/podcastPost/PodcastContext';
import Router from './page/router/Router';
import useAuth from './config/useAuth';
import { HideSideProvider } from './config/useSidebar';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  useAuth();
  document.title = 'Blankcil';
  document.querySelector('meta[name="description"]').content = "Blankcil là một trang web cho phép người dùng tạo ra các podcast chữa lành và đẩy healing.";

  return (
    <div className="App">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <meta name="description" content="Blankcil là một trang web cho phép người dùng tạo ra các podcast chữa lành và đẩy healing."></meta>
      <Provider store={store}> 
      <ChakraProvider>
        <AudioPlayerProvider>
          <HideSideProvider>
            <Router />
            </HideSideProvider>
        </AudioPlayerProvider>
      </ChakraProvider>
      </Provider>
    </div>
  );
}

export default App;
