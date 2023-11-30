import React, { useEffect } from "react";
import { Flex, Separator, Text, Button } from "@radix-ui/themes";
import { Share1Icon } from "@radix-ui/react-icons";
import ColorProfile from "./ColorProfile";

const Result = ({ colorData, hsl, colorInput, lightness, hue, saturation }) => {
  const handleFigmaShare = () => {
    //...
  };

  // Initialize an empty array for shades and tints
  const shadesAndTints = [];

  // Define the getTintsAndShades function to calculate shades and tints
  const getTintsAndShades = (lightness) => {
    let uniqueTintsAndShades = [];

    // Calculate tints
    for (
      let i = lightness;
      i <= 100 && uniqueTintsAndShades.length < 61;
      i += 3
    ) {
      const value = i;
      uniqueTintsAndShades.push(value);
    }

    // Calculate shades
    for (
      let i = lightness;
      i >= 0 && uniqueTintsAndShades.length < 61;
      i -= 3
    ) {
      const value = i;
      uniqueTintsAndShades.push(value);
    }

    // Remove duplicates
    uniqueTintsAndShades = [...new Set(uniqueTintsAndShades)];

    // Update the shadesAndTints array
    shadesAndTints.length = 0;
    shadesAndTints.push(...uniqueTintsAndShades);
  };

  useEffect(() => {
    getTintsAndShades(lightness);

    // Sort the shadesAndTints array
    shadesAndTints.sort((a, b) => a - b);
  }, [lightness]);

  return (
    <Flex direction="column" align="center" gap="4" style={{ maxWidth: 1000 }}>
      {/* Your color */}
      {/* <YourColor
        colorData={colorData}
        lightness={lightness}
        saturation={saturation}
        hue={hue}
      ></YourColor> */}
      <Separator
        size="3"
        orientation="horizontal"
        className="separator width"
      />
      {/* <Text align="center" size="2">
        (Click on the color to copy the hex code)
      </Text> */}
      <Flex
        direction="row"
        wrap="wrap"
        gap=""
        justify="center"
        py={{ sm: "3", md: "5", lg: "5" }}
      >
        {/* Tints */}
        <ColorProfile
          shadesAndTints={shadesAndTints}
          colorData={colorData}
          colorInput={colorInput}
          lightness={lightness}
          saturation={saturation}
          hue={hue}
        ></ColorProfile>
      </Flex>
      <Button onClick={handleFigmaShare}>
        <Share1Icon className="no-bg" />
        Copy and Paste in Figma
      </Button>
    </Flex>
  );
};

export default Result;
