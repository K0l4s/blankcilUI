
import './App.css';
import { AudioPlayerProvider } from './components/post/podcastPost/PodcastContext';
import Router from './page/router/Router';

function App() {
  const mode = localStorage.getItem('themeMode') || 'dark';
  if(mode === 'dark') {
    document.body.style.backgroundColor = '#1a1a1a';
    // document.body.style.color = 'white';
  } else{
    document.body.style.backgroundColor = 'white';
    // document.body.style.color = 'black';
  }
  return (
    <div className="App">
      <AudioPlayerProvider>
      <Router />
      </AudioPlayerProvider>
    </div>
  );
}

export default App;
