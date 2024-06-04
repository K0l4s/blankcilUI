
import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import { AudioPlayerProvider } from './components/post/podcastPost/PodcastContext';
import Router from './page/router/Router';
import useAuth from './useAuth';
import { useEffect } from 'react';
function App() {
  useAuth();
  // const mode = localStorage.getItem('themeMode') || 'dark';
  // if(mode === 'dark') {
  //   document.body.style.backgroundColor = '#1a1a1a';
  //   document.body.style.color = 'white';
  //   localStorage.setItem('chakra-ui-color-mode', 'dark');
  // } else{
  //   document.body.style.backgroundColor = 'white';
  //   document.body.style.color = 'black';
  //   localStorage.setItem('chakra-ui-color-mode', 'light');
  // }
  document.title = 'Blankcil';
  // document.querySelector('link[rel="icon"]').href = favicon;
  // document.querySelector('link[rel="apple-touch-icon"]').href = favicon;
  document.querySelector('meta[name="description"]').content = "Blankcil là một trang web cho phép người dùng tạo ra các podcast chữa lành và đẩy healing.";
  
  return (
    <div className="App">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <meta name="description" content="Blankcil là một trang web cho phép người dùng tạo ra các podcast chữa lành và đẩy healing."></meta>
      <ChakraProvider>
      <AudioPlayerProvider>
      <Router />
      </AudioPlayerProvider>
      </ChakraProvider>
    </div>
  );
}

export default App;
