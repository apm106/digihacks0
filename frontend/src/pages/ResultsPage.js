import React from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  LinearProgress,
  Link,
  Paper,
} from "@mui/material";
import SearchBar from "../components/SearchBar"; // Assuming SearchBar is a custom component.
import logo from "../icons/Logo.png";
import "./ResultsPage.css";

const ResultsPage = ({ inputValue, onInputChange, onSubmit, articleData }) => {
  const getGrade = (score) => {
    if (score > 8) return "A";
    if (score > 6) return "B";
    if (score > 4) return "C";
    return "D";
  };

  const getColor = (score) => {
    if (score > 8) return "#4caf50"; // Green
    if (score > 6) return "#ffeb3b"; // Yellow
    if (score > 4) return "#ff9800"; // Orange
    return "#f44336"; // Red
  };

  const renderScoreBar = (label, score, explanation) => (
    <Grid container spacing={2} className="breakdown-row" alignItems="center">
      <Grid item xs={2}>
        <Typography variant="body1" className="breakdown-label">
          {label} {score}/10
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <LinearProgress
          variant="determinate"
          value={score * 10}
          sx={{
            height: 35,
            borderRadius: 5,
            backgroundColor: "#e0e0e0",
            "& .MuiLinearProgress-bar": {
              backgroundColor: getColor(score),
            },
          }}
        />
      </Grid>
      <Grid item xs={5}>
        <Typography variant="body2" className="breakdown-explanation">
          {explanation}
        </Typography>
      </Grid>
    </Grid>
  );

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Paper
        sx={{
          backgroundColor: "#E3F2FD",
          py: 1,
          px: 3,
          position: "sticky",
          top: 0,
          zIndex: 1,
          boxShadow: 3,
          borderRadius: 1,
        }}
      >
        <Grid
          container
          alignItems="center"
          spacing={2}
          background-color="#E3F2FD"
        >
          <Grid item>
            <Box
              component="img"
              src={logo}
              alt="Trust-o-meter Logo"
              className="logo"
            />
          </Grid>
          <Grid item>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", ml: 1, color: "#000" }}
            >
              Trust-o-meter
            </Typography>
          </Grid>
          <Grid item xs />
          <Grid item xs={6} className="search-bar-container">
            <SearchBar
              inputValue={inputValue}
              onInputChange={onInputChange}
              onSubmit={onSubmit}
              placeholder="Paste your link or text to validate here"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Paper>
      <Box className="content">
        {articleData && (
          <Card className="results-card">
            <CardContent>
              <Typography variant="h4" className="overall-rating">
                Overall Rating: {getGrade(articleData.scores.reliabilityScore)}
              </Typography>
              <Typography variant="h6" className="breakdown-title">
                Breakdown
              </Typography>
              <Box className="breakdown">
                {renderScoreBar(
                  "Impartiality",
                  articleData.scores.bias.score,
                  articleData.scores.bias.explanation
                )}
                {renderScoreBar(
                  "Accuracy",
                  articleData.scores.contentAccuracy.score,
                  articleData.scores.contentAccuracy.explanation
                )}
                {renderScoreBar(
                  "Credibility",
                  articleData.scores.authorCredibility.score,
                  articleData.scores.authorCredibility.explanation
                )}
              </Box>
              <Typography>
                <strong>Author:</strong> {articleData.author || "N/A"}
              </Typography>
              <Typography>
                <strong>URL:</strong>{" "}
                <Link
                  href={articleData.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {articleData.url}
                </Link>
              </Typography>
              <Typography>
                <strong>Summary:</strong> {articleData.summary || "N/A"}
              </Typography>
              <Typography>
                <strong>Organization:</strong>{" "}
                {articleData.organization || "N/A"}
              </Typography>
              <Typography>
                <strong>Year:</strong> {articleData.scores.year || "N/A"}
              </Typography>
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
};

export default ResultsPage;
