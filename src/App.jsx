// Single-file React starter with a Codewars-inspired look & feel
// Simplified to be puzzle-only: Home -> Level 1 -> Level 2 -> Level 3 -> Success

import React, { useMemo, useState, useRef } from "react";
import { Analytics } from "@vercel/analytics/react";

// ==========================
// ---- CONFIGURABLE PART ----
// ==========================
const LEVEL1_IMAGE_SRC = "/level1-riddle.png"; // Replace with your riddle image path
const FINAL_IMAGE_SRC = "/final-photo.png";   // The hands reaching image for Level 3

const LEVEL1_ANSWER = 3; // <-- X = 3 from the system of equations
const PLAINTEXT_LEVEL2 = "BUE CPC"; // <-- The sentence users must decrypt to
const FINAL_PASSWORD = "BUE_CPC"; // <-- The password hidden inside the final image (ASCII: 73 110 115 112 101 99 116)

function caesarEncrypt(plaintext, shift) {
  const A = "A".charCodeAt(0), a = "a".charCodeAt(0);
  return plaintext
    .split("")
    .map((ch) => {
      const code = ch.charCodeAt(0);
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - A + shift) % 26) + A);
      }
      if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - a + shift) % 26) + a);
      }
      return ch;
    })
    .join("");
}

function normalizeText(s) {
  return (s || "").trim().replace(/\s+/g, " ").toLowerCase();
}

function Button({ children, variant = "primary", ...props }) {
  const base = "px-6 py-3 rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900";
  const variants = {
    primary: `${base} bg-red-600 text-white hover:bg-red-500 focus:ring-red-600`,
    ghost: `${base} bg-transparent text-zinc-200 ring-1 ring-zinc-700 hover:bg-zinc-800/70`,
  };
  return (
    <button className={variants[variant]} {...props}>
      {children}
    </button>
  );
}

function ProgressBar({ step }) {
  const steps = ["level1", "level2", "level3", "success"];
  const currentIndex = steps.indexOf(step);

  return (
    <div className="w-full mb-6">
      <div className="h-2 w-full rounded bg-zinc-800 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-500"
          style={{ width: `${((currentIndex + 1) / steps.length) * 100}%` }}
        />
      </div>
      <div className="mt-2 flex justify-between text-xs text-zinc-400">
        <span>Level 1</span>
        <span>Level 2</span>
        <span>Level 3</span>
        <span>Finish</span>
      </div>
    </div>
  );
}

export default function PuzzleWebsite() {
  const [step, setStep] = useState("home");
  const [level1Input, setLevel1Input] = useState("");
  const [level1Error, setLevel1Error] = useState("");
  const [level2Input, setLevel2Input] = useState("");
  const [level2Error, setLevel2Error] = useState("");
  const [finalInput, setFinalInput] = useState("");
  const [finalError, setFinalError] = useState("");
  
  const level1InputRef = useRef(null);
  const level2InputRef = useRef(null);
  const level3InputRef = useRef(null);

  const ciphertext = useMemo(() => caesarEncrypt(PLAINTEXT_LEVEL2, LEVEL1_ANSWER), []);

  function Shell({ children, title }) {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-6">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          {step !== "home" && <ProgressBar step={step} />}
          {title && (
            <div className="mb-3 flex items-center gap-3">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-red-600 text-white text-xs font-bold"></span>
              <h3 className="font-mono text-xl font-semibold text-zinc-100">{title}</h3>
            </div>
          )}
          <div className="space-y-4">{children}</div>
        </div>
      </div>
    );
  }

  function Home() {
    return (
      <Shell>
        <div className="flex flex-col items-center gap-8">
          <div className="text-center max-w-2xl">
            <blockquote className="text-xl text-zinc-200 font-serif italic leading-relaxed tracking-wide" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
              "Before trying to open a new door, it is wise to study your reflection in the glass you just passed through."
            </blockquote>
          </div>
          
          <div className="fixed top-4 right-4 bg-zinc-800/90 border border-zinc-700 rounded-lg p-3 max-w-xs z-50 backdrop-blur-sm">
            <p className="text-xs text-zinc-400 text-center">
              open it from ur pc or labtop
            </p>
          </div>
          
          <Button onClick={() => setStep("level1")}>Start the Game</Button>
        </div>
      </Shell>
    );
  }

  function Level1() {
    return (
      <Shell title="Level 1">
        <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6">
          <p className="text-xs uppercase tracking-wide text-zinc-500 mb-4">Solve for X</p>
          <div className="space-y-4 text-lg text-zinc-100" style={{ fontFamily: 'cursive, "Brush Script MT", "Lucida Handwriting", serif' }}>
            <div className="flex items-center justify-center transform rotate-1">
              <span className="text-zinc-300" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>X + Y + Z = 14</span>
            </div>
            <div className="flex items-center justify-center transform -rotate-1">
              <span className="text-zinc-300" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>X × Z - Y = 5</span>
            </div>
            <div className="flex items-center justify-center transform rotate-0.5">
              <span className="text-zinc-300" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>(Y - Z) ÷ X = 1</span>
            </div>
          </div>
          <p className="text-sm text-zinc-400 mt-4 text-center">What is the value of X?</p>
        </div>
        <input
          ref={level1InputRef}
          type="number"
          defaultValue=""
          placeholder="Enter number"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-zinc-100"
        />
        {level1Error && <p className="text-sm text-red-400">{level1Error}</p>}
        <Button
          onClick={() => {
            const currentValue = level1InputRef.current ? level1InputRef.current.value : "";
            const n = parseInt(currentValue, 10);
            if (Number.isNaN(n)) {
              setLevel1Error("Please enter a valid number.");
              return;
            }
            if (n === LEVEL1_ANSWER) {
              setStep("level2");
            } else {
              setLevel1Error("Incorrect. Try again!");
            }
          }}
        >
          Confirm
        </Button>
      </Shell>
    );
  }

  function Level2() {
    return (
      <Shell title="Level 2">
        <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs uppercase tracking-wide text-zinc-500">Ciphertext</p>
            <a 
              href="https://www.geeksforgeeks.org/ethical-hacking/caesar-cipher-in-cryptography/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-zinc-400 hover:text-zinc-300 underline"
            >
              hint? 
            </a>
          </div>
          <p className="mt-1 font-mono text-lg text-zinc-100 break-words">{ciphertext}</p>
        </div>
        
        <input
          ref={level2InputRef}
          type="text"
          defaultValue=""
          placeholder="Type the plaintext here"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-zinc-100"
        />
        {level2Error && <p className="text-sm text-red-400">{level2Error}</p>}
        <Button
          onClick={() => {
            const currentValue = level2InputRef.current ? level2InputRef.current.value : "";
            if (normalizeText(currentValue) === normalizeText(PLAINTEXT_LEVEL2)) {
              setStep("level3");
            } else {
              setLevel2Error("That doesn't look right.");
            }
          }}
        >
          Confirm
        </Button>
      </Shell>
    );
  }

  function Level3() {
    return (
      <Shell title="Level 3">
        <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
          <p className="text-xs uppercase tracking-wide text-zinc-500 mb-4">Inspect the image</p>
          <div className="text-center text-zinc-400 text-sm mb-4">
            73 110 115 112 101 99 116
          </div>
          <div className="relative">
            <img
              src={FINAL_IMAGE_SRC}
              alt="Photo of a scenic landscape"
              title="Psst... you found the hidden message! Well done!"
              className="w-full rounded-lg border border-zinc-700"
            />
          </div>
          <p className="text-sm text-zinc-400 mt-4 text-center">What is the hidden password?</p>
        </div>
        <input
          ref={level3InputRef}
          type="text"
          defaultValue=""
          placeholder="Enter the password"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-zinc-100"
        />
        {finalError && <p className="text-sm text-red-400">{finalError}</p>}
        <Button
          onClick={() => {
            const currentValue = level3InputRef.current ? level3InputRef.current.value : "";
            if (normalizeText(currentValue) === normalizeText(FINAL_PASSWORD)) {
              setStep("success");
            } else {
              setFinalError("That's not the right password.");
            }
          }}
        >
          Confirm
        </Button>
      </Shell>
    );
  }

  function Success() {
    return (
      <Shell title="Success!">
        <div className="max-w-2xl mx-auto">
          <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-8 shadow-2xl">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-zinc-100 mb-2">Congratulations!</h2>
              <p className="text-zinc-400 text-sm">You have successfully completed all puzzles</p>
            </div>
            
            <div className="space-y-4 text-zinc-200 leading-relaxed">
              <p>Congratulations—you have unraveled every puzzle.</p>
              
              <p>Each challenge you conquered reveals a deeper truth: problem solving wears many faces.</p>
              
              <p>Some demand sharp calculation, others a keen and patient eye.</p>
              
              <p>Together they whisper the same lesson—that every step of reasoning, every spark of insight, is a doorway to a greater world.</p>
              
              <p>Today, by solving these puzzles, you have taken your first steps into that world—</p>
              
              <p>the boundless realm of problem solving, the very foundation on which programming and computer science stand.</p>
              
              <p>This is more than a skill; it is a way of thinking, a philosophy of creation.</p>
              
              <div className="mt-6 p-4 bg-zinc-800/50 rounded-lg border-l-4 border-red-600">
                <p className="font-semibold text-zinc-100">We await you at the introduction session of the BUE CPC community,</p>
                <p className="text-zinc-200">where this journey will begin to unfold without end.</p>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-zinc-700">
              <p className="text-zinc-400 text-sm text-center">BUE CPC Community</p>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <Button onClick={() => {
              setLevel1Input("");
              setLevel2Input("");
              setFinalInput("");
              setLevel1Error("");
              setLevel2Error("");
              setFinalError("");
              setStep("home");
            }}>Play Again</Button>
          </div>
        </div>
      </Shell>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-zinc-200 flex flex-col items-center justify-center">
      {step === "home" && <Home />}
      {step === "level1" && <Level1 />}
      {step === "level2" && <Level2 />}
      {step === "level3" && <Level3 />}
      {step === "success" && <Success />}
      <Analytics />
    </div>
  );
}
