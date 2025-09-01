import { useDispatch, useSelector } from "react-redux";
import { drawCard, selectDeck, selectGameStatus } from "../state/gameSlice";
import { GAME_STATUS, GAME_CONFIG } from "../constants/gameConstants";
import Card from "./Card";
import { useState, useCallback } from "react";

function Deck() {
	const deck = useSelector(selectDeck);
   const gameStatus = useSelector(selectGameStatus);
   const [isClickable, setIsClickable] = useState(true);
	const dispatch = useDispatch();

	const handleDraw = useCallback((id, type) => {
      setIsClickable(false);
      setTimeout(() => {
         dispatch(drawCard({ id, type }));
         setIsClickable(true);
      }, GAME_CONFIG.DRAW_DELAY);
	}, [dispatch]);

   if(gameStatus !== GAME_STATUS.ONGOING) {
      return (
         <div className="deck">
			   {gameStatus !== GAME_STATUS.IDLE && (
               <h1 className="message">
				      {gameStatus === GAME_STATUS.WON ? "You won 🎉" : "You lost 😿"}
			      </h1>
            )}
		   </div>
      );
   }

	return (
		<div className="deck">			
			{deck.map(({ id, type }) => (
				<Card key={id} onDraw={handleDraw} id={id} type={type} isClickable={isClickable}/>
			))}
		</div>
	);
}

export default Deck;
