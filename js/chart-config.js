/**
 * Chart.js Configuration for LLM Pricing Comparison Chart
 * Shows cost comparison of major AI providers vs LiteLLM Gateway smart routing
 * Data: Cost per 1M tokens (Input)
 */

// ===================================
// COLOR CONFIGURATION - CUSTOMIZE HERE
// ===================================
const LITELLM_LABEL_COLOR = "#ffffff"; // Default: white

// Other popular options:
// "#ffd700" - Gold (premium feel)
// "#00ff00" - Lime (neon green)
// "#ff00ff" - Magenta (vibrant)
// "#00ffff" - Cyan (tech/cool)
// "#ffff00" - Yellow (high contrast)
// "#4967bc" - Your primary blue
// "#47d5a6" - Your success green

document.addEventListener("DOMContentLoaded", function () {
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
        layout: {
          padding: {
            bottom: 80,
          },
        },
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
              // USE COLOR CALLBACK TO CHANGE LITELLM LABEL COLOR
              color: function (context) {
                // If this is the last label (index 11 = LiteLLM)
                if (context.index === 11) {
                  return LITELLM_LABEL_COLOR; // Use custom color
                }
                // All other labels stay gray
                return "#717171";
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
            ticks: {
              color: "#717171",
              font: {
                family: "'Inter', sans-serif",
                size: 12,
              },
              padding: 12,
              stepSize: 10,
              callback: function (value) {
                return "$" + value;
              },
            },
            grid: {
              color: "rgba(63, 63, 63, 0.5)",
              drawBorder: false,
              drawTicks: true,
              tickColor: "rgba(63, 63, 63, 0.5)",
              tickLength: 8,
              tickWidth: 1,
            },
          },
        },
      },
      plugins: [
        {
          // Responsive plugin for all mobile phones
          id: "responsiveMobilePlugin",
          resize(chart) {
            const canvas = chart.canvas;
            const ctx = canvas.getContext("2d");
            const width = canvas.width;

            // Detect phone screen and adjust dynamically
            if (width < 480) {
              // Small phones (< 480px)
              chart.options.layout.padding.bottom = 55;
              chart.options.plugins.title.font.size = 11;
            } else if (width < 600) {
              // Standard phones (480px - 599px)
              chart.options.layout.padding.bottom = 60;
              chart.options.plugins.title.font.size = 12;
            } else if (width < 768) {
              // Large phones landscape (600px - 767px)
              chart.options.layout.padding.bottom = 65;
              chart.options.plugins.title.font.size = 12;
            } else {
              // Tablets and larger
              chart.options.layout.padding.bottom = 80;
              chart.options.plugins.title.font.size = 14;
            }
          },
        },
      ],
    });
  }
});
