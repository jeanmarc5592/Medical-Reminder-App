import React from 'react'
import { View } from 'react-native';
import { withTheme } from 'react-native-elements';
import { AnimatedCircularProgress } from "react-native-circular-progress";
import CustomText from './CustomText';

const IntakesProgress = ({ theme }) => {
    return (
      <View
        style={{
          marginTop: 35,
          backgroundColor: theme.background.lightGrey,
          width: 300,
          height: 300,
          borderRadius: 250,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            backgroundColor: theme.background.white,
            width: "85%",
            height: "85%",
            borderRadius: 250,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AnimatedCircularProgress
            size={220}
            width={15}
            fill={50}
            tintColor={theme.background.secondary}
            backgroundColor={theme.background.lightGrey}
            rotation={0}
            lineCap="round"
          >
            {() => (
              <View style={{ width: "100%", height: "100%", alignItems:"center", padding: 20, justifyContent: "space-around" }}>
                <CustomText h4 fontWeight="bold">INTAKES</CustomText>
                <View style={{ flexDirection: "row" }}>
                    <CustomText h1 fontWeight="bold" style={{ color: theme.background.secondary }}>2</CustomText>
                    <CustomText h1 fontWeight="bold" > / 4</CustomText>
                </View>
                <CustomText>Today</CustomText>
              </View>
            )}
          </AnimatedCircularProgress>
        </View>
      </View>
    );
}

export default withTheme(IntakesProgress);
