import React from "react";
import { Box, Card, CardContent, Grid, Typography, LinearProgress, Link, Paper } from "@mui/material";
import SearchBar from "../components/SearchBar"; // Assuming SearchBar is a custom component.
import logo from "../icons/Logo.png";

const ResultsPage = ({ inputValue, onInputChange, onSubmit, articleData }) => {
  // Function to determine grade based on reliabilityScore
  const getGrade = (score) => {
    if (score > 8) return 'A';
    if (score > 6) return 'B';
    if (score > 4) return 'C';
    return 'D';
  };

  const renderScoreBar = (label, score) => (
    <Grid container alignItems="center" spacing={1}>
      <Grid item xs={3}>
        <Typography variant="body1">{label}</Typography>
      </Grid>
      <Grid item xs={7}>
        <LinearProgress
          variant="determinate"
          value={score * 10}
          sx={{ height: 10, borderRadius: 5 }}
        />
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body1" align="right">
          {Math.round(score)}/10
        </Typography>
      </Grid>
    </Grid>
  );

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Paper sx={{ backgroundColor: "#d9d9d9", py: 1, px: 3, position: "sticky", top: 0, zIndex: 1, boxShadow: 3, borderRadius: 1 }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Box
              component="img"
              src={logo}
              alt="Trust-o-meter Logo"
              sx={{ height: 60, ml: 2 }}
            />
          </Grid>
          <Grid item>
            <Typography variant="h6" sx={{ fontWeight: 'bold', ml: 1 }}>
              Trust-o-meter
            </Typography>
          </Grid>
          <Grid item xs />
          <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', mt: 2.5 }}>
            <SearchBar
              inputValue={inputValue}
              onInputChange={onInputChange}
              onSubmit={onSubmit}
              placeholder="Paste your link or text to validate here"
              variant="outlined"
              InputProps={{
                style: { backgroundColor: "white" },
              }}
            />
          </Grid>
        </Grid>
      </Paper>
      <Box sx={{ p: 3 }}>
        {articleData && (
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h5" gutterBottom>
                    Overall Rating: {getGrade(articleData.scores.reliabilityScore)}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Breakdown
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ mb: 4 }}>
                    {renderScoreBar("Not Bias", articleData.scores.bias.score)}
                    {renderScoreBar("Accuracy", articleData.scores.contentAccuracy.score)}
                    {renderScoreBar("Author Credentials", articleData.scores.authorCredibility.score)}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    <strong>Author:</strong> {articleData.author || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    <strong>URL:</strong>{" "}
                    <Link href={articleData.url} target="_blank" rel="noopener noreferrer">
                      {articleData.url}
                    </Link>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    <strong>Summary:</strong> {articleData.summary || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    <strong>Organization:</strong> {articleData.organization || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    <strong>Date:</strong> {articleData.date || "N/A"}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    <strong>Year:</strong> {articleData.year || "N/A"}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
};

export default ResultsPage;
