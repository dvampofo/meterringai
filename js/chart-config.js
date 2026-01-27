/**
 * Chart.js Configuration for LLM Pricing Comparison Chart
 * Shows cost comparison of major AI providers vs LiteLLM Gateway smart routing
 * Data: Cost per 1M tokens (Input)
 */

document.addEventListener("DOMContentLoaded", function () {
  // ===================================
  // Chart.js Initialization
  // ===================================

  const chartCanvas = document.getElementById("cost-comparison-chart");

  if (chartCanvas) {
    const ctx = chartCanvas.getContext("2d");

    const costComparisonChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "OpenAI\nGPT-4",
          "OpenAI\nGPT-4 Turbo",
          "Anthropic\nClaude 3 Opus",
          "Anthropic\nClaude 3 Sonnet",
          "Google\nGemini Pro",
          "Meta\nLlama 3 70B",
          "xAI\nGrok",
          "Mistral\n8x7B",
          "Cohere\nCommand R+",
          "AWS\nTitanXL",
          "Average\nPaid Model",
          "LiteLLM\nSmart Routing",
        ],
        datasets: [
          {
            label: "Cost per 1M Input Tokens ($)",
            backgroundColor: "transparent",
            borderWidth: 3,
            borderColor: "#d94a4a",
            fill: false,
            tension: 0.4,
            pointRadius: 6,
            pointBackgroundColor: "#d94a4a",
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
            pointHoverRadius: 8,
            data: [30, 10, 15, 3, 0.5, 0.3, 5, 0.2, 2.5, 25, 10.2, 2],
          },
          {
            label: "Cost per 1M Output Tokens ($)",
            backgroundColor: "transparent",
            borderWidth: 3,
            borderColor: "#47d5a6",
            fill: false,
            tension: 0.4,
            pointRadius: 6,
            pointBackgroundColor: "#47d5a6",
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
            pointHoverRadius: 8,
            data: [60, 30, 60, 9, 1.5, 1, 15, 0.6, 8, 100, 30.5, 6],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "LLM Pricing Comparison 2025: Why Your AI Costs Are Skyrocketing",
            color: "#ffffff",
            font: {
              family: "'Inter', sans-serif",
              size: 14,
              weight: "600",
            },
            padding: {
              top: 10,
              bottom: 30,
            },
          },
          legend: {
            display: true,
            position: "top",
            labels: {
              color: "#8b8b8b",
              font: {
                family: "'Inter', sans-serif",
                size: 13,
                weight: "500",
              },
              padding: 20,
              usePointStyle: true,
              pointStyle: "circle",
            },
          },
          tooltip: {
            backgroundColor: "rgba(18, 18, 18, 0.95)",
            titleColor: "#ffffff",
            bodyColor: "#8b8b8b",
            borderColor: "#333333",
            borderWidth: 1,
            padding: 12,
            titleFont: {
              family: "'Inter', sans-serif",
              size: 13,
              weight: "600",
            },
            bodyFont: {
              family: "'Inter', sans-serif",
              size: 12,
            },
            usePointStyle: true,
            boxPadding: 8,
            callbacks: {
              afterLabel: function (context) {
                if (context.datasetIndex === 0 && context.dataIndex === 11) {
                  return "💰 Smart routing saves you money";
                }
                return "";
              },
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "AI Model Provider",
              color: "#8b8b8b",
              font: {
                family: "'Inter', sans-serif",
                size: 13,
                weight: "600",
              },
              padding: 15,
            },
            grid: {
              color: "rgba(63, 63, 63, 0.3)",
              drawBorder: false,
              drawTicks: false,
            },
            ticks: {
              color: "#717171",
              font: {
                family: "'Inter', sans-serif",
                size: 11,
              },
            },
          },
          y: {
            title: {
              display: true,
              text: "Cost per 1M Tokens ($)",
              color: "#8b8b8b",
              font: {
                family: "'Inter', sans-serif",
                size: 13,
                weight: "600",
              },
              padding: 15,
            },
            beginAtZero: true,
            max: 110,
            grid: {
              color: "rgba(63, 63, 63, 0.3)",
              drawBorder: false,
              drawTicks: false,
            },
            ticks: {
              color: "#717171",
              font: {
                family: "'Inter', sans-serif",
                size: 12,
              },
              padding: 8,
              callback: function (value) {
                return "$" + value;
              },
            },
          },
        },
      },
    });
  }
});
