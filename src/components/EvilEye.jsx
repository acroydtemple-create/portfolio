import { Renderer, Program, Mesh, Triangle, Texture } from 'ogl';
import { useEffect, useRef } from 'react';
import './EvilEye.css';

function hexToVec3(hex) {
  const fallback = '#ff6f37';
  const h = (hex || fallback).replace('#', '').padEnd(6, '0').slice(0, 6);

  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ];
}

function generateNoiseTexture(size = 256) {
  const data = new Uint8Array(size * size * 4);

  function hash(x, y, s) {
    let n = x * 374761393 + y * 668265263 + s * 1274126177;
    n = Math.imul(n ^ (n >>> 13), 1274126177);
    return ((n ^ (n >>> 16)) >>> 0) / 4294967296;
  }

  function noise(px, py, freq, seed) {
    const fx = (px / size) * freq;
    const fy = (py / size) * freq;
    const ix = Math.floor(fx);
    const iy = Math.floor(fy);
    const tx = fx - ix;
    const ty = fy - iy;
    const w = freq | 0;
    const v00 = hash(((ix % w) + w) % w, ((iy % w) + w) % w, seed);
    const v10 = hash((((ix + 1) % w) + w) % w, ((iy % w) + w) % w, seed);
    const v01 = hash(((ix % w) + w) % w, (((iy + 1) % w) + w) % w, seed);
    const v11 = hash((((ix + 1) % w) + w) % w, (((iy + 1) % w) + w) % w, seed);
    return v00 * (1 - tx) * (1 - ty) + v10 * tx * (1 - ty) + v01 * (1 - tx) * ty + v11 * tx * ty;
  }

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      let v = 0;
      let amp = 0.46;
      let totalAmp = 0;
      for (let o = 0; o < 8; o += 1) {
        const f = 26 * (1 << o);
        v += amp * noise(x, y, f, o * 31);
        totalAmp += amp;
        amp *= 0.64;
      }
      v /= totalAmp;
      v = (v - 0.5) * 2.45 + 0.5;
      v = Math.max(0, Math.min(1, v));

      const val = Math.round(v * 255);
      const i = (y * size + x) * 4;
      data[i] = val;
      data[i + 1] = val;
      data[i + 2] = val;
      data[i + 3] = 255;
    }
  }

  return data;
}

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform sampler2D uNoiseTexture;
uniform float uPupilSize;
uniform float uIrisWidth;
uniform float uGlowIntensity;
uniform float uIntensity;
uniform float uScale;
uniform float uNoiseScale;
uniform vec2 uMouse;
uniform float uPupilFollow;
uniform float uFlameSpeed;
uniform vec3 uEyeColor;
uniform vec3 uBgColor;

float softEllipse(vec2 uv, vec2 scale) {
  return length(uv * scale);
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution.xy) / uResolution.y;
  uv /= uScale;

  float ft = uTime * uFlameSpeed;
  vec2 eyeUv = uv * vec2(0.82, 1.18);
  float eyeDistance = length(eyeUv);
  float distanceMask = 1.0 - eyeDistance;
  float angle = atan(eyeUv.y, eyeUv.x) / 6.2831853;
  vec2 polarUv = vec2(eyeDistance * 1.7, angle * 3.2);

  vec4 noiseA = texture2D(
    uNoiseTexture,
    polarUv * vec2(0.24, 8.6) * uNoiseScale + vec2(-ft * 0.12, ft * 0.035)
  );
  vec4 noiseB = texture2D(
    uNoiseTexture,
    polarUv * vec2(0.34, 5.4) * uNoiseScale + vec2(-ft * 0.22, -ft * 0.02)
  );
  vec4 noiseC = texture2D(
    uNoiseTexture,
    polarUv * vec2(0.16, 10.0) * uNoiseScale + vec2(-ft * 0.1, ft * 0.05)
  );

  float radialBreakup = (noiseA.r * 0.58 + noiseB.r * 0.34 + noiseC.r * 0.28);
  float innerRing = smoothstep(0.78 + uIrisWidth * 0.18, 0.22, eyeDistance);
  innerRing *= smoothstep(0.18, 0.52, eyeDistance + radialBreakup * 0.18);
  innerRing += smoothstep(0.98, 0.36, eyeDistance + (noiseA.r - 0.5) * 0.42) * 0.78;

  float fireEdge = smoothstep(1.46, 0.42, eyeDistance + (noiseC.r - 0.42) * 0.7);
  fireEdge *= smoothstep(0.18, 0.9, eyeDistance);
  fireEdge = pow(fireEdge, 1.18) * (0.55 + radialBreakup);

  float innerFlare = smoothstep(0.9, 0.0, eyeDistance);
  innerFlare *= (noiseB.r * 1.5 + 0.3);

  vec2 pupilOffset = uMouse * uPupilFollow * 0.09;
  vec2 pupilUv = eyeUv - pupilOffset;
  float pupil = 1.0 - length(pupilUv * vec2(11.5, 2.0));
  pupil = clamp(pupil * uPupilSize / 0.34, 0.0, 1.0);

  float pupilSmoke = smoothstep(0.28, 0.0, length(pupilUv * vec2(6.4, 1.65)));
  float horizontalTear = smoothstep(1.2, 0.22, softEllipse(uv + vec2(0.02, 0.0), vec2(0.68, 1.3)));
  horizontalTear *= smoothstep(0.12, 0.9, eyeDistance + noiseA.r * 0.2);

  float outerGlow = smoothstep(1.5, 0.46, softEllipse(uv, vec2(0.68, 1.32)));
  outerGlow *= uGlowIntensity * (0.34 + noiseC.r * 0.36);

  vec3 hotCore = mix(uEyeColor, vec3(1.0, 0.88, 0.36), 0.72);
  vec3 ember = mix(uEyeColor, vec3(0.95, 0.18, 0.05), 0.45);
  vec3 color = uBgColor;
  color += ember * fireEdge * uIntensity * 1.36;
  color += hotCore * innerRing * uIntensity * 1.18;
  color += hotCore * innerFlare * uIntensity * 0.56;
  color += uEyeColor * outerGlow * 1.45;
  color *= 1.0 - pupil * 0.96;
  color *= 1.0 - pupilSmoke * 0.82;
  color *= 0.82 + horizontalTear * 0.26;

  float vignette = smoothstep(1.86, 0.58, length(uv * vec2(0.66, 1.08)));
  color *= vignette;

  gl_FragColor = vec4(color, 1.0);
}
`;

export default function EvilEye({
  eyeColor = '#ff6f37',
  intensity = 1.8,
  pupilSize = 0.72,
  irisWidth = 0.28,
  glowIntensity = 0.52,
  scale = 0.8,
  noiseScale = 1,
  pupilFollow = 0.7,
  flameSpeed = 1,
  backgroundColor = '#020102',
  className = '',
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const renderer = new Renderer({
      alpha: true,
      antialias: false,
      premultipliedAlpha: false,
      dpr: Math.min(window.devicePixelRatio || 1, 1.6),
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const noiseTexture = new Texture(gl, {
      image: generateNoiseTexture(256),
      width: 256,
      height: 256,
      generateMipmaps: false,
      flipY: false,
    });
    noiseTexture.minFilter = gl.LINEAR;
    noiseTexture.magFilter = gl.LINEAR;
    noiseTexture.wrapS = gl.REPEAT;
    noiseTexture.wrapT = gl.REPEAT;

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    const onMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      mouse.tx = ((event.clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1;
      mouse.ty = -(((event.clientY - rect.top) / Math.max(1, rect.height)) * 2 - 1);
      mouse.tx = Math.max(-1, Math.min(1, mouse.tx));
      mouse.ty = Math.max(-1, Math.min(1, mouse.ty));
    };

    const onMouseLeave = () => {
      mouse.tx = 0;
      mouse.ty = 0;
    };

    window.addEventListener('pointermove', onMouseMove);
    window.addEventListener('pointerleave', onMouseLeave);

    let program;
    const resize = () => {
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      if (program) {
        program.uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height];
      }
    };

    program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height] },
        uNoiseTexture: { value: noiseTexture },
        uPupilSize: { value: pupilSize },
        uIrisWidth: { value: irisWidth },
        uGlowIntensity: { value: glowIntensity },
        uIntensity: { value: intensity },
        uScale: { value: scale },
        uNoiseScale: { value: noiseScale },
        uMouse: { value: [0, 0] },
        uPupilFollow: { value: pupilFollow },
        uFlameSpeed: { value: flameSpeed },
        uEyeColor: { value: hexToVec3(eyeColor) },
        uBgColor: { value: hexToVec3(backgroundColor) },
      },
    });

    const geometry = new Triangle(gl);
    const mesh = new Mesh(gl, { geometry, program });
    container.appendChild(gl.canvas);

    resize();
    window.addEventListener('resize', resize);

    let animationFrameId;
    const update = (time) => {
      animationFrameId = requestAnimationFrame(update);
      mouse.x += (mouse.tx - mouse.x) * 0.045;
      mouse.y += (mouse.ty - mouse.y) * 0.045;
      program.uniforms.uMouse.value = [mouse.x, mouse.y];
      program.uniforms.uTime.value = time * 0.001;
      renderer.render({ scene: mesh });
    };
    animationFrameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMouseMove);
      window.removeEventListener('pointerleave', onMouseLeave);
      if (gl.canvas.parentNode === container) {
        container.removeChild(gl.canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [
    backgroundColor,
    eyeColor,
    flameSpeed,
    glowIntensity,
    intensity,
    irisWidth,
    noiseScale,
    pupilFollow,
    pupilSize,
    scale,
  ]);

  return <div ref={containerRef} className={`evil-eye-container ${className}`} />;
}
