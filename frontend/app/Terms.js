import React from "react";
import { Text, ScrollView } from "react-native";
import EmoicLogo from "./svgs/EmoicLogo";

const Home = () => {
  return (
    <ScrollView
      style={{ flex: 1, borderColor: "#3E8B9A", borderWidth: 2, padding: 2 }}
    >
      <EmoicLogo
        style={{
          width: 200,
          height: 200,
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: 15,
        }}
      />
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 15,
          marginRight: 20,
          marginLeft: 20,
        }}
      >
        Terms and Condtions
      </Text>
      <Text
        style={{
          fontSize: 16,
          marginBottom: 50,
          marginRight: 20,
          marginLeft: 20,
        }}
      >
        Introduction Welcome to Emoic! These terms and conditions outline the
        rules and regulations for the use of our project. By accessing and using
        Emoic, you agree to comply with and be bound by the following terms and
        conditions. If you disagree with any part of these terms, please do not
        use Emoic. Use of Emoic Academic Purpose: Emoic is intended for academic
        and educational purposes only. Any commercial use is strictly
        prohibited. Eligibility: You must be a student, educator, or researcher
        to use Emoic. By using Emoic, you represent that you meet these
        eligibility requirements. User Conduct: You agree to use Emoic
        responsibly and ethically. You must not use Emoic to engage in any
        unlawful activities or activities that may harm Emoic or its users.
        Intellectual Property Ownership: All content, code, and intellectual
        property associated with Emoic remain the property of the project
        creators. Permissions: You are granted a limited, non-exclusive license
        to use Emoic for academic purposes only. You must not modify,
        distribute, or create derivative works based on Emoic without explicit
        permission. Privacy and Data Data Collection: Emoic may collect certain
        information for academic research purposes. Any data collected will be
        anonymized and used in accordance with applicable privacy laws. Data
        Security: We take reasonable measures to protect any data collected
        through Emoic. However, we cannot guarantee absolute security.
        Limitation of Liability No Warranties: Emoic is provided "as is" without
        any warranties, express or implied. We do not warrant that Emoic will be
        error-free or uninterrupted. Liability Limitation: In no event shall the
        creators of Emoic be liable for any damages arising out of or in
        connection with your use of Emoic. Changes to Terms We reserve the right
        to modify these terms and conditions at any time. Any changes will be
        effective immediately upon posting on Emoic. Your continued use of Emoic
        after any changes constitutes your acceptance of the new terms.
      </Text>
    </ScrollView>
  );
};

export default Home;
