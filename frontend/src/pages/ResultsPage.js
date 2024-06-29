import React, { useEffect, useRef } from "react";
import { ForceGraph2D } from "react-force-graph";
import Box from "@mui/material/Box";
import "../App.css";

const generateRandomData = () => {
  return Array.from({ length: 4 }, () => Math.floor(Math.random() * 10));
};

const dataPoints = generateRandomData();

const createRadarGraphData = (labels, data) => {
  const radius = 300;
  const centerX = 0;
  const centerY = 0;

  const nodes = labels.map((label, index) => {
    const angle = (index / labels.length) * 2 * Math.PI;
    const distance = (data[index] / 10) * radius;
    const x = centerX + distance * Math.cos(angle);
    const y = centerY + distance * Math.sin(angle);

    return {
      id: index,
      name: label,
      value: data[index],
      fx: x,
      fy: y,
    };
  });

  // Add center node
  nodes.push({
    id: nodes.length,
    name: "Center",
    value: 0,
    fx: centerX,
    fy: centerY,
  });

  const links = nodes.slice(0, -1).map((node, index) => ({
    source: index,
    target: (index + 1) % (nodes.length - 1),
  }));

  // Add links from center to each outer node
  nodes.slice(0, -1).forEach((node, index) => {
    links.push({
      source: nodes.length - 1, // center node
      target: index,
    });
  });

  return { nodes, links };
};

const labels = ["Accuracy", "Bias", "Recency", "Relevance"];
const radarGraphData = createRadarGraphData(labels, dataPoints);

function ResultsPage() {
  const fgRef = useRef();

  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.zoom(1, 400); // Set initial zoom level and duration
    }
  }, []);

  return (
    <Box className="app-container">
      <div className="results-graph-container">
        <ForceGraph2D
          ref={fgRef}
          graphData={radarGraphData}
          nodeLabel={(node) => `${node.name}: ${node.value}`}
          nodeAutoColorBy="name"
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.name === "Center" ? "" : node.name;
            const fontSize = 18 / globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = node.color;
            ctx.fillText(label, node.fx, node.fy + 10 / globalScale);
            if (node.name === "Center") {
              ctx.beginPath();
              ctx.arc(node.fx, node.fy, 2, 0, 2 * Math.PI, false);
              ctx.fillStyle = "red";
              ctx.fill();
            }
          }}
          linkCanvasObjectMode={() => "before"}
          linkCanvasObject={(link, ctx) => {
            const node = radarGraphData.nodes.find((n) => n.id === link.target);
            if (link.source === radarGraphData.nodes.length - 1) {
              // Draw line from center to node
              ctx.beginPath();
              ctx.moveTo(link.source.fx, link.source.fy);
              ctx.lineTo(node.fx, node.fy);
              ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
              ctx.stroke();
              // Draw label at the end of the line
              const fontSize = 16; // Increased font size
              ctx.font = `${fontSize}px Sans-Serif`;
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillStyle = "black";
              ctx.fillText(node.name, node.fx, node.fy + 10);
            }
          }}
          width={1000}
          height={800}
          nodeVal={(node) => node.value}
          linkDirectionalParticles={0}
          linkCurvature={0}
          d3VelocityDecay={0} // Prevents the simulation from moving nodes
        />
      </div>
    </Box>
  );
}

export default ResultsPage;
