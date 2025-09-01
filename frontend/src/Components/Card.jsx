import { useRef, useState, useEffect } from "react";

function Card({ onDraw, id, type, isClickable }) {
	const [isHidden, setIsHidden] = useState(true);
	const [isDrawing, setIsDrawing] = useState(false);
	const ref = useRef(null);

	useEffect(() => {
		const handleClick = () => {
			if (!isClickable) return;
			
			element.removeEventListener("click", handleClick);
			setIsDrawing(true);
			
			setTimeout(() => {
				setIsHidden(false);
				setIsDrawing(false);
				onDraw(id, type);
			}, 800);
		};
		
		const element = ref.current;
		if (isClickable) {
			element.addEventListener("click", handleClick);
		}
		
		return () => {
			element?.removeEventListener("click", handleClick);
		};
	}, [isClickable, id, type, onDraw]);

	const getCardEmoji = () => {
		switch (type) {
			case "cat": return "😸";
			case "defuse": return "🛡️";
			case "exploding-kitten": return "💥";
			case "shuffle": return "🔄";
			case "skip": return "⏭️";
			default: return "❓";
		}
	};

	const getCardClass = () => {
		let classes = "card";
		if (isDrawing) classes += " drawing";
		if (!isHidden) classes += ` ${type}`;
		if (isClickable) classes += " clickable";
		return classes;
	};

	return (
		<div className={getCardClass()} ref={ref}>
			<div className="card-content">
				{isHidden ? "❓" : getCardEmoji()}
			</div>
		</div>
	);
}

export default Card;