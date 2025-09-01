import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const StatsChart = ({ analytics }) => {
  const winRateData = {
    labels: ['Wins', 'Losses'],
    datasets: [
      {
        data: [analytics.games_won, analytics.games_lost],
        backgroundColor: ['#10B981', '#EF4444'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <div className="stats-chart">
      <h3>Win Rate</h3>
      <div className="chart-container">
        <Doughnut data={winRateData} options={options} />
      </div>
      <div className="stats-summary">
        <div className="stat-item">
          <span className="stat-label">Total Games:</span>
          <span className="stat-value">{analytics.total_games}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Win Rate:</span>
          <span className="stat-value">{analytics.win_rate?.toFixed(1)}%</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Best Streak:</span>
          <span className="stat-value">{analytics.best_streak}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Avg Game Time:</span>
          <span className="stat-value">{Math.round(analytics.avg_game_time)}s</span>
        </div>
      </div>
    </div>
  );
};

export default StatsChart;