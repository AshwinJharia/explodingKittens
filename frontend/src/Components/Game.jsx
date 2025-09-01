import Deck from "./Deck";
import Status from "./Status";

function Game() {
	return (
		<section className="game">
			<Status />
			<Deck />
		</section>
	);
}

export default Game;