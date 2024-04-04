'use client'
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
// import p from '@mui/material/p';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';
import { songs } from '@/api';


const Widget = styled('div')(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: 360,
  maxWidth: '100%',
  margin: 'auto',
  position: 'relative',
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
  backdropFilter: 'blur(40px)',
  display: 'flex',
  // justifyContent: "space-evenly",
  flexDirection: 'column',
  gap: '3px'
}));

const CoverImage = styled('div')({
  objectFit: 'cover',
  overflow: 'hidden',
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: 'rgba(0,0,0,0.08)',
  '& > img': {
    width: '100%',
  },
});

const TinyText = styled('p')({
  fontSize: '0.75rem',
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});
export default function MusicPlayerSlider() {
  // const duration = 200; // seconds
  const ref = React.useRef<HTMLAudioElement>()
  const [position, setPosition] = React.useState(32);
  const [paused, setPaused] = React.useState(false);
  function formatDuration(currentTime: number) {
    const minute = Math.floor(currentTime / 60);
    const secondLeft = currentTime - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }
  const [song, setSong] = React.useState(songs.map(song => [
    song
  ]))
  const [current, setCurrent] = React.useState(0)
  const [prev, setPrev] = React.useState(0)
  const [percentage, setPercentage] = React.useState<number>(0)
  const [isPlaying, setIsPlaying] = React.useState(false)

  const handleControl = () => {
    if (isPlaying) {
      ref.current!.play()
      setIsPlaying(false)
    } else {

      ref.current!.pause()
      setIsPlaying(true)
    }
  }
  const [currentTime, setCurrentTime] = React.useState<number>(0)
  const [duration, setDuration] = React.useState<number>(0)

  const handlePrev = () => {
    setPrev(current)
    setCurrent(prev => (prev - 1 + songs.length) % songs.length)
  }
  const handleNext = () => {
    setPrev(current)
    setCurrent(prev => (prev + 1) % songs.length)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = ref.current
    audio!.currentTime = (audio!.duration / 100) * e.target.value || e.target.value
    setPercentage(e.target.value)
  }
  const getCurrentTime = (e: React.ChangeEvent<HTMLAudioElement>) => {
    const percentage = (e.target.currentTime / e.target.duration) * 100
    const time = e.target.currentTime
    setPercentage(percentage)
    setCurrentTime(time)
  }
  const volume = 
  if (prev !== current) {
    window.location.reload
  }
  return (
    <div className=' h-screen w-full flex justify-center items-center bg-slate-200'>
      <Widget className=' shadow-md'>
        <div className=' flex justify-between items-center flex-col'>
          <CoverImage className=' h-[250px] w-[100%] rounded-2xl'>
            <img
              className=' h-full w-full rounded-2xl object-cover'
              alt=" - Chilling Sunday"
              src={song[current][0].image}
            />
          </CoverImage>
          <div className=' ml-1 min-w-0 gap-y-2 flex flex-col w-full py-3'>
            <p className=' font-medium text-[12px]'>
              {
                song[current][0].album
              }
            </p>
            <div className=' flex  justify-between items-center'>
              <p className=' text-nowrap  text-[18px]'>
                <b>{song[current][0].title}</b>
              </p>
              <p className=' text-nowrap tracking-tight text-[12px] text-slate-600'>
                {song[current][0].artist}
              </p>
            </div>
          </div>
        </div>
        <Slider
          aria-label="time-indicator"
          size="small"
          value={percentage}
          valueLabelFormat={(value) => formatDuration(value).slice(0, 4)}
          valueLabelDisplay='auto'
          min={0}
          step={(e) => { onChange(e) }}
          max={100}
          onChange={(e) => { onChange(e); }}
          sx={{
            height: 4,
            '& .MuiSlider-thumb': {
              width: 8,
              height: 8,
              transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
              '&::before': {
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
              },
              '&:hover, &.Mui-focusVisible': {
              },
              '&.Mui-active': {
                width: 20,
                height: 20,
              },
            },
            '& .MuiSlider-rail': {
              opacity: 0.28,
            },
          }}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: 0,
          }}
        >
          <TinyText>{formatDuration(currentTime).slice(0, 4)}</TinyText>
          <TinyText>{formatDuration('-' + duration - currentTime).slice(0, 5)}</TinyText>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: -3,
          }}
        >
          <IconButton aria-label="previous song" onClick={handlePrev} disabled={current === 0} >
            <FastRewindRounded fontSize="large" />
          </IconButton>
          <IconButton

            aria-label={paused ? 'play' : 'pause'}
            onClick={() => {
              setPaused(!paused)
              handleControl()
            }}
          >
            {paused ? (
              <PlayArrowRounded
                sx={{ fontSize: '3rem' }}
              // 
              />
            ) : (
              <PauseRounded sx={{ fontSize: '3rem' }} />
            )}
          </IconButton>
          <IconButton aria-label="next song" onClick={handleNext} disabled={current === songs.length - 1}>
            <FastForwardRounded fontSize="large" />
          </IconButton>
        </Box>
        <Stack spacing={2} direction="row" sx={{ mb: 1, px: 1 }} alignItems="center">
          <VolumeDownRounded />
          <Slider
            aria-label="Volume"
            defaultValue={30}
            sx={{
              '& .MuiSlider-track': {
                border: 'none',
              },
              '& .MuiSlider-thumb': {
                width: 24,
                height: 24,
                backgroundColor: '#fff',
                '&::before': {
                  boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                },
                '&:hover, &.Mui-focusVisible, &.Mui-active': {
                  boxShadow: 'none',
                },
              },
            }}
          />
          <VolumeUpRounded />
        </Stack>
      </Widget >
      <audio ref={ref} src={song[current][0].songUrl}
        onLoadedData={(e: React.SyntheticEvent<HTMLAudioElement>) => {
          setDuration(e.target.duration.toFixed(2))
        }
        } onTimeUpdate={getCurrentTime} onEnded={handleNext} />
    </div >
  );
}
