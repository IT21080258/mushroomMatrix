import React, { useEffect, useState, useRef } from 'react';
import { Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { LinePlot } from '@mui/x-charts/LineChart';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { useDrawingArea, useYScale } from '@mui/x-charts/hooks';

// Styled components
const StyledPath = styled('path')(({ theme }) => ({
  fill: 'none',
  stroke: theme.palette.text.primary,
  shapeRendering: 'crispEdges',
  strokeWidth: 1,
  pointerEvents: 'none',
  strokeDasharray: '5 2',
}));

const StyledText = styled('text')(({ theme }) => ({
  stroke: 'none',
  fill: theme.palette.text.primary,
  shapeRendering: 'crispEdges',
}));

// ValueHighlight Component
function ValueHighlight({ svgRef }) {
  const { left, top, width, height } = useDrawingArea();
  const leftAxisScale = useYScale('left_axis_id');
  const rightAxisScale = useYScale('right_axis_id');

  const [mouseY, setMouseY] = useState(null);

  useEffect(() => {
    const element = svgRef.current;
    if (!element) return;

    const handleMouseOut = () => setMouseY(null);
    const handleMouseMove = (event) => {
      const x = event.offsetX;
      const y = event.offsetY;

      if (x < left || x > left + width || y < top - 10 || y > top + height + 10) {
        setMouseY(null);
        return;
      }
      setMouseY(Math.max(Math.min(top + height, y), top)); // clamp to the drawing area
    };

    element.addEventListener('mouseout', handleMouseOut);
    element.addEventListener('mousemove', handleMouseMove);

    return () => {
      element.removeEventListener('mouseout', handleMouseOut);
      element.removeEventListener('mousemove', handleMouseMove);
    };
  }, [height, left, top, width, svgRef]);

  if (mouseY === null) return null;

  return (
    <>
      <StyledPath d={`M ${left} ${mouseY} l ${width} 0`} />
      <StyledText x={left + 5} y={mouseY} textAnchor="start" dominantBaseline="text-after-edge">
        {leftAxisScale.invert(mouseY).toFixed(0)}
      </StyledText>
      <StyledText x={left + width - 5} y={mouseY} textAnchor="end" dominantBaseline="text-after-edge">
        {rightAxisScale.invert(mouseY).toFixed(0)}
      </StyledText>
    </>
  );
}

// Main Component
const ShopDemandVisualThree = () => {
  const svgRef = useRef(null);
  
  // State variables for current and predicted values
  const [currentValues, setCurrentValues] = useState(Array(7).fill(0));
  const [predictValues, setPredictValues] = useState(Array(7).fill(0));

  // Fetch data on component mount
  useEffect(() => {
    fetch("/get_predict_shop_demand_aom")
      .then(res => res.json())
      .then(data => {
        const currentSales = data.map(item => item.cy_yearly_sales);
        const predictedSales = data.map(item => item.fy_yearly_sales);
        
        setCurrentValues(currentSales);
        setPredictValues(predictedSales);
      });
  }, []);

  return (
    <Container sx={{ bgcolor: '#E0DDDC', color: 'white', borderRadius: '16px' }}>
      <Typography variant="h6" color="black">
        Yearly Sales Summary (AOM)
      </Typography>

      <ResponsiveChartContainer
        ref={svgRef}
        margin={{ top: 20, left: 50, right: 50, bottom: 30 }}
        height={300}
        series={[
          {
            type: 'line',
            data: currentValues,
            yAxisId: 'left_axis_id',
          },
          {
            type: 'line',
            data: predictValues,
            yAxisId: 'right_axis_id',
          },
        ]}
        xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7], scaleType: 'point' }]}
        yAxis={[
          { id: 'left_axis_id' },
          { id: 'right_axis_id' },
        ]}
      >
        <LinePlot />
        <ChartsYAxis position="left" axisId="left_axis_id" />
        <ChartsYAxis position="right" axisId="right_axis_id" />
        <ValueHighlight svgRef={svgRef} />
      </ResponsiveChartContainer>
    </Container>
  );
};

export default ShopDemandVisualThree;