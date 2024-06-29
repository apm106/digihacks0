import React, { useEffect, useRef } from "react";
import { ForceGraph2D } from "react-force-graph";
import Box from "@mui/material/Box";
import SearchBar from "../components/SearchBar";
import logo from "../icons/Logo.png";
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

  nodes.slice(0, -1).forEach((node, index) => {
    links.push({
      source: nodes.length - 1,
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
      fgRef.current.zoom(1, 400);
    }
  }, []);

  return (
    <Box className="app-container">
      <Box className="header-banner">
        <Box className="header-container">
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
              width: "60px",
              height: "auto",
              marginRight: "30px",
              marginLeft: "10px",
            }}
          />
          <Box className="header-content" pt="15px">
            <Box className="misinformation" mr="230px">
              Trust-o-meter
            </Box>
            <SearchBar
              inputValue=""
              onInputChange={() => {}}
              onSubmit={() => {}}
              sx={{ width: "100%", maxWidth: "101px" }}
            />
          </Box>
        </Box>
      </Box>
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
              ctx.beginPath();
              ctx.moveTo(link.source.fx, link.source.fy);
              ctx.lineTo(node.fx, node.fy);
              ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
              ctx.stroke();
              const fontSize = 16;
              ctx.font = `${fontSize}px Sans-Serif`;
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillStyle = "black";
              ctx.fillText(node.name, node.fx, node.fy + 10);
            }
          }}
          width={1000}
          height={500}
          nodeVal={(node) => node.value}
          linkDirectionalParticles={0}
          linkCurvature={0}
          d3VelocityDecay={0}
        />
      </div>
    </Box>
  );
}

export default ResultsPage;
