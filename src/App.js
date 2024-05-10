
import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import { AudioPlayerProvider } from './components/post/podcastPost/PodcastContext';
import Router from './page/router/Router';
import favicon from './favicon.ico';
import { SpeedInsights } from "@vercel/speed-insights/react"
function App() {
  const mode = localStorage.getItem('themeMode') || 'dark';
  if(mode === 'dark') {
    document.body.style.backgroundColor = '#1a1a1a';
    document.body.style.color = 'white';
    localStorage.setItem('chakra-ui-color-mode', 'dark');
  } else{
    document.body.style.backgroundColor = 'white';
    document.body.style.color = 'black';
    localStorage.setItem('chakra-ui-color-mode', 'light');
  }
  document.title = 'Blankcil';
  document.querySelector('link[rel="icon"]').href = favicon;
  document.querySelector('link[rel="apple-touch-icon"]').href = favicon;
  document.querySelector('meta[name="description"]').content = "Blankcil là một trang web cho phép người dùng tạo ra các podcast chữa lành và đẩy healing.";

  // Kiểm tra nếu không có video nào đang chạy thì phát âm thanh nền
  // useEffect(() => {
  //   if (audioRefs.current.every((audio) => !audio.current?.paused)) {
  //     audioRefs.current[0].current.play();
  //   }
  // }, [audioRefs]);
  
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
