import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Shield } from 'lucide-react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import Union from '../../components/svg/Union';
import GlowBackground from '../../components/svg/GlowBackground';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../navigation/AuthNavigator';

type SignUpScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'SignUp'>;

export default function SignUpScreen() {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode] = useState('+41');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!email.trim()) {
      setError('Please enter your email address');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (!phoneNumber.trim()) {
      setError('Please enter your phone number');
      return false;
    }

    return true;
  };

  const handleContinue = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      // TODO: Implement actual sign up logic
      console.log('Creating account with:', { email, phoneNumber: countryCode + phoneNumber });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to next step or main app
      // navigation.navigate('Main');
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Sign up error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Radial gradient background */}
      <Svg height="50%" width="100%" style={styles.gradient}>
        <Defs>
          <RadialGradient
            id="pinkGlow"
            cx="0%" cy="10%" r="90%"
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0%" stopColor="#ff3c8c" stopOpacity="0.5" />
            <Stop offset="100%" stopColor="#000" stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#pinkGlow)" />
      </Svg>
      
      {/* Union SVG positioned at top */}
      <View style={styles.unionContainer}>
        <Union />
      </View>
      
      {/* SVG Glow background effect - positioned exactly as in Figma */}
      <View style={styles.glowContainer}>
        <GlowBackground width={242} height={218} />
      </View>
      
      <SafeAreaView style={styles.safeArea}>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <ArrowLeft size={24} color="#FFFFFF" strokeWidth={1.5} />
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Main content */}
            <View style={styles.content}>
              <View style={styles.titleSection}>
                <Text style={styles.title}>Can we get your informations please?</Text>
                <Text style={styles.subtitle}>
                  We only use your information to make sure everyone in Spooned is real.
                </Text>
              </View>

              {/* Form section */}
              <View style={styles.formSection}>
                {/* Email input */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Email address*</Text>
                  <View style={[styles.inputWrapper, email.length > 0 && styles.inputWrapperActive]}>
                    <TextInput
                      style={styles.textInput}
                      placeholder=""
                      placeholderTextColor="#666666"
                      value={email}
                      onChangeText={(text) => {
                        setEmail(text);
                        setError('');
                      }}
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType="email-address"
                      editable={!loading}
                    />
                    {email.length === 0 && (
                      <View style={styles.cursor} />
                    )}
                  </View>
                </View>

                {/* Phone number input */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Phone Number *</Text>
                  <View style={styles.phoneInputContainer}>
                    {/* Country code */}
                    <View style={styles.countryCodeWrapper}>
                      <Text style={styles.countryCodeText}>{countryCode}</Text>
                      <View style={styles.dropdownIcon}>
                        <View style={styles.dropdownLine} />
                      </View>
                    </View>
                    
                    {/* Phone number input */}
                    <View style={styles.phoneNumberWrapper}>
                      <TextInput
                        style={styles.phoneNumberInput}
                        placeholder=""
                        placeholderTextColor="#666666"
                        value={phoneNumber}
                        onChangeText={(text) => {
                          setPhoneNumber(text);
                          setError('');
                        }}
                        keyboardType="phone-pad"
                        editable={!loading}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* Bottom section */}
            <View style={styles.bottomSection}>
              {/* Error message */}
              {error ? (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              ) : null}

              {/* Continue button */}
              <TouchableOpacity
                style={[styles.continueButton, loading && styles.continueButtonDisabled]}
                onPress={handleContinue}
                disabled={loading || !email || !phoneNumber}
                activeOpacity={0.8}
              >
                <Text style={styles.continueButtonText}>
                  {loading ? 'Setting up...' : 'Lets setup you up!'}
                </Text>
              </TouchableOpacity>

              {/* Privacy notice */}
              <View style={styles.privacyNotice}>
                <Shield size={24} color="#FFFFFF" />
                <Text style={styles.privacyText}>
                  We never share this anyone and it won't be on your profile!
                </Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  // Radial gradient background styles
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  unionContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
  },
  glowContainer: {
    position: 'absolute',
    top: -66,             // Y position from Figma
    left: -93,            // X position from Figma
    width: 242,           // Width from Figma
    height: 218,          // Height from Figma
    zIndex: 3,
  },
  safeArea: {
    flex: 1,
    zIndex: 4,
  },
  header: {
    height: 44,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: Platform.OS === 'ios' ? 0 : 20,
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    paddingTop: 40,
  },
  titleSection: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 10,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  subtitle: {
    fontSize: 16,
    color: '#999999',
    lineHeight: 22,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  formSection: {
    gap: 16,
  },
  inputContainer: {
    gap: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  inputWrapper: {
    height: 48,
    backgroundColor: '#000000',
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: '#FFFFFF',
    borderBottomWidth: 3,
    paddingHorizontal: 16,
    justifyContent: 'center',
    position: 'relative',
  },
  inputWrapperActive: {
    borderBottomColor: '#FFFFFF',
  },
  textInput: {
    fontSize: 14,
    color: '#FFFFFF',
    height: '100%',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  cursor: {
    position: 'absolute',
    left: 16,
    top: '50%',
    width: 1,
    height: 20,
    backgroundColor: '#FFFFFF',
    marginTop: -10,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  countryCodeWrapper: {
    width: 80,
    height: 48,
    backgroundColor: 'transparent',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    opacity: 0.7,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  countryCodeText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  dropdownIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownLine: {
    width: 12,
    height: 1.5,
    backgroundColor: '#FFFFFF',
  },
  phoneNumberWrapper: {
    flex: 1,
    height: 48,
    backgroundColor: 'transparent',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    opacity: 0.7,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  phoneNumberInput: {
    fontSize: 14,
    color: '#999999',
    height: '100%',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  bottomSection: {
    paddingTop: 40,
    paddingBottom: 64,
    gap: 16,
  },
  errorContainer: {
    backgroundColor: 'rgba(255, 99, 99, 0.1)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  continueButton: {
    height: 56,
    backgroundColor: '#B8457B',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 2,
  },
  continueButtonDisabled: {
    opacity: 0.4,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  privacyNotice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingTop: 8,
  },
  privacyText: {
    flex: 1,
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 18,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
});