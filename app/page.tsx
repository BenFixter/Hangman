"use client";

import Hangman from "@/components/Hangman";
import { motion } from "framer-motion";
import { generate } from "random-words";
import { useEffect, useState } from "react";
import { hangmanStages, keys } from "./constants";
enum GameState {
	MAIN_MENU = "Main Menu",
	PLAYING = "Playing",
	WON = "Congratulations, You Won!",
	LOST = "Game Over, You Lost!",
}

export default function Home() {
	const generateRandomWord = () => generate({ minLength: 10 }).toString();

	const [word, setWord] = useState(generateRandomWord());
	const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
	const [gameState, setGameState] = useState<GameState>(GameState.MAIN_MENU);
	const [guesses, setGuesses] = useState(0);
	const maxGuesses = hangmanStages.length;

	console.log(word);

	const wordOutput = word
		.split("")
		.map((char) =>
			guessedLetters.includes(char.toLowerCase())
				? char
				: char === " "
					? " "
					: "_",
		);

	const handleClick = (key: string) => {
		if (gameState !== GameState.PLAYING) return;

		setGuessedLetters([key, ...guessedLetters]);

		if (!word.toLowerCase().includes(key)) {
			setGuesses((prevGuesses) => prevGuesses + 1);
		}
	};

	useEffect(() => {
		if (gameState === GameState.PLAYING) {
			if (guesses >= maxGuesses) {
				setGameState(GameState.LOST);
				setGuessedLetters(word.toLowerCase().split(""));
			}

			if (!wordOutput.includes("_")) {
				setGameState(GameState.WON);
			}
		}
	}, [guesses, wordOutput, gameState, word, maxGuesses]);

	const handleRestart = () => {
		setGuessedLetters([]);
		setGuesses(0);
		setGameState(GameState.PLAYING);
		setWord(generateRandomWord());
	};

	return (
		<>
			{/* Main Menu */}
			{gameState === GameState.MAIN_MENU ? (
				<div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-gray-100 to-gray-300 text-gray-800">
					<h1 className="text-5xl font-extrabold pb-8">Welcome to Hangman</h1>

					<button
						type="button"
						className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md"
						onClick={() => setGameState(GameState.PLAYING)}
					>
						Start Game
					</button>
				</div>
			) : (
				<div className="p-2 bg-gradient-to-r from-gray-100 to-gray-300 min-h-screen flex items-center justify-center">
					<div className="grid grid-cols-2 gap-4">
						{/* Hangman Image */}
						<div className="flex justify-center">
							<Hangman guesses={guesses} />
						</div>

						<div className="flex flex-col justify-center items-center">
							{/* Word Display */}
							<motion.div
								className="flex text-4xl font-bold my-2"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.5 }}
							>
								{wordOutput.map((char, index) => (
									<motion.div
										key={index}
										className="px-2 py-2"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ delay: index * 0.1, duration: 0.3 }}
									>
										{char}
									</motion.div>
								))}
							</motion.div>

							{/* Keyboard */}
							{keys.map((row, rowIndex) => (
								<div key={rowIndex} className="flex justify-center m-2">
									{row.map((key, keyIndex) => (
										<motion.button
											key={keyIndex}
											className="mx-2 text-2xl px-6 py-4 bg-white rounded-lg disabled:bg-gray-400 disabled:text-white shadow-2xl hover:bg-blue-600 hover:text-white "
											onClick={() => handleClick(key)}
											disabled={
												GameState.PLAYING !== gameState ||
												guessedLetters.includes(key)
											}
											animate={{
												scale:
													GameState.PLAYING !== gameState ||
													guessedLetters.includes(key)
														? 1
														: 1.1,
											}}
											whileTap={{
												scale: 1, // Slightly scale down when clicked
												transition: { duration: 0.1 },
											}}
											transition={{ delay: keyIndex * 0.1, duration: 0.3 }}
										>
											{key}
										</motion.button>
									))}
								</div>
							))}
							{/* Game State (Won/Lost) */}
							{gameState !== GameState.PLAYING && (
								<div className="mt-6 text-center">
									<div className="text-2xl font-semibold mb-4">
										{gameState === GameState.WON
											? GameState.WON
											: GameState.LOST}
									</div>
									<button
										type="button"
										onClick={handleRestart}
										className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 active:bg-blue-800"
									>
										Restart Game
									</button>
								</div>
							)}

							{/* Wrong Guesses Display */}
							<div className="text-lg font-semibold mt-6">
								Wrong Guesses: {guesses}/{maxGuesses}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
