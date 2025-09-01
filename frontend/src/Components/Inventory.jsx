import { useSelector } from "react-redux";
import { selectInventory } from "../state/gameSlice";

function Inventory() {
	const inventory = useSelector(selectInventory);

	const inventoryItems = [
		{ type: "defuse", emoji: "🛡️", name: "Defuse Cards", count: inventory.defuse },
		{ type: "cat", emoji: "😸", name: "Cat Cards", count: inventory.cat },
		{ type: "shuffle", emoji: "🔄", name: "Shuffle Cards", count: inventory.shuffle || 0 },
		{ type: "skip", emoji: "⏭️", name: "Skip Cards", count: inventory.skip || 0 }
	];

	return (
		<div className="inventory">
			<h3>🎒 Your Cards</h3>
			<div className="inventory-list">
				{inventoryItems.map((item) => (
					<div key={item.type} className="inventory-item">
						<div className="item-info">
							<span className="item-emoji">{item.emoji}</span>
							<span className="item-name">{item.name}</span>
						</div>
						<span className="item-count">{item.count}</span>
					</div>
				))}
			</div>
		</div>
	);
}

export default Inventory;