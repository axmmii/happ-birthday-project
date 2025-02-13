import React, { useState, useRef } from 'react';
import { useSprings, animated, to as interpolate } from '@react-spring/web';
import { useDrag } from 'react-use-gesture';
import styles from './styles.module.css';
import { Header, MessageSection } from './components/ui';
import { MemoryZone } from './components/common';
import { useModal } from './hooks/useModal';
import { useInView } from 'framer-motion';
import img1 from './assets/images/5.jpg';
import img2 from './assets/images/4.jpg';
import img3 from './assets/images/1.jpg';
import img4 from './assets/images/3.jpg';
import img5 from './assets/images/2.jpg';
import billieAudio from './assets/images/pixxel.mp3';
import { PlayIcon, PauseIcon } from '@heroicons/react/20/solid';
import { _messages, _birthdayMessages } from "./assets/mock/mock";
const images = [img1, img2, img3, img5]; 

// Helper functions for animation
const to = (i) => ({ x: 0, y: i * -4, scale: 1, rot: -10 + Math.random() * 20, delay: i * 100 });
const from = () => ({ x: 0, y: -1000, rot: 0, scale: 1.5 });
const trans = (r, s) => `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

function Deck() {
    const [gone] = useState(() => new Set());
    const [props, api] = useSprings(images.length, i => ({
      ...to(i),
      from: from(i),
    }));
    const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
      const trigger = velocity > 0.2;
      const dir = xDir < 0 ? -1 : 1;
      if (!down && trigger) gone.add(index);
      api.start(i => {
        if (index !== i) return;
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0;
        const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0);
        const scale = down ? 1.1 : 1;
        return { x, rot, scale, delay: undefined, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 }}; 
      });
      if (!down && gone.size === images.length)
        setTimeout(() => {
          gone.clear();
          api.start(i => to(i));
        }, 600);
    });
    
    return (
      <div className="deck-container flex justify-center mb-8">
        {props.map(({ x, y, rot, scale }, i) => (
          <animated.div className={styles.deck} key={i} style={{ x, y }}>
            <animated.div
              {...bind(i)}
              style={{
                transform: interpolate([rot, scale], trans),
                backgroundImage: `url(${images[i]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width:'1000px',
                height:'1000px',
                position: 'absolute',
              }}
              className="card " // ใช้คลาสที่ปรับขนาด
            />
          </animated.div>
        ))}
      </div>
    );
  }
  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
export default function App() {
  const { isModalVisible, currentImage, closeModal } = useModal();
  const messageRef = useRef(null);
  const memoryZoneRef = useRef(null);
  const audioRef = useRef(null);
  const isInViewMessageRef = useInView(messageRef, { once: true, amount: 0.2 });
  const isInViewMemoryZoneRef = useInView(memoryZoneRef, { once: true, amount: 0.2 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  // const MAX_VOLUME = 20;
  const [progress, setProgress] = useState(0);
  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // const handleVolume = (e) => {
  //   const volume = Number(e.target.value) / MAX_VOLUME;
  //   if (audioRef.current) {
  //     audioRef.current.volume = volume;
  //   }
  // };
  const handleTimeUpdate = () => {
    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    setProgress((currentTime / duration) * 100);
  };
  const startAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
      setAudioStarted(true);
    }
  };

  return (
    <div className={styles.container}>
      {!audioStarted && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <button onClick={startAudio} className="bg-pink-500 text-white px-4 py-2 rounded-lg text-xl">
            กดเพื่อดูความน่ารักได้ที่ปุ่มนี้!!
          </button>
        </div>
      )}
       
      <div className="flex flex-col items-center max-w-[450px] py-12 gap-28 relative">
        
        <Header content={{ title: "Happy Valentine's Day", subtitle: "Maple🌹" , className:"mb-[200px]" }} />
        
       
        <div className='mb-[250px] '>
        <Deck />
        </div>
       <div className="text-pink-500 text-3xl  text-center font-medium w-[350px] text-wrap font-['Kanit'] mt-[110px]">เพลงที่ทำให้เราได้เจอกัน</div>
        <div className="music-player bg-gray-900 rounded-2xl p-4 text-center shadow-lg w-60 mx-auto h-[500px]">
  <img src={img4} alt="Album Cover" className="rounded-lg mb-4 w-[300px] h-[250px]" />
  <div className="text-gray-400 text-xs">Maple 🎧</div>
  <h2 className="text-white text-lg font-semibold mt-2">อยากให้เธอลอง</h2>
  <p className="text-gray-400 mb-4">Musketeers</p>
  
  <div className="flex items-center justify-center mb-4">
    <button onClick={toggleAudio} className="text-white">
      {isPlaying ? <PauseIcon className="h-8 w-8" /> : <PlayIcon className="h-8 w-8" />}
    </button>
  </div>
  
  <div className="progress-bar bg-gray-700 rounded-full h-1 w-full mb-4">
    <div
      className="bg-white h-1 rounded-full"
      style={{ width: `${progress}%` }}
    ></div>
  </div>

  <div className="flex justify-between text-xs text-gray-400">
  <span>{audioRef.current ? formatTime(audioRef.current.currentTime) : "0:00"}</span>
  <span>{audioRef.current ? `-${formatTime(audioRef.current.duration - audioRef.current.currentTime)}` : "0:00"}</span>
</div>

  <audio
    ref={audioRef}
    src={billieAudio}
    onTimeUpdate={handleTimeUpdate}
    onEnded={() => setIsPlaying(false)}
  />
</div>
        {/* Message Sections */}
      <div>
        <MessageSection data={_messages} ref={messageRef} isInView={isInViewMessageRef} />
        <MemoryZone ref={memoryZoneRef} isInView={isInViewMemoryZoneRef} data={_birthdayMessages} />
        </div>
        <div className=" font-bold text-[#f78da4] text-3xl">Captions 💕</div>
      </div>
      
      {isModalVisible && (
        <div className="modal show" onClick={closeModal}>
          <div className="modal-content">
            {currentImage && <img src={currentImage} alt="Preview" className="modal-image" />}
          </div>
        </div>
      )}
    </div>
  );
}
