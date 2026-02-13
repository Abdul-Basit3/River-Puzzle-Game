class BackgroundMusic {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying: boolean = false;
  private oscillators: OscillatorNode[] = [];
  private bufferSources: AudioBufferSourceNode[] = [];

  constructor() {
    this.initAudioContext();
  }

  private initAudioContext() {
    if (typeof window !== 'undefined' && !this.audioContext) {
      try {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        this.masterGain = this.audioContext.createGain();
        this.masterGain.connect(this.audioContext.destination);
        this.masterGain.gain.value = 0.5; // Default 50% for background music
      } catch (e) {
        console.warn('Web Audio API not supported');
      }
    }
  }

  private playWaterAmbience() {
    if (!this.audioContext || !this.masterGain) return;

    // Create gentle water sounds using filtered noise
    const bufferSize = this.audioContext.sampleRate * 2;
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    // Generate pink noise for water sound
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.audioContext.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    // Filter to make it sound like water
    const filter = this.audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 400;
    filter.Q.value = 1;

    const gainNode = this.audioContext.createGain();
    gainNode.gain.value = 0.3; // Increased from 0.08

    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);

    noise.start();
    this.bufferSources.push(noise);
  }

  private playBirdsChirping() {
    if (!this.audioContext || !this.masterGain) return;

    const playChirp = () => {
      if (!this.isPlaying || !this.audioContext || !this.masterGain) return;

      const now = this.audioContext.currentTime;
      const osc = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      // Random bird chirp frequencies
      const startFreq = 2000 + Math.random() * 1000;
      const endFreq = startFreq + 500 + Math.random() * 500;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(startFreq, now);
      osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.1);

      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.2, now + 0.02); // Increased from 0.05
      gainNode.gain.linearRampToValueAtTime(0, now + 0.15);

      osc.connect(gainNode);
      gainNode.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.15);

      // Random interval for next chirp
      const nextChirp = 2000 + Math.random() * 4000;
      setTimeout(playChirp, nextChirp);
    };

    // Start first chirp after a delay
    setTimeout(playChirp, 1000 + Math.random() * 2000);
  }

  private playDistantSheep() {
    if (!this.audioContext || !this.masterGain) return;

    const playSheepBaa = () => {
      if (!this.isPlaying || !this.audioContext || !this.masterGain) return;

      const now = this.audioContext.currentTime;
      const osc = this.audioContext.createOscillator();
      const vibrato = this.audioContext.createOscillator();
      const vibratoGain = this.audioContext.createGain();
      const gainNode = this.audioContext.createGain();

      osc.type = 'sawtooth';
      vibrato.type = 'sine';
      vibrato.frequency.value = 5;
      vibratoGain.gain.value = 10;
      
      vibrato.connect(vibratoGain);
      vibratoGain.connect(osc.frequency);
      
      // Distant sheep baa with vibrato
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.linearRampToValueAtTime(280, now + 0.15);
      osc.frequency.linearRampToValueAtTime(260, now + 0.3);

      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.1, now + 0.05); // Increased from 0.025
      gainNode.gain.linearRampToValueAtTime(0.06, now + 0.2); // Increased from 0.015
      gainNode.gain.linearRampToValueAtTime(0, now + 0.35);

      osc.connect(gainNode);
      gainNode.connect(this.masterGain);

      vibrato.start(now);
      osc.start(now);
      vibrato.stop(now + 0.35);
      osc.stop(now + 0.35);

      // Random interval for next baa (8-20 seconds)
      const nextBaa = 8000 + Math.random() * 12000;
      setTimeout(playSheepBaa, nextBaa);
    };

    // Start first baa after a delay
    setTimeout(playSheepBaa, 5000 + Math.random() * 5000);
  }

  private playDistantWolf() {
    if (!this.audioContext || !this.masterGain) return;

    const playWolfHowl = () => {
      if (!this.isPlaying || !this.audioContext || !this.masterGain) return;

      const now = this.audioContext.currentTime;
      
      // Low growl first
      const growl = this.audioContext.createOscillator();
      const growlGain = this.audioContext.createGain();
      growl.type = 'sawtooth';
      growl.frequency.setValueAtTime(90, now);
      growl.frequency.linearRampToValueAtTime(110, now + 0.3);
      
      growlGain.gain.setValueAtTime(0, now);
      growlGain.gain.linearRampToValueAtTime(0.05, now + 0.1); // Increased from 0.012
      growlGain.gain.linearRampToValueAtTime(0, now + 0.35);
      
      growl.connect(growlGain);
      growlGain.connect(this.masterGain);
      growl.start(now);
      growl.stop(now + 0.35);
      
      // Then howl
      setTimeout(() => {
        if (!this.isPlaying || !this.audioContext || !this.masterGain) return;
        
        const howlNow = this.audioContext.currentTime;
        const osc1 = this.audioContext.createOscillator();
        const osc2 = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        osc1.type = 'sawtooth';
        osc2.type = 'sine';
        
        // Distant wolf howl - eerie rising and falling
        osc1.frequency.setValueAtTime(160, howlNow);
        osc1.frequency.linearRampToValueAtTime(280, howlNow + 0.4);
        osc1.frequency.linearRampToValueAtTime(320, howlNow + 0.7);
        osc1.frequency.linearRampToValueAtTime(200, howlNow + 1.2);

        osc2.frequency.setValueAtTime(120, howlNow);
        osc2.frequency.linearRampToValueAtTime(220, howlNow + 0.4);
        osc2.frequency.linearRampToValueAtTime(260, howlNow + 0.7);
        osc2.frequency.linearRampToValueAtTime(150, howlNow + 1.2);

        gainNode.gain.setValueAtTime(0, howlNow);
        gainNode.gain.linearRampToValueAtTime(0.08, howlNow + 0.3); // Increased from 0.018
        gainNode.gain.linearRampToValueAtTime(0.06, howlNow + 0.8); // Increased from 0.015
        gainNode.gain.linearRampToValueAtTime(0, howlNow + 1.2);

        osc1.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(this.masterGain);

        osc1.start(howlNow);
        osc2.start(howlNow);
        osc1.stop(howlNow + 1.2);
        osc2.stop(howlNow + 1.2);
      }, 400);

      // Random interval for next howl (15-30 seconds)
      const nextHowl = 15000 + Math.random() * 15000;
      setTimeout(playWolfHowl, nextHowl);
    };

    // Start first howl after a delay
    setTimeout(playWolfHowl, 10000 + Math.random() * 10000);
  }

  private playWindSound() {
    if (!this.audioContext || !this.masterGain) return;

    const bufferSize = this.audioContext.sampleRate * 3;
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    // Generate wind-like noise
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.5;
    }

    const noise = this.audioContext.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.audioContext.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 300;
    filter.Q.value = 0.5;

    const gainNode = this.audioContext.createGain();
    gainNode.gain.value = 0.15; // Increased from 0.04

    // Slowly modulate wind volume
    const lfo = this.audioContext.createOscillator();
    const lfoGain = this.audioContext.createGain();
    lfo.frequency.value = 0.2; // Very slow modulation
    lfoGain.gain.value = 0.08; // Increased from 0.02

    lfo.connect(lfoGain);
    lfoGain.connect(gainNode.gain);

    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);

    lfo.start();
    noise.start();
    
    this.bufferSources.push(noise);
    this.oscillators.push(lfo);
  }

  private playCalmMelody() {
    if (!this.audioContext || !this.masterGain) return;

    // More engaging melody - peaceful river theme
    const melody = [
      { freq: 523.25, time: 0, duration: 0.5 },    // C5
      { freq: 587.33, time: 0.5, duration: 0.5 },  // D5
      { freq: 659.25, time: 1, duration: 0.5 },    // E5
      { freq: 783.99, time: 1.5, duration: 0.5 },  // G5
      { freq: 659.25, time: 2, duration: 0.5 },    // E5
      { freq: 587.33, time: 2.5, duration: 0.5 },  // D5
      { freq: 523.25, time: 3, duration: 1 },      // C5
      { freq: 392.00, time: 4, duration: 0.5 },    // G4
      { freq: 440.00, time: 4.5, duration: 0.5 },  // A4
      { freq: 523.25, time: 5, duration: 1 },      // C5
    ];

    const playNote = (freq: number, startTime: number, duration: number) => {
      if (!this.audioContext || !this.masterGain) return;

      const osc = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      osc.type = 'sine';
      osc.frequency.value = freq;

      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.15, startTime + 0.1); // Increased from 0.04
      gainNode.gain.linearRampToValueAtTime(0.12, startTime + duration * 0.5); // Increased from 0.03
      gainNode.gain.linearRampToValueAtTime(0, startTime + duration);

      osc.connect(gainNode);
      gainNode.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + duration);
    };

    const now = this.audioContext.currentTime;
    melody.forEach(note => {
      playNote(note.freq, now + note.time, note.duration);
    });

    // Loop the melody
    setTimeout(() => {
      if (this.isPlaying) {
        this.playCalmMelody();
      }
    }, 6500);
  }

  start() {
    if (this.isPlaying) return;
    
    this.initAudioContext();
    
    if (this.audioContext?.state === 'suspended') {
      this.audioContext.resume();
    }

    this.isPlaying = true;
    this.playWaterAmbience();
    this.playWindSound();
    this.playBirdsChirping();
    this.playDistantSheep();
    this.playDistantWolf();
    this.playCalmMelody();
  }

  stop() {
    this.isPlaying = false;
    
    this.oscillators.forEach(osc => {
      try {
        osc.stop();
      } catch (e) {
        // Already stopped
      }
    });
    
    this.bufferSources.forEach(source => {
      try {
        source.stop();
      } catch (e) {
        // Already stopped
      }
    });
    
    this.oscillators = [];
    this.bufferSources = [];
  }

  setVolume(volume: number) {
    if (this.masterGain) {
      // Direct volume control (0-1 range)
      this.masterGain.gain.value = Math.max(0, Math.min(1, volume));
    }
  }

  getVolume() {
    if (this.masterGain) {
      return this.masterGain.gain.value;
    }
    return 0.5;
  }
}

export const backgroundMusic = new BackgroundMusic();
