import React, { useState } from 'react';
import { useSprings, animated, to as interpolate } from '@react-spring/web';
import { useDrag } from 'react-use-gesture';
import styles from './styles.module.css';
import img1 from './assets/images/1.jpg';

import img3 from './assets/images/4.jpg';
import img5 from './assets/images/5jpg';

const images = [img5, img1, img3 ]; // ภาพที่ใช้ใน deck

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
                width: '1000px',
                height: '1000px',
              }}
              className="card"
            />
          </animated.div>
        ))}
      </div>
    );
  }

export default Deck;
