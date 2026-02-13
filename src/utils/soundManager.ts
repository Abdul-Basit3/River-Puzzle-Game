class SoundManager {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;
  private volume: number = 0.7; // Default 70% for better audibility

  constructor() {
    // Initialize on first user interaction
    this.initAudioContext();
  }

  private initAudioContext() {
    if (typeof window !== 'undefined' && !this.audioContext) {
      try {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch (e) {
        console.warn('Web Audio API not supported');
      }
    }
  }

  private playTone(frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.3) {
    if (!this.enabled || !this.audioContext) return;

    try {
      // Resume audio context if suspended (browser autoplay policy)
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }

      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = type;

      // Apply master volume
      const adjustedVolume = volume * this.volume;
      gainNode.gain.setValueAtTime(adjustedVolume, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + duration);
    } catch (e) {
      console.warn('Error playing sound:', e);
    }
  }

  private playClickSound() {
    // Short high-pitched click
    this.playTone(800, 0.1, 'sine', 0.2);
  }

  private playSheepSound() {
    // Sheep "baa" sound - more realistic with vibrato
    if (!this.audioContext) return;
    
    const now = this.audioContext.currentTime;
    const osc = this.audioContext.createOscillator();
    const vibrato = this.audioContext.createOscillator();
    const vibratoGain = this.audioContext.createGain();
    const gainNode = this.audioContext.createGain();
    
    osc.type = 'sawtooth';
    vibrato.type = 'sine';
    vibrato.frequency.value = 6; // Vibrato speed
    vibratoGain.gain.value = 15; // Vibrato depth
    
    // Connect vibrato to frequency modulation
    vibrato.connect(vibratoGain);
    vibratoGain.connect(osc.frequency);
    
    // Baa sound pattern - "Baaaa-aaaa"
    osc.frequency.setValueAtTime(350, now);
    osc.frequency.linearRampToValueAtTime(320, now + 0.1);
    osc.frequency.setValueAtTime(310, now + 0.15);
    osc.frequency.linearRampToValueAtTime(280, now + 0.4);
    osc.frequency.linearRampToValueAtTime(260, now + 0.6);
    
    const adjustedVolume = 0.3 * this.volume;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(adjustedVolume, now + 0.05);
    gainNode.gain.setValueAtTime(adjustedVolume * 0.9, now + 0.2);
    gainNode.gain.linearRampToValueAtTime(adjustedVolume * 0.6, now + 0.4);
    gainNode.gain.linearRampToValueAtTime(0, now + 0.65);
    
    osc.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    vibrato.start(now);
    osc.start(now);
    vibrato.stop(now + 0.65);
    osc.stop(now + 0.65);
  }

  private playWolfSound() {
    // Wolf growl and bark - aggressive sound
    if (!this.audioContext) return;
    
    const now = this.audioContext.currentTime;
    
    // Growl part (low rumble)
    const growl = this.audioContext.createOscillator();
    const growlGain = this.audioContext.createGain();
    growl.type = 'sawtooth';
    
    growl.frequency.setValueAtTime(80, now);
    growl.frequency.linearRampToValueAtTime(120, now + 0.2);
    growl.frequency.setValueAtTime(100, now + 0.25);
    
    const adjustedVolume = 0.35 * this.volume;
    growlGain.gain.setValueAtTime(0, now);
    growlGain.gain.linearRampToValueAtTime(adjustedVolume, now + 0.05);
    growlGain.gain.linearRampToValueAtTime(adjustedVolume * 0.7, now + 0.2);
    growlGain.gain.linearRampToValueAtTime(0, now + 0.3);
    
    growl.connect(growlGain);
    growlGain.connect(this.audioContext.destination);
    growl.start(now);
    growl.stop(now + 0.3);
    
    // Bark part (sharp attack)
    setTimeout(() => {
      if (!this.audioContext) return;
      const barkNow = this.audioContext.currentTime;
      const bark1 = this.audioContext.createOscillator();
      const bark2 = this.audioContext.createOscillator();
      const barkGain = this.audioContext.createGain();
      
      bark1.type = 'square';
      bark2.type = 'sawtooth';
      bark1.frequency.value = 400;
      bark2.frequency.value = 200;
      
      const barkVolume = 0.3 * this.volume;
      barkGain.gain.setValueAtTime(barkVolume, barkNow);
      barkGain.gain.exponentialRampToValueAtTime(0.01, barkNow + 0.15);
      
      bark1.connect(barkGain);
      bark2.connect(barkGain);
      barkGain.connect(this.audioContext.destination);
      
      bark1.start(barkNow);
      bark2.start(barkNow);
      bark1.stop(barkNow + 0.15);
      bark2.stop(barkNow + 0.15);
    }, 300);
  }

  private playCabbageSound() {
    // Leafy rustle and crunch sound
    if (!this.audioContext) return;
    
    // Rustling leaves sound (high frequency noise bursts)
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        if (!this.audioContext) return;
        const rustleNow = this.audioContext.currentTime;
        const osc = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        osc.type = 'square';
        osc.frequency.value = 1500 + Math.random() * 1000;
        
        const rustleVolume = (0.08 + Math.random() * 0.05) * this.volume;
        gainNode.gain.setValueAtTime(rustleVolume, rustleNow);
        gainNode.gain.exponentialRampToValueAtTime(0.01, rustleNow + 0.04);
        
        osc.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        osc.start(rustleNow);
        osc.stop(rustleNow + 0.04);
      }, i * 40);
    }
    
    // Crunch sound (lower frequency)
    setTimeout(() => {
      if (!this.audioContext) return;
      const crunchNow = this.audioContext.currentTime;
      const crunch = this.audioContext.createOscillator();
      const crunchGain = this.audioContext.createGain();
      
      crunch.type = 'square';
      crunch.frequency.setValueAtTime(600, crunchNow);
      crunch.frequency.linearRampToValueAtTime(400, crunchNow + 0.1);
      
      const crunchVolume = 0.15 * this.volume;
      crunchGain.gain.setValueAtTime(crunchVolume, crunchNow);
      crunchGain.gain.linearRampToValueAtTime(0, crunchNow + 0.12);
      
      crunch.connect(crunchGain);
      crunchGain.connect(this.audioContext.destination);
      
      crunch.start(crunchNow);
      crunch.stop(crunchNow + 0.12);
    }, 200);
  }

  private playFarmerSound() {
    // Farmer cheerful "Yee-haw!" or whistle
    if (!this.audioContext) return;
    
    const now = this.audioContext.currentTime;
    
    // "Yee" part - rising tone
    const yee = this.audioContext.createOscillator();
    const yeeGain = this.audioContext.createGain();
    yee.type = 'sine';
    
    yee.frequency.setValueAtTime(400, now);
    yee.frequency.linearRampToValueAtTime(600, now + 0.15);
    
    const adjustedVolume = 0.25 * this.volume;
    yeeGain.gain.setValueAtTime(0, now);
    yeeGain.gain.linearRampToValueAtTime(adjustedVolume, now + 0.03);
    yeeGain.gain.linearRampToValueAtTime(0, now + 0.15);
    
    yee.connect(yeeGain);
    yeeGain.connect(this.audioContext.destination);
    yee.start(now);
    yee.stop(now + 0.15);
    
    // "Haw" part - falling tone with vibrato
    setTimeout(() => {
      if (!this.audioContext) return;
      const hawNow = this.audioContext.currentTime;
      const haw = this.audioContext.createOscillator();
      const vibrato = this.audioContext.createOscillator();
      const vibratoGain = this.audioContext.createGain();
      const hawGain = this.audioContext.createGain();
      
      haw.type = 'sine';
      vibrato.type = 'sine';
      vibrato.frequency.value = 8;
      vibratoGain.gain.value = 20;
      
      vibrato.connect(vibratoGain);
      vibratoGain.connect(haw.frequency);
      
      haw.frequency.setValueAtTime(650, hawNow);
      haw.frequency.linearRampToValueAtTime(500, hawNow + 0.25);
      
      const hawVolume = 0.25 * this.volume;
      hawGain.gain.setValueAtTime(0, hawNow);
      hawGain.gain.linearRampToValueAtTime(hawVolume, hawNow + 0.05);
      hawGain.gain.linearRampToValueAtTime(hawVolume * 0.7, hawNow + 0.15);
      hawGain.gain.linearRampToValueAtTime(0, hawNow + 0.3);
      
      haw.connect(hawGain);
      hawGain.connect(this.audioContext.destination);
      
      vibrato.start(hawNow);
      haw.start(hawNow);
      vibrato.stop(hawNow + 0.3);
      haw.stop(hawNow + 0.3);
    }, 180);
  }

  private playBoatSound() {
    if (!this.audioContext) return;
    
    // Water splash sound - multiple tones
    this.playTone(200, 0.3, 'sine', 0.15);
    setTimeout(() => this.playTone(150, 0.4, 'sine', 0.1), 100);
    setTimeout(() => this.playTone(180, 0.3, 'sine', 0.12), 200);
    
    // Boat creaking
    setTimeout(() => this.playTone(120, 0.2, 'square', 0.08), 300);
  }

  private playSuccessSound() {
    // Happy ascending tones
    const notes = [523, 659, 784, 1047]; // C, E, G, C (major chord)
    notes.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 0.3, 'sine', 0.2), i * 100);
    });
  }

  private playErrorSound() {
    // Dramatic danger sound - alarm-like
    if (!this.audioContext) return;
    
    // Siren effect
    const osc1 = this.audioContext.createOscillator();
    const osc2 = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    osc1.type = 'sawtooth';
    osc2.type = 'square';
    
    const now = this.audioContext.currentTime;
    
    // Alternating frequencies for alarm effect
    osc1.frequency.setValueAtTime(600, now);
    osc1.frequency.linearRampToValueAtTime(400, now + 0.15);
    osc1.frequency.setValueAtTime(600, now + 0.3);
    osc1.frequency.linearRampToValueAtTime(400, now + 0.45);
    osc1.frequency.setValueAtTime(600, now + 0.6);
    
    osc2.frequency.setValueAtTime(300, now);
    osc2.frequency.linearRampToValueAtTime(200, now + 0.15);
    osc2.frequency.setValueAtTime(300, now + 0.3);
    osc2.frequency.linearRampToValueAtTime(200, now + 0.45);
    osc2.frequency.setValueAtTime(300, now + 0.6);
    
    // Apply master volume
    const adjustedVolume = 0.4 * this.volume;
    gainNode.gain.setValueAtTime(adjustedVolume, now);
    gainNode.gain.linearRampToValueAtTime(0, now + 0.7);
    
    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.7);
    osc2.stop(now + 0.7);
  }

  private playCompleteSound() {
    // Epic victory fanfare with multiple layers
    if (!this.audioContext) return;
    
    const now = this.audioContext.currentTime;
    
    // Main melody - triumphant ascending scale
    const mainMelody = [
      { freq: 523, time: 0, duration: 0.2 },     // C5
      { freq: 659, time: 0.2, duration: 0.2 },   // E5
      { freq: 784, time: 0.4, duration: 0.2 },   // G5
      { freq: 1047, time: 0.6, duration: 0.3 },  // C6
      { freq: 1319, time: 0.9, duration: 0.3 },  // E6
      { freq: 1568, time: 1.2, duration: 0.5 },  // G6
    ];
    
    // Harmony layer
    const harmony = [
      { freq: 392, time: 0, duration: 0.2 },     // G4
      { freq: 523, time: 0.2, duration: 0.2 },   // C5
      { freq: 659, time: 0.4, duration: 0.2 },   // E5
      { freq: 784, time: 0.6, duration: 0.3 },   // G5
      { freq: 1047, time: 0.9, duration: 0.3 },  // C6
      { freq: 1319, time: 1.2, duration: 0.5 },  // E6
    ];
    
    // Bass notes
    const bass = [
      { freq: 131, time: 0, duration: 0.4 },     // C3
      { freq: 196, time: 0.6, duration: 0.6 },   // G3
      { freq: 262, time: 1.2, duration: 0.5 },   // C4
    ];
    
    const playNote = (freq: number, startTime: number, duration: number, type: OscillatorType, volume: number) => {
      if (!this.audioContext) return;
      
      const osc = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      osc.type = type;
      osc.frequency.value = freq;
      
      // Apply master volume
      const adjustedVolume = volume * this.volume;
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(adjustedVolume, startTime + 0.05);
      gainNode.gain.linearRampToValueAtTime(adjustedVolume * 0.7, startTime + duration * 0.5);
      gainNode.gain.linearRampToValueAtTime(0, startTime + duration);
      
      osc.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      osc.start(startTime);
      osc.stop(startTime + duration);
    };
    
    // Play all layers
    mainMelody.forEach(note => playNote(note.freq, now + note.time, note.duration, 'sine', 0.3));
    harmony.forEach(note => playNote(note.freq, now + note.time, note.duration, 'sine', 0.15));
    bass.forEach(note => playNote(note.freq, now + note.time, note.duration, 'triangle', 0.2));
    
    // Add sparkle effect at the end
    setTimeout(() => {
      [1047, 1319, 1568, 2093].forEach((freq, i) => {
        setTimeout(() => this.playTone(freq, 0.15, 'sine', 0.2), i * 50);
      });
    }, 1200);
  }

  play(soundName: string) {
    if (!this.enabled) return;
    
    this.initAudioContext();

    switch (soundName) {
      case 'click':
        this.playClickSound();
        break;
      case 'boat':
        this.playBoatSound();
        break;
      case 'success':
        this.playSuccessSound();
        break;
      case 'error':
        this.playErrorSound();
        break;
      case 'complete':
        this.playCompleteSound();
        break;
      case 'sheep':
        this.playSheepSound();
        break;
      case 'wolf':
        this.playWolfSound();
        break;
      case 'cabbage':
        this.playCabbageSound();
        break;
      case 'farmer':
        this.playFarmerSound();
        break;
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  isEnabled() {
    return this.enabled;
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  getVolume() {
    return this.volume;
  }
}

export const soundManager = new SoundManager();
