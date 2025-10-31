import { useEffect, useState } from 'react';

interface BackgroundMusicProps {
  isPlaying: boolean;
}

const BackgroundMusic = ({ isPlaying }: BackgroundMusicProps) => {
  const [player, setPlayer] = useState<any>(null);

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    (window as any).onYouTubeIframeAPIReady = () => {
      const newPlayer = new (window as any).YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: 'DeCnsghKxd4',
        playerVars: {
          autoplay: 0,
          controls: 0,
          loop: 1,
          playlist: 'DeCnsghKxd4',
        },
        events: {
          onReady: (event: any) => {
            event.target.setVolume(30);
            setPlayer(event.target);
          },
        },
      });
    };
  }, []);

  useEffect(() => {
    if (player) {
      if (isPlaying) {
        player.playVideo();
      } else {
        player.pauseVideo();
      }
    }
  }, [isPlaying, player]);

  return <div id="youtube-player" className="hidden" />;
};

export default BackgroundMusic;
