import { hangmanStages } from "@/app/constants";

type HangmanProps = {
	guesses: number;
};

const Hangman = ({ guesses }: HangmanProps) => {
	const renderHangman = () => {
		const stages = hangmanStages.slice(0, guesses);

		return (
			<div className="relative">
				{/* Post */}
				<div className="bg-black w-4 h-96  absolute" />
				{/* Beam */}
				<div className="bg-black w-48 h-3 absolute" />

				<div className="hangman-container">
					{stages.includes("rope") && (
						<div className="bg-black w-4 h-16 absolute left-48" />
					)}
					{stages.includes("head") && (
						<div className="w-16 h-16 bg-black rounded-full absolute left-[10.5rem] top-10" />
					)}
					{stages.includes("body") && (
						<div className="w-4 h-32 bg-black absolute left-48 top-20" />
					)}
					{stages.includes("leftArm") && (
						<div className="w-4 h-16 bg-black absolute left-[10.5rem] top-24 rotate-[-55deg]" />
					)}
					{stages.includes("rightArm") && (
						<div className="w-4 h-16 bg-black absolute left-[13.5rem] top-24 rotate-[55deg]" />
					)}
					{stages.includes("leftLeg") && (
						<div className="w-4 h-16 bg-black absolute left-[10.75rem] top-48 rotate-45" />
					)}
					{stages.includes("rightLeg") && (
						<div className="w-4 h-16 bg-black absolute left-[13.25rem] top-48 -rotate-45" />
					)}
				</div>
			</div>
		);
	};
	return <div>{renderHangman()}</div>;
};

export default Hangman;
