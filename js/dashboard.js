/**
 * Dashboard JavaScript
 * Handles dashboard interactivity, chart rendering, and live data updates
 */

document.addEventListener("DOMContentLoaded", function () {
  // Initialize the price chart
  const priceChartCanvas = document.getElementById("price-chart");
  if (priceChartCanvas) {
    const ctx = priceChartCanvas.getContext("2d");

    // Generate sample chart data
    const generateChartData = (days = 30) => {
      const data = [];
      const today = new Date();
      let value = 60000;

      for (let i = days; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);

        const fluctuation = (Math.random() - 0.5) * 2000;
        value += fluctuation;
        value = Math.max(55000, Math.min(65000, value));

        data.push({
          date: date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          value: value,
        });
      }

      return data;
    };

    const chartData = generateChartData(30);

    const priceChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: chartData.map((d) => d.date),
        datasets: [
          {
            label: "Bitcoin Price",
            data: chartData.map((d) => d.value),
            borderColor: "#4967bc",
            backgroundColor: "rgba(73, 103, 188, 0.1)",
            borderWidth: 2.5,
            pointRadius: 0,
            pointHoverRadius: 5,
            fill: true,
            tension: 0.35,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            mode: "index",
            intersect: false,
            backgroundColor: "rgba(22, 27, 46, 0.95)",
            titleColor: "#e2e8f0",
            bodyColor: "#e2e8f0",
            borderColor: "#4967bc",
            borderWidth: 1,
            padding: 10,
            callbacks: {
              label: function (context) {
                return (
                  "$" +
                  context.raw.toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                  })
                );
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              color: "rgba(73, 103, 188, 0.1)",
              drawBorder: false,
            },
            ticks: {
              color: "#94a3b8",
              font: {
                size: 11,
              },
            },
          },
          y: {
            grid: {
              color: "rgba(73, 103, 188, 0.1)",
              drawBorder: false,
            },
            ticks: {
              color: "#94a3b8",
              font: {
                size: 11,
              },
              callback: function (value) {
                return (
                  "$" +
                  value.toLocaleString("en-US", { maximumFractionDigits: 0 })
                );
              },
            },
          },
        },
        interaction: {
          mode: "index",
          intersect: false,
        },
      },
    });

    // Update chart on timeframe change
    const timeframeSelect = document.getElementById("timeframe-select");
    if (timeframeSelect) {
      timeframeSelect.addEventListener("change", function () {
        const days = parseInt(this.value);
        const newData = generateChartData(days);

        priceChart.data.labels = newData.map((d) => d.date);
        priceChart.data.datasets[0].data = newData.map((d) => d.value);
        priceChart.update();
      });
    }
  }

  // Simulate live data updates
  setInterval(() => {
    // Update crypto table prices
    const tableRows = document.querySelectorAll("#crypto-table-body tr");
    tableRows.forEach((row) => {
      const priceCell = row.cells[1];
      const changeCell = row.cells[2];

      if (priceCell && changeCell) {
        let price = parseFloat(
          priceCell.textContent.replace("$", "").replace(",", ""),
        );
        const change = (Math.random() - 0.5) * 0.8;

        price = price * (1 + change / 100);
        priceCell.textContent =
          "$" + price.toLocaleString("en-US", { maximumFractionDigits: 2 });

        // Update change indicator
        const changeElement = changeCell.querySelector(
          ".dashboard-price-change",
        );
        if (changeElement) {
          changeElement.textContent =
            (change >= 0 ? "+" : "") + change.toFixed(2) + "%";

          if (change >= 0) {
            changeElement.className =
              "dashboard-price-change dashboard-price-change-up";
          } else {
            changeElement.className =
              "dashboard-price-change dashboard-price-change-down";
          }
        }
      }
    });

    // Update stat cards with small random changes
    const marketCapElement = document.getElementById("market-cap");
    const totalVolumeElement = document.getElementById("total-volume");
    const btcDominanceElement = document.getElementById("btc-dominance");

    if (marketCapElement) {
      let marketCap = parseFloat(
        marketCapElement.textContent.replace("$", "").replace("T", ""),
      );
      marketCap = marketCap * (1 + ((Math.random() - 0.5) * 0.15) / 100);
      marketCapElement.textContent = "$" + marketCap.toFixed(2) + "T";
    }

    if (totalVolumeElement) {
      let totalVolume = parseFloat(
        totalVolumeElement.textContent.replace("$", "").replace("B", ""),
      );
      totalVolume = totalVolume * (1 + ((Math.random() - 0.5) * 0.25) / 100);
      totalVolumeElement.textContent = "$" + totalVolume.toFixed(2) + "B";
    }

    if (btcDominanceElement) {
      let btcDominance = parseFloat(
        btcDominanceElement.textContent.replace("%", ""),
      );
      btcDominance = btcDominance + (Math.random() - 0.5) * 0.05;
      btcDominanceElement.textContent = btcDominance.toFixed(1) + "%";
    }
  }, 5000);

  // Search functionality
  const searchInput = document.getElementById("dashboard-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      const rows = document.querySelectorAll("#crypto-table-body tr");

      rows.forEach((row) => {
        const name = row.cells[0].textContent.toLowerCase();
        if (name.includes(searchTerm)) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    });
  }
});
