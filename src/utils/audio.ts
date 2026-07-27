// Web Audio API Synth for Neon Cyberpunk Sound Effects

class SoundManager {
  private audioCtx: AudioContext | null = null;
  public enabled: boolean = true;

  private init() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playNeonBeep(frequency = 880, duration = 0.12, type: OscillatorType = 'sine') {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(frequency * 1.5, this.audioCtx.currentTime + duration);

      gain.gain.setValueAtTime(0.12, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch {
      // Ignore audio restriction errors
    }
  }

  playLikeChime() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.audioCtx) return;

      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playNeonBeep(freq, 0.1, 'triangle');
        }, idx * 60);
      });
    } catch {
      // Ignore
    }
  }

  playCopySound() {
    this.playNeonBeep(1200, 0.08, 'sine');
  }

  playLaserClick() {
    this.playNeonBeep(440, 0.09, 'sawtooth');
  }
}

export const soundManager = new SoundManager();
